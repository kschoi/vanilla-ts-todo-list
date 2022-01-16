import { ITodoData } from "../entities";

export default class Todo {
  todo: any;

  constructor({ $target, data }: { $target: HTMLDivElement; data: ITodoData }) {
    this.todo = document.createElement("article");
    this.todo.className = "todo";
    this.todo.dataset.id = data.id;

    $target.appendChild(this.todo);
  }

  render() {}
}
