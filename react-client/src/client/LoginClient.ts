import { DisposeCallback } from "../common/Callbacks";

export type ConnectionInfo = { connected: boolean };
export type ConnectionStateChangedCallback = ({ connected }: ConnectionInfo) => void;

export interface LoginClient {
    connect(nickname: string, password?: string): Promise<boolean>;

    onConnectionStateChanged(callback: ConnectionStateChangedCallback): DisposeCallback;

    Nickname: string;
}