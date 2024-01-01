import { useState } from "react";
import { useDispatch } from "react-redux";
import { addAsyncTodo } from "../features/todo/todoSlice";

function AddTodoForm() {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return null;

    dispatch(addAsyncTodo({ title: value }));
    setValue("");
  };

  return (
    <div className="z-50 flex flex-col items-center justify-center bg-[url('./src/assets/bgImg.jpg')] bg-center bg-cover bg-no-repeat h-52 px-4 fixed top-0 inset-x-0">
      <h1 className="text-3xl font-bold tracking-widest capitalize mb-4 text-white">
        todo list
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-screen-sm flex items-center justify-between rounded-full overflow-hidden p-2"
      >
        <input
          type="text"
          name="name"
          id=""
          placeholder="Add new todo ..."
          autoComplete="off"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="pl-4 sm:px-4 placeholder:text-sm placeholder:text-gray-400 w-[calc(100%_-_80px)] sm:w-[calc(100%_-_100px)] h-full text-violet-950 focus:outline-none font-medium bg-transparent"
        />

        <button type="submit" className="submit_btn button font-bold">
          add todo
        </button>
      </form>
    </div>
  );
}

export default AddTodoForm;
