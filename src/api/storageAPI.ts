import { ITodo } from "../store/todoReducer";

const todoFromStorage: ITodo[] = [];

const compareNumeric = (a: ITodo, b: ITodo): number => +a.id > +b.id ? -1 : +a.id === +b.id ? 0 : 1;

for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  if (key) {
    const todo = JSON.parse(localStorage.getItem(key) || "");
    todoFromStorage.push(todo);
  }
}

todoFromStorage.sort(compareNumeric);

export default todoFromStorage;
