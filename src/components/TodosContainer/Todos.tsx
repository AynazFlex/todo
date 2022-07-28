import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { actions } from "../../store/todoReducer";
import ToDo from "./Todo";
import "./Todos.scss";

type Select = "All" | "Completed" | "Active";

const Todos: FC = () => {
  const todos = useSelector((state: RootState) => state.todos);
  const dispatch: (AnyAction: any) => AppDispatch = useDispatch();
  const [select, setSelect] = useState<Select>("All");

  const selecting = (s: Select) =>
    select === s ? "todos-selected" : "";

  const Select: FC<{ select: Select }> = ({ select }) => (
    <div onClick={() => setSelect(select)} className={selecting(select)}>
      {select}
    </div>
  );

  return todos.length > 0 ? (
    <div className="todos-wrapper">
      <div className="todos-panel">
        <div className="todos-items">{`items ${todos.length}`}</div>
        <div className="todos-select">
          <Select select="All" />
          <Select select="Active" />
          <Select select="Completed" />
        </div>
        <div
          onClick={() => dispatch(actions.deleteDoneTodos())}
          className="todos-clear"
        >
          Clear completed
        </div>
      </div>
      <div className="todos-items">
        {select === "All"
          ? todos.map((todo) => <ToDo key={todo.id} {...todo} />)
          : select === "Active"
          ? todos
              .filter((todo) => todo.done === false)
              .map((todo) => <ToDo key={todo.id} {...todo} />)
          : todos
              .filter((todo) => todo.done === true)
              .map((todo) => <ToDo key={todo.id} {...todo} />)}
      </div>
    </div>
  ) : (
    <div className="todos-empty">empty list</div>
  );
};

export default Todos;
