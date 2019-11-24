import * as React from "react";
import { Progress } from "../progress/ProgressProvider";
import { Router } from "./Router";
import { Client } from "../client/Client";
import { useMemo, useState, useCallback } from "react";
import { reportProgress } from "../progress/reportProgress";
import { LoginComponent } from "../login/Login";
import { EventEmitter } from "../common/EventEmitter";
import { ProgressState, ProgressInfo, OperationStatus } from "../progress/ProgressContext";


export function AppComponent() {
    const [connected, setConnected] = useState(false);
    const progressEvent = useMemo(() => new EventEmitter<ProgressInfo>(), []);
    const reportProgressCallback = function <T>(promise: Promise<T>) {
        return reportProgress(p => progressEvent.emit(p), promise);
    }
    const client = useMemo(() => new Client(reportProgressCallback), []);
    client.onConnectionStateChanged(({ connected }) => {

        // Temporary, for the sake of display.
        if (!connected) {
            progressEvent.emit({
                status: OperationStatus.Error,
                error: { message: 'Server is not availble!' }
            });
        }

        setConnected(connected);
    });

    return <Progress progressEvent={progressEvent}>
        {
            !connected
                ? <LoginComponent loginClient={client}></LoginComponent>
                : <Router client={client}></Router>
        }
    </Progress>
}