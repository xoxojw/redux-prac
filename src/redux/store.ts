import shortid from "shortid";
import { createStore } from "redux";
import { createReducer, createAction, PayloadAction } from "@reduxjs/toolkit";

export type RootState = {
  todos: Todo[];
};

export type Todo = {
  id: string;
  text: string;
}

const ADD = "ADD";
const DELETE = "DELETE";

type AddAction = PayloadAction<string, typeof ADD>;
type DeleteAction = PayloadAction<string, typeof DELETE>;
type ActionType = AddAction | DeleteAction;

// createAction
export const addTodo = createAction<String>(ADD);
export const deleteTodo = createAction<String>(DELETE);

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

// 1. createAction, reducer
// 새로운 state를 리턴
// const reducer = (state: RootState = initialState, action: ActionType): RootState => {
//   switch (action.type) {
//     case ADD:
//       console.log("action => ", action);
//       return { todos: [{ text: action.payload, id: shortid() }, ...state.todos] };
//     case DELETE:
//       return { todos: state.todos.filter(todo => todo.id !== action.payload) };
//     default:
//       return state;
//   }
// };

// 2. redux-toolkit: createAction, createReducer
// createReducer를 사용하면 현재 state를 mutate할 수 있음 (immer)
const reducer = createReducer(initialState, {
  [addTodo.type]: (state: RootState = initialState, action: ActionType) => {
    state.todos.push({ text: action.payload, id: shortid() });
   },
  [deleteTodo.type]: (state: RootState = initialState, action: ActionType) => {
    state.todos = state.todos.filter(todo => todo.id !== action.payload);
   },
})

const store = createStore(reducer);

export default store;
