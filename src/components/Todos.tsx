import { useSelector } from "react-redux";
import { RootState, remove } from "../redux/store";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const Todos = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos);

  const handleDeleteButton = (id: string) => {
    dispatch(remove(id))
  }
  return (
    <>
      <h2>Check out your To-dos</h2>
      <ul>
        {todos && todos.map((todo) => 
          <li key={todo.id}>
            <Link to={`/${todo.id}`}>{todo.text}</Link>
            <button
              onClick={() => handleDeleteButton(todo.id)}
              style={{
              marginLeft: "10px",
              }}
            >
              삭제
            </button>
          </li>
        )}
      </ul>
    </>
  );
};

export default Todos;
