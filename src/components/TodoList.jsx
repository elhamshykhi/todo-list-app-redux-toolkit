import { useDispatch, useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import { useEffect } from "react";
import { getAsyncTodos } from "../features/todo/todoSlice";

function TodoList() {
  const { todos, isLoading, error } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAsyncTodos());
  }, [dispatch]);

  return (
    <div className="max-w-screen-sm mx-auto py-4 mt-52">
      {isLoading ? (
        <p>data is loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : todos.length ? (
        <ul className="flex flex-col gap-y-2">
          {todos.map((todo) => (
            <TodoItem key={todo.id} {...todo} />
          ))}
        </ul>
      ) : (
        <div className="capitalize text-center">
          <p className="text-violet-400 text-xl tracking-widest">
            todo list is empty!
          </p>
          <p className="text-violet-500 text-sm tracking-wider">
            add your first todo!
          </p>
        </div>
      )}
    </div>
  );
}

export default TodoList;
