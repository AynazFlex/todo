import todoFromStorage from "../api/storageAPI";
import { InferActions } from "./store";

type Actions = InferActions<typeof actions>;

export const actions = {
    addTodo: (body: string, id: number) =>
      ({ type: "ADD_TODO", todo: { body, done: false, id } } as const),
    doneTodo: (id: number) => ({ type: "DONE_TODO", id } as const),
    deleteTodo: (id: number) => 
      ({ type: "DELETE_TODO", id } as const),
    deleteDoneTodos: () =>
      ({ type: "DELETE_DONE_TODOS"} as const),
  };

export interface ITodo {
    body: string
    done: boolean
    id: number
}

console.log(todoFromStorage);

type State = {
    todos: ITodo[]
}

const initialState: State = {
    todos: todoFromStorage,
}

const todoReducer = (state = initialState, action: Actions): State => {
    switch (action.type) {
        case "ADD_TODO":
            return {
                ...state,
                todos: [action.todo, ...state.todos]
            }
        case "DELETE_TODO":
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.id)
            }
        case "DONE_TODO":
            return {
                ...state,
                todos: state.todos.map(todo => todo.id === action.id ? {...todo, done: true} : todo)
            }
        case "DELETE_DONE_TODOS":
            return {
                ...state,
                todos: state.todos.filter(todo => todo.done === false)
            }
        default:
            return state;
    }
}

export default todoReducer