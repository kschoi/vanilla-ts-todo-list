import { ITodoData } from "../entities";

export default class Todo {
  #target: HTMLElement;
  #todo: HTMLElement;
  #data: ITodoData;

  constructor(target: HTMLElement, data: ITodoData) {
    this.#target = target;
    this.#data = data;
    this.#todo = document.createElement("article");
    this.#todo.className = "todo";
    this.#todo.dataset.id = `${data.id}`;
    this.#todo.dataset.completed = `${data.completed}`;

    this.render();
  }

  render() {
    const id = `${this.#data.id}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = id;
    checkbox.readOnly = true;
    checkbox.checked = this.#data.completed;

    const label = document.createElement("label");
    label.innerHTML = this.#data.title;
    label.htmlFor = id;

    this.#todo.appendChild(checkbox);
    this.#todo.appendChild(label);
    this.#target.appendChild(this.#todo);
  }
}
