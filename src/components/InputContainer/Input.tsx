import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { actions } from "../../store/todoReducer";
import "./Input.scss"


const Input: FC = () => {
    const [text, setText] = useState<string>('');
    const dispatch: (AnyAction: any) => AppDispatch = useDispatch();

    const submit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        dispatch(actions.addTodo(text))
        setText('');
    }

    return (
        <form className="input-container" onSubmit={submit}>
            <input type="text" onChange={(e) => setText(e.target.value)} placeholder="new todo" value={text}/>
            <button onClick={submit}>ADD</button>
        </form>
    )
}

export default Input;