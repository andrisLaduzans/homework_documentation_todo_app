import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useLocalStorage } from "../../integration";
import { useUserContext } from "../useUser";
import { reducer } from "./reducer";
import { Action, State, Todo } from "./types";

export const todoStorageKey = "@todoList";

interface ITodoContext {
  state: State;
  list: Todo[];
  dispatch: React.Dispatch<Action>;
}

const TodoContext = createContext<ITodoContext>({
  state: {
    status: "loading",
    data: null,
  },
  list: [],
  dispatch: () => null,
});

interface Props {
  children: ReactNode;
}

export const TodoContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(reducer, {
    status: "loading",
    data: null,
  });
  const { getStorage, setStorage } = useLocalStorage<Todo[]>();
  const { state: userState } = useUserContext();

  const [list, setList] = useState<Todo[]>([]);

  useEffect(() => {
    if (userState.status !== "success" || state.status !== "success") {
      return;
    }

    if (
      !userState.data?.user?.id ||
      !userState.data?.user?.isLoggedIn ||
      !state.data
    ) {
      setList([]);
      return;
    }

    const filteredByUser = state.data.filter(
      (it) => it.ownerId === userState.data?.user?.id
    );

    setList(filteredByUser);
  }, [state, userState]);

  useEffect(() => {
    if (userState.data?.user?.isLoggedIn && state.status === "success") {
      setStorage(todoStorageKey, state.data);
    }
  }, [setStorage, state.data, state.status, userState.data?.user?.isLoggedIn]);

  useEffect(() => {
    const storedList = getStorage(todoStorageKey);

    dispatch({
      type: "SET_ALL",
      payload: storedList === null ? [] : storedList,
    });
  }, [getStorage]);

  return (
    <TodoContext.Provider value={{ state, list, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => useContext(TodoContext);
