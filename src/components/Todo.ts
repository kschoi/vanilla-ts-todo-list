export interface ITodoData {
  id: string;
  title: string;
  completed: boolean;
}

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
    const { id, completed, title } = this.#data;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = id;
    checkbox.checked = completed;

    const label = document.createElement("label");
    label.innerHTML = title;
    label.htmlFor = id;

    this.#todo.appendChild(checkbox);
    this.#todo.appendChild(label);
    this.#target.appendChild(this.#todo);
  }
}
