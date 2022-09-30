import {
  createContext,
  ReactNode,
  useEffect,
  useContext,
  useState,
  useCallback,
} from "react";
import { useLocalStorage } from "../integration";
import { DataState } from "./types";
import { v4 as uuidv4 } from "uuid";

export const userStorageKey = "@user";

export type User = {
  id: string;
  email: string;
  password: string;
  isLoggedIn: boolean;
};

type State = DataState<{
  users: User[];
  user: User | null;
} | null>;

interface IUserContext {
  state: State;
  onSignIn: (data: {
    email: string;
    password: string;
  }) => Promise<string | undefined>;

  onLogin: (data: { email: string; password: string }) => Promise<{
    validEmail: boolean;
    validPassword: boolean;
  }>;

  onLogout: () => void;
}

const UserContext = createContext<IUserContext>({
  state: {
    status: "loading",
    data: null,
  },
  onSignIn: () => new Promise(() => null),
  onLogin: () => new Promise(() => null),
  onLogout: () => null,
});

interface Props {
  children: ReactNode;
}

export const UserContextProvider = ({ children }: Props) => {
  const [state, setState] = useState<State>({
    status: "loading",
    data: null,
  });

  const { getStorage, setStorage } = useLocalStorage<User[]>();

  useEffect(() => {
    const users = getStorage(userStorageKey);

    if (users === null) {
      setState({
        status: "success",
        data: null,
      });
    } else {
      const activeUser = users.find((user) => user.isLoggedIn) || null;

      setState({
        status: "success",
        data: {
          user: activeUser,
          users,
        },
      });
    }
  }, [getStorage]);

  const onSignIn = async (data: {
    email: string;
    password: string;
  }): Promise<string | undefined> => {
    const user = {
      id: uuidv4(),
      email: data.email,
      password: data.password,
      isLoggedIn: true,
    };

    const existingUsers = state.data?.users || [];

    const userAlreadyExists = existingUsers.find(
      (user) => user.email === data.email
    );

    if (userAlreadyExists) {
      return "User Already Exists";
    }

    existingUsers.push(user);

    const newState: State = {
      status: "success",
      data: {
        user,
        users: existingUsers,
      },
    };

    setState(newState);
    setStorage(userStorageKey, existingUsers);
  };

  const onLogin = useCallback(
    async (data: {
      email: string;
      password: string;
    }): Promise<{
      validEmail: boolean;
      validPassword: boolean;
    }> => {
      if (!state.data) {
        return { validEmail: false, validPassword: false };
      }

      const existingUsers = state.data.users || [];
      const matchingUserIdx = existingUsers.findIndex((user) => user.email);
      const matchingUser = existingUsers[matchingUserIdx];

      if (!matchingUser) {
        return {
          validEmail: false,
          validPassword: true,
        };
      }

      const validPassword = matchingUser.password === data.password;
      if (!validPassword) {
        return {
          validEmail: true,
          validPassword,
        };
      }

      if (matchingUser && validPassword) {
        const updatedUser: User = {
          ...matchingUser,
          isLoggedIn: true,
        };

        existingUsers.splice(matchingUserIdx, 1, updatedUser);

        setState({
          status: "success",
          data: {
            users: existingUsers,
            user: updatedUser,
          },
        });

        setStorage(userStorageKey, existingUsers);
      }

      return {
        validEmail: true,
        validPassword,
      };
    },
    [setStorage, state.data]
  );

  const onLogout = useCallback(() => {
    if (
      state.status !== "success" ||
      state.data === null ||
      state.data.user === null
    ) {
      return;
    }

    const existingUsers = state.data.users || [];
    const thisUserIdx = existingUsers.findIndex(
      (user) => user.id === state.data?.user?.id
    );

    if (thisUserIdx === -1) {
      throw new Error("Logout could not find matching user in users list");
    }

    const updatedUser: User = {
      ...state.data.user,
      isLoggedIn: false,
    };

    existingUsers.splice(thisUserIdx, 1, updatedUser);

    setState({
      ...state,
      data: {
        users: existingUsers,
        user: null,
      },
    });

    setStorage(userStorageKey, existingUsers);
  }, [setStorage, state]);

  return (
    <UserContext.Provider
      value={{
        state,
        onSignIn,
        onLogin,
        onLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
