import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/store";
import Todos from "../components/Todos";

const Home = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value)
  }
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addTodo(text));
  }
  return (
    <>
      <h1>To-Do List</h1>
      <h2>Add new To-do</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={text}
          onChange={onChange}
        />
        <button>추가</button>
      </form>
      <Todos />
    </>
  );
};

export default Home;
