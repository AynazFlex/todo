import { FC, memo, PointerEvent } from "react";
import { actions, Todo } from "../../store/todoReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Todos.scss";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";

const ToDo: FC<Todo> = ({ body, done, id }) => {
  const dispatch: (AnyAction: any) => AppDispatch = useDispatch();
  const date = new Date(id);

  return (
    <div
      onClick={() => {
        dispatch(actions.doneTodo(id))
        localStorage.setItem(`${id}`, JSON.stringify({ body, done: true, id }))
      }}
      className="todo-container"
    >
      <div className="todo-date">{`${date
        .toLocaleTimeString()
        .slice(0, 5)} ${date.toLocaleDateString()}`}</div>
      <div className="todo-info">
        <div className="todo-done">
          {done && (
            <FontAwesomeIcon className="todo-icon-done" icon={faCheck} />
          )}
        </div>
        <div className="todo-body">{body}</div>
      </div>
      <span
        onClick={(e) => {
          e.stopPropagation();
          dispatch(actions.deleteTodo(id));
          localStorage.removeItem(`${id}`);
        }}
        className="todo-delete"
      >
        <FontAwesomeIcon className="todo-icon-delete" icon={faXmark} />
      </span>
    </div>
  );
};

export default memo(ToDo);
