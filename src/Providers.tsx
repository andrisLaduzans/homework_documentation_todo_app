import { ReactNode } from "react";
import { TodoContextProvider, UserContextProvider } from "./store";

interface Props {
  children: ReactNode;
}

export const Providers = ({ children }: Props) => {
  return (
    <UserContextProvider>
      <TodoContextProvider>{children}</TodoContextProvider>
    </UserContextProvider>
  );
};
