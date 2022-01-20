import Todo from "./Todo";
import type { ITodoData } from "./Todo";
import api from "../apis/api";

interface ITodoList {
  edit(e: Event): void;
  delete(e: Event): void;
  render(): void;
}

export default class TodoList implements ITodoList {
  #data: ITodoData[] | null;
  #container: any;

  constructor($target: HTMLDivElement, data: ITodoData[] | null) {
    this.#data = data;
    this.#container = document.createElement("section");
    this.#container.className = "container";
    this.#container.onclick = this.onClick.bind(this);
    this.#container.onchange = this.onChange.bind(this);

    $target.appendChild(this.#container);

    this.render();
  }

  edit() {
    alert("변경하기");
  }

  delete() {
    alert("삭제하기");
  }

  onClick(event: Event) {
    const target = event.target as HTMLButtonElement;
    let action = target.dataset.action as keyof ITodoList;
    if (action && this[action]) {
      this[action]();
    }
  }

  onChange(event: Event) {
    const target = event.target as HTMLInputElement;

    if (target.tagName === "INPUT") {
      const id = target.id;
      api.updateTodo(id, {
        completed: !!!target.checked,
      });
    }
  }

  render() {
    this.#container.innerHTML = "";

    if (!this.#data || this.#data.length < 1) {
      const listPlaceholder = document.createElement("div");
      listPlaceholder.innerHTML = "<p>할일을 등록해주세요.</p>";
      listPlaceholder.className = "todo-list-placeholder";
      this.#container.appendChild(listPlaceholder);

      return;
    }

    const list = document.createElement("section");
    list.className = "todo-list";
    this.#data.forEach((data) => new Todo(list, data));
    this.#container.appendChild(list);
  }
}
