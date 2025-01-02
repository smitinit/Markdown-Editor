export class NumberRowView {
  /**
   * Handles rendering and updating the number row in the editor.
   * @param {HTMLElement} numberRow - The container element for the number row.
   */
  constructor(numberRow) {
    this.numberRow = numberRow;
  }

  /**
   * Adds a new number to the number row.
   * @param {number} number - The number to display.
   */
  addNumber(number) {
    const numberBox = document.createElement("span");
    numberBox.classList.add("number");
    numberBox.textContent = number;
    this.numberRow.appendChild(numberBox);
  }

  /**
   * Removes the last number in the number row.
   */
  removeLastNumber() {
    const lastNumber = this.numberRow.lastElementChild;
    if (lastNumber) {
      lastNumber.remove();
    }
  }
}
