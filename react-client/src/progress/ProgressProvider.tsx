import * as React from "react";
import { ProgressContext, createEmptyProgressState, updateProgressState, ProgressInfo } from "./ProgressContext";
import { useState, useCallback, ReactNode, useMemo } from "react";
import { EventEmitter } from "../common/EventEmitter";
import { ProgressToolbar } from "./ProgressToolbar";


export function Progress(
    { children, progressEvent }: { children: ReactNode, progressEvent: EventEmitter<ProgressInfo> }
) {
    const [progressState, setProgressState] = useState(createEmptyProgressState());
    const updateProgress = useCallback((progressInfo) => {
        setProgressState((previousState) => updateProgressState(previousState, progressInfo));
    }, []);

    const _ = useMemo(() => progressEvent.subscribe(updateProgress), []);
    const reportProgress = useCallback((info: ProgressInfo) => progressEvent.emit(info), []);

    return (
        <ProgressContext.Provider value={{ progressState, reportProgress }} >
            <ProgressToolbar></ProgressToolbar>

            {children}
        </ProgressContext.Provider>);
}