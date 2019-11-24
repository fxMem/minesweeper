import * as React from "react";
import { ProgressContext } from "./ProgressContext";
import { Button } from "../common/Button";
import { CloseIcon } from "../icons/CloseIcon";
import { useState, useMemo } from "react";

export function ProgressToolbar() {
    const [isHidden, setIsHidden] = useState(false);
    const progress = React.useContext(ProgressContext);
    const message = progress.progressState.message;

    const haveMessageToShow = useMemo(() => {
        if (isHidden) {
            setIsHidden(false);
        }

        return message;
    }, [progress.progressState]);

    function hideToolbar() {
        setIsHidden(true);
    }
    return haveMessageToShow && !isHidden
        ? <div style={ContainerStyle}>
            <span style={{ gridColumn: 2, justifySelf: 'center' }}>{message}</span>

            <Button onClick={hideToolbar} style={{ gridColumn: 3, justifySelf: 'center' }}>
                <CloseIcon />
            </Button>
        </div>
        : null;
}

const ContainerStyle: React.CSSProperties = {
    display: 'grid',
    boxSizing: 'border-box',
    gridTemplateColumns: '5em 1fr 5em',
    position: "fixed",
    top: 0,
    left: 0,
    padding: '1em',
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'rgba(227, 54, 83, 0.5)',
    fontWeight: 'bold'

}