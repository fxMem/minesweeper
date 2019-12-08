import * as React from "react";
import { Progress } from "../progress/ProgressProvider";
import { Router } from "./Router";
import { Client } from "../client/Client";
import { useMemo, useState, useCallback } from "react";
import { reportProgressForPromise } from "../progress/reportProgressForPromise";
import { LoginComponent } from "../login/LoginComponent";
import { EventEmitter } from "../common/EventEmitter";
import { ProgressState, ProgressInfo, OperationStatus } from "../progress/ProgressContext";
import { useHistory } from "react-router-dom";


export function AppComponent() {
    const [connected, setConnected] = useState(false);
    const progressEvent = useMemo(() => new EventEmitter<ProgressInfo>(), []);
    const reportProgressCallback = function <T>(promise: Promise<T>) {
        return reportProgressForPromise(p => progressEvent.emit(p), promise);
    }
    const client = useMemo(() => new Client(reportProgressCallback), []);

    React.useEffect(() => {
        client.connect('root', 'root');
    }, []);

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

    //client.connect('root', 'root');

    return <Progress progressEvent={progressEvent}>
        {
            //  <Router client={client}></Router>
            !connected
                ? <LoginComponent loginClient={client}></LoginComponent>
                : <Router client={client}></Router>
        }
    </Progress>
}