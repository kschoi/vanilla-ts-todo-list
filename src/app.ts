import TodoList from "./components/TodoList";
import api from "./api";

export default class App {
  constructor($target: HTMLDivElement) {
    const getInitialData = async () => {
      const data = await api.fetchAllTodos();
      return data;
    };

    getInitialData().then((data) => {
      new TodoList($target, data);
    });
  }
}
