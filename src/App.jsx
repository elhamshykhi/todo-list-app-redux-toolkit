import { Provider } from "react-redux";
import "./App.css";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import store from "./features/store";

function App() {
  return (
    <Provider store={store}>
      <div className="bg-violet-950 min-h-[calc(100vh_-_208px)]">
        <AddTodoForm />
        <div className="px-4">
          <TodoList />
        </div>
      </div>
    </Provider>
  );
}

export default App;
