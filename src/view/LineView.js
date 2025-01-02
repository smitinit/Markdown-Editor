export class LineView {
  /**
   * Manages the behavior and styling of individual lines in the editor.
   * @param {HTMLElement} line - The line element to manage.
   */
  constructor(line) {
    this.line = line;
  }

  /**
   * Sets the line as active, adding the appropriate styles.
   */
  setActive() {
    this.line.classList.add("line-active");
    this.line.focus();
  }

  /**
   * Removes the active state from the line.
   */
  removeActive() {
    this.line.classList.remove("line-active");
  }

  /**
   * Updates the content of the line.
   * @param {string} content - The new content for the line.
   */
  updateContent(content) {
    this.line.textContent = content;
  }

  /**
   * Retrieves the current content of the line.
   * @returns {string} The content of the line.
   */
  getContent() {
    return this.line.textContent || "";
  }
}

// export default class LineView {
//   constructor(editor) {
//     this.editor = editor;
//   }

//   renderLines(lines) {
//     this.editor.innerHTML = "";
//     lines.forEach((line, index) => {
//       const div = document.createElement("div");
//       div.classList.add("line");
//       div.textContent = line.content || `Line ${index + 1}`;
//       this.editor.appendChild(div);
//     });
//   }
// }
