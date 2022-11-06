import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { actions } from "../../store/todoReducer";
import ToDo from "./Todo";
import "./Todos.scss";

type TSelect = "All" | "Completed" | "Active";

interface ISelect {
  select: TSelect
  callback: (select: TSelect) => void
  selecting: (s: TSelect) => string
}

const Select: FC<ISelect> = ({ select, callback, selecting }) => (
  <button onClick={() => callback(select)} className={selecting(select)}>
    {select}
  </button>
);

const Todos: FC = () => {
  const todos = useSelector((state: RootState) => state.todos);
  const dispatch: (AnyAction: any) => AppDispatch = useDispatch();
  const [select, setSelect] = useState<TSelect>("All");

  const selecting = (s: TSelect) =>
    select === s ? "todos-selected" : "";

  return todos.length > 0 ? (
    <div className="todos-wrapper">
      <div className="todos-panel">
        <div className="todos-items">{`items ${todos.length}`}</div>
        <div className="todos-select">
          <Select select="All" callback={setSelect} selecting={selecting}/>
          <Select select="Active" callback={setSelect} selecting={selecting}/>
          <Select select="Completed" callback={setSelect} selecting={selecting}/>
        </div>
        <button
          onClick={() => {
            todos.forEach(todo => todo.done && localStorage.removeItem(`${todo.id}`))
            dispatch(actions.deleteDoneTodos())
          }}
          className="todos-clear"
        >
          Clear completed
        </button>
      </div>
      <div className="todos-items">
        {select === "All"
          ? todos.map((todo) => <ToDo key={todo.id} {...todo} />)
          : select === "Active"
          ? todos.reduce<JSX.Element[]>((list, todo) => {
              !todo.done && list.push(<ToDo key={todo.id} {...todo} />)
              return list
            }, [])
          : todos.reduce<JSX.Element[]>((list, todo) => {
              todo.done && list.push(<ToDo key={todo.id} {...todo} />)
              return list
          }, [])}
      </div>
    </div>
  ) : (
    <div className="todos-empty">empty list</div>
  );
};

export default Todos;
