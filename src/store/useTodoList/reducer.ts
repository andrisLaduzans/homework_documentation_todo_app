import { neverReach } from "../../utils";
import { Action, State } from "./types";

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "CREATE": {
      const newState: State = {
        status: "success",
        data:
          state.data === null
            ? [action.payload]
            : [action.payload, ...state.data],
      };

      return newState;
    }

    case "SET_ALL": {
      const newState: State = {
        status: "success",
        data: action.payload,
      };
      return newState;
    }

    case "EDIT": {
      if (!state.data) {
        throw new Error(
          "useTodoContext reducer, edit action did not found any lists"
        );
      }
      const existingTodos = state.data;
      const matchingTodoIdx = existingTodos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (matchingTodoIdx === -1) {
        throw new Error(
          "useTodoContext reducer, edit action tried editing non existing item"
        );
      }

      let updatedItem = {
        ...existingTodos[matchingTodoIdx],
        ...action.payload,
      };

      existingTodos.splice(matchingTodoIdx, 1, updatedItem);

      const newState: State = {
        status: "success",
        data: existingTodos,
      };

      return newState;
    }

    default: {
      neverReach(action);
      return state;
    }
  }
};
