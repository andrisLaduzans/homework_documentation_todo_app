import { DataState } from "../types";

export interface Todo extends Record<string, unknown> {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  createdOn: string;
  isCompleted: boolean;
}

export type State = DataState<Todo[]>;

interface BaseAction {
  type: "CREATE" | "SET_ALL" | "EDIT";
}

interface CreateAction extends BaseAction {
  type: "CREATE";
  payload: Todo;
}

interface SetAllAction extends BaseAction {
  type: "SET_ALL";
  payload: Todo[];
}

interface EditAction extends BaseAction {
  type: "EDIT";
  payload: Todo;
}

export type Action = CreateAction | SetAllAction | EditAction;
