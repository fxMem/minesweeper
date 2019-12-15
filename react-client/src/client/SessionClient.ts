import { OperationResult } from "seedengine.client/core/OperationResult";
import { SessionInfo } from "seedengine.client/session/SessionInfo";
import { SessionStateChangedNotification } from "seedengine.client/session/SessionMessage";
import { DisposeCallback } from "../common/Callbacks";

export type SessionStateChangedCallback = (notification: SessionStateChangedNotification) => void;

export interface SessionClient {
    joinSession(sessionId: string): Promise<OperationResult>;

    leaveSession(sessionId: string): Promise<void>;

    createSession(isPrivate: boolean, sessionDescription?: string, join?: boolean): Promise<{
        sessionId: string
        joined?: OperationResult
    }>;

    getSession(sessionId: string): Promise<SessionInfo>;

    getSessions(): Promise<SessionInfo[]>;

    onSessionStateChange(callback: SessionStateChangedCallback): DisposeCallback;
}