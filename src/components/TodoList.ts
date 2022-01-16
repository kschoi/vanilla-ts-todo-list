import { ITodoData } from "../entities";

export default class TodoList {
  data: ITodoData[] | null;
  container: any;

  constructor($target: HTMLDivElement, data: ITodoData[] | null) {
    this.data = data;
    this.container = document.createElement("section");
    this.container.className = "todos";
    $target.appendChild(this.container);

    this.render();
  }

  render() {
    this.container.innerHTML = "";

    if (!this.data || this.data.length < 1) {
      const listPlaceholder = document.createElement("div");
      listPlaceholder.innerHTML = "<p>할일을 등록해주세요.</p>";
      listPlaceholder.className = "list-placeholder";
      this.container.appendChild(listPlaceholder);

      return;
    }

    const list = document.createElement("ul");
    list.innerHTML = JSON.stringify(this.data);
    this.container.appendChild(list);
  }
}
