import * as React from "react";

export function CloseIcon({ style }: { style?: React.CSSProperties }) {
    return <span style={{
        display: 'inline-block',
        width: '1.2em',
        textAlign: 'center',
        ...(style || {})
    }}>🞪</span>
}