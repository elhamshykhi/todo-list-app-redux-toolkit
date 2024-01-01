import { CheckIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { completeAsyncTodo, deleteAsyncTodo } from "../features/todo/todoSlice";

function TodoItem({ id, title, completed }) {
  const dispatch = useDispatch();

  return (
    <li
      className={`p-2 bg-white rounded-full flex items-center justify-between gap-x-2 font-medium overflow-hidden ${
        completed ? "opacity-60" : ""
      }`}
    >
      <span className="flex items-center gap-x-1.5 max-w-[calc(100%_-_70px)]">
        <label htmlFor={id} className="flex items-center cursor-pointer">
          {completed ? (
            <CheckIcon className="w-5 h-5 stroke-violet-400" />
          ) : (
            <span className="w-5 h-5 bg-gray-100 inline-block rounded-full relative transition-all duration-200 ease-in overflow-hidden z-10 shadow-[2px_2px_4px_#c5c5c5,inset_-4px_-4px_4px_#ffffff]"></span>
          )}
        </label>

        <input
          type="checkbox"
          name={id}
          id={id}
          checked={completed}
          className="appearance-none"
          onChange={() => dispatch(completeAsyncTodo({ id, completed }))}
        />

        <p
          className={`capitalize text-ellipsis break-all w-full max-w-full line-clamp-1 ${
            completed ? "line-through" : ""
          }`}
        >
          {title}
        </p>
      </span>

      <button
        type="button"
        className="delete_btn button"
        onClick={() => dispatch(deleteAsyncTodo({ id }))}
      >
        delete
      </button>
    </li>
  );
}

export default TodoItem;
