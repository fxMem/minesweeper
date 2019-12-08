import { DisposeCallback } from "./Callbacks";

type CallbackType<T> = (payload: T) => void;
export class EventEmitter<T> {

    private callbacks: CallbackType<T>[] = [];

    public subscribe(callback: CallbackType<T>): DisposeCallback {
        this.callbacks.push(callback);

        return () => {
            this.callbacks = this.callbacks.filter(c => c !== callback);
        }
    }

    public emit(payload: T) {
        this.callbacks.forEach(c => c(payload));
    }
}