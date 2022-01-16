import { ITodoData } from "./todo.types";

export class Todo {
  id: number;
  title: string;
  completed: boolean;

  constructor(data: ITodoData) {
    this.id = data.id;
    this.title = data.title;
    this.completed = data.completed;
  }
}
