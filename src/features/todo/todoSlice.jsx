import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

// get all todos
export const getAsyncTodos = createAsyncThunk(
  "todos/getAsyncTodos",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/todos");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// add new todo
export const addAsyncTodo = createAsyncThunk(
  "todos/addAsyncTodo",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/todos", {
        id: Date.now(),
        title: payload.title,
        completed: false,
      });

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// toggle complete a todo
export const completeAsyncTodo = createAsyncThunk(
  "todos/completeAsyncTodo",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`/todos/${payload.id}`, {
        completed: !payload.completed,
      });

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// delete a todo
export const deleteAsyncTodo = createAsyncThunk(
  "todos/deleteAsyncTodo",
  async (payload, { rejectWithValue }) => {
    try {
      await api.delete(`/todos/${payload.id}`);
      return { id: payload.id };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    isLoading: false,
    todos: [],
    error: "",
  },
  // reducers: {
  //   addTodo: (state, action) => {
  //     const newTodo = {
  //       id: Date.now(),
  //       title: action.payload.title,
  //       completed: false,
  //     };
  //     state.tasks.push(newTodo);
  //   },
  //   completeTodo: (state, action) => {
  //     const selectedTodo = state.tasks.find(
  //       (todo) => todo.id === action.payload.id
  //     );
  //     selectedTodo.completed = !selectedTodo.completed;
  //   },
  //   deleteTodo: (state, action) => {
  //     state.tasks = state.tasks.filter((todo) => todo.id !== action.payload.id);
  //   },
  // },
  extraReducers: (builder) => {
    builder
      .addCase(getAsyncTodos.pending, (state, action) => {
        state.isLoading = true;
        state.todos = [];
        state.error = "";
      })
      .addCase(getAsyncTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos = action.payload;
        state.error = "";
      })
      .addCase(getAsyncTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.todos = [];
        state.error = action.payload;
      });
    builder
      .addCase(addAsyncTodo.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addAsyncTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos.push(action.payload);
      })
      .addCase(addAsyncTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(completeAsyncTodo.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(completeAsyncTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        const selectedTodo = state.todos.find(
          (todo) => todo.id === action.payload.id
        );
        selectedTodo.completed = action.payload.completed;
      })
      .addCase(completeAsyncTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(deleteAsyncTodo.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteAsyncTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos = state.todos.filter(
          (todo) => todo.id !== action.payload.id
        );
      })
      .addCase(deleteAsyncTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { addTodo, completeTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
