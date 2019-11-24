import * as React from "react";

export enum OperationStatus {
    Started,
    Running,
    Finished,
    Error
}

export type ProgressInfo = {
    operationName?: string;
    status: OperationStatus;
    progressPercentage?: number;
    error?: any;
}

export type ProgressState = {
    message: string;
}

export type ProgressContextData = {
    progressState: ProgressState,
    reportProgress: (info: ProgressInfo) => void
}

export function createEmptyProgressState(): ProgressState {
    return {
        message: null
    };
}

export const ProgressContext = React.createContext<ProgressContextData>({
    progressState: createEmptyProgressState(),
    reportProgress: () => { }
});

export function updateProgressState(state: ProgressState, progressInfo: ProgressInfo): ProgressState {
    return { message: progressInfo.error?.message || state.message };
}
