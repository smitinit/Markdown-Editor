export class EditorView {
  /**
   * Handles the rendering and updating of editor lines.
   * @param {HTMLElement} editor - The container for editor lines.
   */
  constructor(editor) {
    this.editor = editor;
  }

  /**
   * Adds a new line to the editor at the specified position.
   * @param {HTMLElement | null} afterLine - The line after which to add the new line.
   * @returns {HTMLElement} The newly created line element.
   */
  addLine(afterLine = null) {
    const newLine = document.createElement("div");
    newLine.classList.add("line");
    newLine.textContent = "";

    if (afterLine) {
      afterLine.insertAdjacentElement("afterend", newLine);
    } else {
      this.editor.appendChild(newLine);
    }

    return newLine;
  }

  /**
   * Removes a line from the editor.
   * @param {HTMLElement} line - The line to remove.
   */
  removeLine(line) {
    line.remove();
  }

  /**
   * Retrieves all lines in the editor.
   * @returns {NodeListOf<HTMLElement>} A list of all line elements.
   */
  getAllLines() {
    return this.editor.querySelectorAll(".line");
  }
}
