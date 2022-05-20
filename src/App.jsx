import { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodos";
import { IncompleteTodo } from "./components/IncompleteTodos";
import { CompleteTodo } from "./components/CompleteTodos";

export function App() {
  const [todoText, setTodoText] = useState("");

  const [inCompleteTodos, setInCompleteTodos] = useState([
    "ああああ",
    "いいいい"
  ]);

  const [CompleteTodos, setCompleteTodos] = useState(["うううう"]);

  const onChangeTodoText = (event) => setTodoText(event.target.value);

  const onClickAddText = () => {
    if (todoText === "") return;
    const newTodos = [...inCompleteTodos, todoText];
    setInCompleteTodos(newTodos);
    setTodoText("");
  };

  const onClickDelete = (index) => {
    const newTodos = [...inCompleteTodos];
    newTodos.splice(index, 1);
    setInCompleteTodos(newTodos);
  };

  const onClickComplete = (index) => {
    const newIncompleteTodos = [...inCompleteTodos];
    newIncompleteTodos.splice(index, 1);

    const newCompleteTodos = [...CompleteTodos, inCompleteTodos[index]];
    setInCompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  const onClickBack = (index) => {
    const newCompleteTodos = [...CompleteTodos];
    newCompleteTodos.splice(index, 1);

    const newIncompleteTodos = [...inCompleteTodos, CompleteTodos[index]];
    setCompleteTodos(newCompleteTodos);
    setInCompleteTodos(newIncompleteTodos);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onClick={onClickAddText}
        onChange={onChangeTodoText}
        disabled={inCompleteTodos.length >= 5}
      />
      {inCompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>登録できるのは5個まで！</p>
      )}
      <IncompleteTodo
        todos={inCompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodo todos={CompleteTodos} onClickBack={onClickBack} />
    </>
  );
}
