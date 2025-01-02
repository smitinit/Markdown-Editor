import { EditorModel } from "./model/EditorModel.js";
import { EditorView } from "./view/EditorView.js";
import { NumberRowView } from "./view/NumberRowView.js";
import { EditorController } from "./controller/EditorController.js";

document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth <= 768) {
    // You can adjust the value for your specific use case
    // Redirect to a message or show a warning
    document.body.innerHTML =
      "<h1>This website is only available on laptop or desktop.</h1>";
    // Optionally, you can also forcefully redirect to another URL
    // window.location.href = 'https://your-website.com';
  }

  /**
   * The main container for editor lines.
   * @type {HTMLElement}
   */
  const editorElement = document.querySelector(".editor-editable-area");

  /**
   * The container for the number row.
   * @type {HTMLElement}
   */
  const numberRowElement = document.querySelector(".editor-number-row");

  // Initialize the model, views, and controller.
  const model = new EditorModel();
  const editorView = new EditorView(editorElement);
  const numberRowView = new NumberRowView(numberRowElement);
  const controller = new EditorController(model, editorView, numberRowView);

  console.log("Editor initialized successfully!");
});
