# 정리

## 1. `createAction` + 직접 reducer 설정
- rtk의 `createAction` 함수를 사용하여 action creator 정의
- `createAction` 함수는 자동으로 action creator 함수를 생성하여 action object를 생성한다.
  - (ex. { type: 'ADD', payload: actionPayload })
- 그 후 reducer 함수를 직접 정의하여, `action type`과 `payload`를 기반으로 상태가 어떻게 업데이트되는지를 지정합니다.
- state가 변화하면 state를 직접 변경하지 않고, reducer 함수에서 새로운 state를 생성하여 반환한다.

## 2. `createAction` + `createReducer`
- rtk의 `createAction` 및 `createReducer` 함수를 모두 사용한다.
- `createAction` 함수는 1번 방법과 마찬가지로 action creator를 정의하는데 사용
- `createReducer` 함수는 reducer를 보다 간결하게 정의하고, action type에 따라 state 업데이트를 자동으로 처리하는 reducer 함수를 생성한다.
- state를 직접 수정해도 `immer`의 존재 때문에 상태의 불변성이 유지되며, 새로운 state로 반환할 필요가 없음

<br />

### RTK 2.0.0부터 `createReducer` 대신 `builder callback` 기반으로 변경
> console.log 경고 메시지
> bundle.js:1712 The object notation for `createReducer` is deprecated, and will be removed in RTK 2.0. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createReducer

```tsx
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
export const addTodo = createAction<string>(ADD);
export const deleteTodo = createAction<string>(DELETE);

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

// redux-toolkit: createAction, createReducer with builder callback
const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addTodo, (state, action: ActionType) => {
      state.todos.push({ text: action.payload, id: shortid() });
    })
    .addCase(deleteTodo, (state, action: ActionType) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    });
});

const store = createStore(reducer);

export default store;
```