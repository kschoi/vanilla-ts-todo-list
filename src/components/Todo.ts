export interface ITodoData {
  id: number;
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

    this.render();
  }

  render() {
    const { id, completed, title } = this.#data;

    this.#todo.innerHTML = `
      <div class="todo-status">
        <input type="checkbox" id="${id}" hidden ${
      completed ? "checked" : ""
    } />
        <label for="${id}">${title}</label>
      </div>
      <div class="todo-menu">
        <button data-action="edit">변경</button>
        <button data-action="delete">삭제</button>
      </div>
    `;
    this.#target.appendChild(this.#todo);
  }
}
