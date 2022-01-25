import Todo from "./Todo";
import type { ITodoData } from "./Todo";
import api from "../apis/api";

interface ITodoList {
  edit(id: number): any;
  delete(id: number): any;
}

export default class TodoList implements ITodoList {
  #data: ITodoData[];
  #container: any;

  constructor({
    $target,
    data,
  }: {
    $target: HTMLDivElement;
    data: ITodoData[];
  }) {
    this.#data = data || [];
    this.#container = document.createElement("section");
    this.#container.className = "container";
    this.#container.onclick = this.onClick.bind(this);
    this.#container.onchange = this.onChange.bind(this);

    $target.appendChild(this.#container);

    this.render();
  }

  async add(title: string) {
    console.log("추가하기", title);
    const todo = await api.add({
      title,
      completed: false,
    });
    this.#data.push(todo);
    this.render();
  }

  async delete(id: number) {
    console.log("삭제하기", id);
    const idx = this.#data.findIndex((item) => item.id === id);

    if (idx > -1) {
      const todo = api.delete(id);
      this.#data.splice(idx, 1);
      this.render();
      return todo;
    }
  }

  async check(id: number, isChecked: boolean) {
    console.log("체크하기", id, isChecked);
    const idx = this.#data.findIndex((item) => item.id === id);

    if (idx > -1) {
      const todo = api.update(id, {
        completed: isChecked,
      });
      this.#data.splice(idx, 1, {
        ...this.#data[idx],
        completed: isChecked,
      });
      this.render();
      return todo;
    }
  }

  edit(id: number) {
    console.log("변경하기", id);
  }

  onClick(e: Event) {
    const $target = e.target as HTMLElement;
    const $currentTodo = $target.closest(".todo") as HTMLElement;
    const action = $target.dataset.action as keyof ITodoList;

    if (!$currentTodo) {
      return;
    }

    if (action && this[action]) {
      const id = parseInt($currentTodo.dataset.id!);
      this[action](id);
    }
  }

  onChange(e: Event) {
    const target = e.target as HTMLInputElement;

    if (target.type === "checkbox") {
      this.check(parseInt(target.id), target.checked);
    }
  }

  onSubmit(e: Event) {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const input = target.elements[0] as HTMLInputElement;

    if (input.value) {
      this.add(input.value);
    }
  }

  render() {
    this.#container.innerHTML = "";

    // date
    const date = new Date().toISOString().split("T")[0];
    this.#container.insertAdjacentHTML(
      "afterbegin",
      `<h1 class="title">${date}</h1>`
    );

    // counter
    const remaining = this.#data.filter((v) => !v.completed).length;
    this.#container.insertAdjacentHTML(
      "beforeend",
      `<p class="todo-counter">할 일이 ${remaining}개 남았습니다.</p>`
    );

    // list
    if (this.#data.length > 0) {
      const list = document.createElement("section");
      list.className = "todo-list";
      this.#data.forEach((data) => new Todo(list, data));
      this.#container.appendChild(list);
    }

    // regist
    const form = document.createElement("form");
    form.name = "todoForm";
    form.onsubmit = this.onSubmit.bind(this);
    form.innerHTML = `<input type="text" id="todo-input" class="todo-input" value="" />`;
    this.#container.appendChild(form);
  }
}
