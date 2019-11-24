import * as React from "react";

export function Button({ children, onClick, style }: {
    children: React.ReactNode,
    onClick?: () => void,
    style?: React.CSSProperties
}) {
    return <div onClick={onClick} style={{
        display: 'inline-block',
        padding: '0.5em',
        cursor: 'pointer',
        border: '1px solid gray',
        ...(style || {})
    }}>
        {children}
    </div>
}