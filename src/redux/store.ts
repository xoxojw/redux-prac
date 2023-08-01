import shortid from "shortid";
import { createStore } from "redux";
import { createSlice, configureStore, createReducer, createAction, PayloadAction } from "@reduxjs/toolkit";

export type RootState = {
  todos: Todo[];
};

export type Todo = {
  id: string;
  text: string;
}

const initialState: RootState = {
  todos: [
    {
      id: shortid(),
      text: "리액트 공부하기"
    },
    {
      id: shortid(),
      text: "밥먹기",
    }
  ]
}

// 3. createSlice
const todoSlice = createSlice({
  name: "todosReducer",
  initialState,
  reducers: {
    add: (state, action) => {
      state.todos.push({ text: action.payload, id: shortid() });
    },
    remove: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    }
  }
})

const store = configureStore({
  reducer: todoSlice.reducer
});

export const { add, remove } = todoSlice.actions;
export default store;
