export type DisposeCallback = () => void;

export type Action = () => void;
export type ActionWithArgument<T> = (argument: T) => void;

