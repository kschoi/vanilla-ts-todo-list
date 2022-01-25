import TodoList from "./components/TodoList";
import api from "./apis/api";

export default class App {
  constructor($target: HTMLDivElement) {
    const getInitialData = async () => {
      const data = await api.fetchAll();
      return data;
    };

    getInitialData().then((data) => {
      new TodoList({
        $target,
        data,
      });
    });
  }
}
