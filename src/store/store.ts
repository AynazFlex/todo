import { legacy_createStore } from "redux";
import todoReducer from "./todoReducer";

const store = legacy_createStore(
    todoReducer
);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

type Properties<T> = T extends { [key: string]: infer U } ? U : never;
export type InferActions<T extends { [key: string]: (...args: any[]) => any }> =
  ReturnType<Properties<T>>;

export default store;