import * as React from "react";
import { ProgressContext } from "./ProgressContext";

export function ProgressToolbar() {
    const progress = React.useContext(ProgressContext);
    const message = progress.progressState.message;
    return message
        ? <div style={ContainerStyle}>
            <span>{message}</span>
        </div>
        : null;
}

const ContainerStyle: React.CSSProperties = {
    display: 'flex',
    position: "fixed",
    top: 0,
    left: 0,
    padding: '1em',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: 'red'
}