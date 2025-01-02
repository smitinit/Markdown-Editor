export class EditorModel {
  /**
   * Represents the state of the editor, including active line and index.
   */
  constructor() {
    /** @type {HTMLElement | null} */
    this.activeLine = null;
    /** @type {number | null} */
    this.activeIndex = null;
    /** @type {number} */
    this.initialNumber = 0;

    /** @type {number} */
    this.initialLines = 25;
    /** @type {number} */
    this.minNumberOfLines = 10;
  }

  /**
   * Updates the currently active line and its index.
   * @param {HTMLElement} line - The active line element.
   * @param {number} index - The index of the active line.
   */
  updateActiveLine(line, index) {
    this.activeLine = line;
    this.activeIndex = index;
  }
}
