import { FC } from 'react';
import './App.scss';
import Input from './components/InputContainer/Input';
import Todos from './components/TodosContainer/Todos';

const App: FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        ToDo
      </header>
      <Input />
      <Todos />
    </div>
  );
}

export default App;
