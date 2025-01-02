export class EditorController {
  /**
   * Manages interactions between the model and views.
   * @param {EditorModel} model - The editor state model.
   * @param {EditorView} editorView - The editor view.
   * @param {NumberRowView} numberRowView - The number row view.
   */
  constructor(model, editorView, numberRowView) {
    this.model = model;
    this.editorView = editorView;
    this.numberRowView = numberRowView;
    this.cachedLines = []; // Cached lines to avoid redundant DOM queries
    this.initialize();
  }

  /**
   * Initializes the editor with default lines and sets up event listeners.
   */
  initialize() {
    this.populateInitialLines();
    this.cacheLines(); // Cache lines after initialization
    if (this.cachedLines.length) {
      this.setActiveLine(this.cachedLines[0], 0);
    }
    this.setupListeners();
  }

  /**
   * Populates the editor with initial lines and numbers.
   */
  populateInitialLines() {
    for (let i = 0; i < this.model.initialLines; i++) {
      this.editorView.addLine();
      this.numberRowView.addNumber(i + 1);
    }
    this.model.initialNumber = this.model.initialLines;
  }

  /**
   * Caches the current lines to optimize subsequent operations.
   */
  cacheLines() {
    this.cachedLines = Array.from(this.editorView.getAllLines());
    this.model.totalNumberofLines = this.cachedLines;
  }

  /**
   * Updates the active line in the model and highlights it in the view.
   * @param {HTMLElement} line - The active line element.
   * @param {number} index - The index of the active line.
   */
  setActiveLine(line, index) {
    if (this.model.activeLine) {
      this.model.activeLine.classList.remove("line-active");
    }
    line.focus();
    line.classList.add("line-active");
    this.model.updateActiveLine(line, index);
  }

  /**
   * Handles adding a new line.
   */
  addLine() {
    const newLine = this.editorView.addLine(this.model.activeLine);
    this.numberRowView.addNumber(++this.model.initialNumber);
    this.cacheLines(); // Refresh cache after adding a line
    const index = this.cachedLines.indexOf(newLine);
    this.setActiveLine(newLine, index);
  }

  /**
   * Handles deleting the active line.
   */
  deleteLine() {
    if (
      this.cachedLines.length > this.model.minNumberOfLines &&
      this.model.activeLine
    ) {
      const index = this.model.activeIndex;
      const removedLine = this.cachedLines[index];

      this.editorView.removeLine(removedLine);
      this.numberRowView.removeLastNumber();
      this.cacheLines(); // Refresh cache after deleting a line

      const newActiveLine = this.cachedLines[index - 1] || this.cachedLines[0];
      const newIndex = this.cachedLines.indexOf(newActiveLine);

      this.setActiveLine(newActiveLine, newIndex);
      this.model.initialNumber--;
    } else {
      this.displayMinimumLinesAlert();
    }
  }

  /**
   * Displays an alert for minimum lines required.
   */
  displayMinimumLinesAlert() {
    alert(`A minimum of ${this.model.minNumberOfLines} lines is required!`);
  }

  /**
   * Sets up event listeners for keyboard navigation and editor interactions.
   */
  setupListeners() {
    document
      .querySelector("#addLine")
      .addEventListener("click", () => this.addLine());
    document
      .querySelector("#deleteLine")
      .addEventListener("click", () => this.deleteLine());

    this.editorView.editor.addEventListener("mouseup", (e) => {
      const line = e.target;

      // Skip if the clicked line is already the active line
      if (line === this.model.activeLine) return;

      const index = this.cachedLines.indexOf(line);
      if (index !== -1) {
        this.setActiveLine(line, index);
        if (this.model.activeIndex + 1 === this.model.initialNumber) {
          this.addLine();
          this.navigateLines(-1);
        }
      }
    });

    this.editorView.editor.addEventListener("keydown", (e) => {
      const key = e.code;
      // console.log(key);
      if (
        ![
          "ArrowUp",
          "ArrowDown",
          "Enter",
          "ControlLeft",
          "KeyB",
          "Backspace",
        ].includes(key)
      )
        return;

      switch (key) {
        case "ArrowUp":
          this.navigateLines(-1);
          break;

        case "ArrowDown":
          this.navigateLines(1);
          break;

        case "ControlLeft" && "KeyB":
          this.deleteLine();
          break;

        case "Backspace":
          e.preventDefault();
          const clickedLine = e.target;
          // const clickedIndex = this.cachedLines.indexOf(clickedLine);
          if (clickedLine && clickedLine.textContent.trim() === "") {
            this.navigateLines(-1);
          } else {
            // console.log(clickedLine, clickedIndex);
            // console.log("not Empty");
            document.execCommand("delete"); //depreciated feature
          }
          break;

        default:
          if (e.ctrlKey && e.code === "Enter") {
            e.preventDefault();
            this.addLine();
          } else {
            if (e.code === "Enter") {
              e.preventDefault();
              this.navigateLines(+1);
              // console.log(this.model.activeIndex, this.model.initialNumber);
              if (this.model.activeIndex + 1 === this.model.initialNumber) {
                this.addLine();
                this.navigateLines(-1);
              }
            }
          }
      }
    });

    this.editorView.editor.addEventListener("mouseup", (e) => {
      const clickedLine = e.target;
      const clickedIndex = this.cachedLines.indexOf(clickedLine);

      if (clickedIndex === -1) return; // Ignore clicks outside valid lines

      // Handle multi-line selection with Shift key
      if (e.shiftKey && this.model.activeLine) {
        const startIndex = Math.min(this.model.activeIndex, clickedIndex);
        const endIndex = Math.max(this.model.activeIndex, clickedIndex);

        this.cachedLines.forEach((line, index) => {
          if (index >= startIndex && index <= endIndex) {
            line.classList.add("line-selected");
          }
        });
      } else {
        // Reset previous selection and set the new active line
        this.cachedLines.forEach((line) =>
          line.classList.remove("line-selected")
        );
        this.setActiveLine(clickedLine, clickedIndex);
      }
    });

    this.editorView.editor.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.code === "KeyC") {
        const selectedLines = this.cachedLines.filter(
          (line) =>
            line.classList.contains("line-selected") && line.textContent !== ""
        );

        if (selectedLines.length > 0) {
          const textToCopy = selectedLines
            .map((line) => line.textContent)
            .join("\n");
          navigator.clipboard
            .writeText(textToCopy)
            .then(() => {
              console.log("Copied to clipboard:", textToCopy);
            })
            .catch((err) => {
              console.error("Failed to copy:", err);
            });
        } else {
          return;
        }
      }
    });
  }

  /**
   * Navigates through lines with ArrowUp and ArrowDown keys.
   * @param {number} direction - Direction to navigate (-1 for up, 1 for down).
   */
  navigateLines(direction) {
    const newIndex = this.model.activeIndex + direction;
    if (newIndex >= 0 && newIndex < this.cachedLines.length) {
      this.setActiveLine(this.cachedLines[newIndex], newIndex);
    }
  }
}
