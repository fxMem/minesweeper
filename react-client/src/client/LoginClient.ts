import { DisposeCallback } from "../common/DisposeCallback";

export type ConnectionInfo = { connected: boolean };
export type ConnectionStateChangedCallback = ({ connected }: ConnectionInfo) => void;

export interface LoginClient {
    connect(nickname: string, password?: string): Promise<void>;

    onConnectionStateChanged(callback: ConnectionStateChangedCallback): DisposeCallback;

    Nickname: string;
}