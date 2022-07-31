import { Todo } from "../store/todoReducer";

const todoFromStorage: Todo[] = [];

const compareNumeric = (a: Todo, b: Todo): number => +a.id > +b.id ? -1 : +a.id === +b.id ? 0 : 1;

for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  if (key) {
    const todo = JSON.parse(localStorage.getItem(key) || "");
    todoFromStorage.push(todo);
  }
}

todoFromStorage.sort(compareNumeric);

export default todoFromStorage;
