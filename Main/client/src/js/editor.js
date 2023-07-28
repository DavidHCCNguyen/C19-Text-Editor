import { getDb, putDb } from "./database";
import { header } from "./header";

export default class Editor {
  constructor() {
    if (typeof CodeMirror === "undefined") {
      throw new Error("CodeMirror is not loaded");
    }

    this.editor = CodeMirror(document.querySelector("#main"), {
      value: "",
      mode: "javascript",
      theme: "material-ocean",
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    this.loadEditorContent();
    this.setupEventListeners();
  }

  async loadEditorContent() {
    const localData = localStorage.getItem("content");
    const data = await getDb();

    this.editor.setValue(data || localData || header);
  }

  setupEventListeners() {
    this.editor.on("change", () => {
      localStorage.setItem("content", this.editor.getValue());
    });

    this.editor.on("blur", () => {
      putDb(localStorage.getItem("content"));
    });
  }
}
