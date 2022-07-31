import { FC, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { actions } from "../../store/todoReducer";
import "./Input.scss"


const Input: FC = () => {
    const [text, setText] = useState<string>('');
    const dispatch: (AnyAction: any) => AppDispatch = useDispatch();
    const input = useRef<HTMLInputElement>(null);

    const submit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        if(text) {
            const date = Date.now();
            dispatch(actions.addTodo(text, date))
            localStorage.setItem(`${date}`, JSON.stringify({ body: text, done: false, id: date }))
            setText('');
        } else input.current?.focus();
    }

    return (
        <form className="input-container" onSubmit={submit}>
            <input ref={input} type="text" onChange={(e) => setText(e.target.value)} placeholder="new todo" value={text}/>
            <button onClick={submit}>ADD</button>
        </form>
    )
}

export default Input;