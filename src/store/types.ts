interface BaseState {
  status: "loading" | "error" | "success";
}

interface LoadingState extends BaseState {
  status: "loading";
  data: null;
}

interface ErrorState extends BaseState {
  status: "error";
  data: null;
}

interface SuccessState<T extends {} | [] | null> extends BaseState {
  status: "success";
  data: T;
}

export type DataState<T extends {} | [] | null> =
  | LoadingState
  | ErrorState
  | SuccessState<T>;
