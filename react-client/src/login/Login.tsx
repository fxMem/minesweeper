import * as React from "react";
import { useState } from "react";
import { LoginClient } from "../client/LoginClient";


export function LoginComponent({ loginClient }: { loginClient: LoginClient }) {

    const [username, setUsername] = useState('root');
    const [password, setPassword] = useState('root');
    async function tryLogIn() {
        await loginClient.connect(username, password);
    }

    return <div style={ContainerStyle}>

        <div style={FormStyle}>
            <input style={InputStyle} type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input style={InputStyle} type="text" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <button style={ButtonStyle} type="button" onClick={tryLogIn} >Start!</button>
        </div>

    </div>
}

const ContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
}

const InputStyle: React.CSSProperties = {
    fontFamily: 'Roboto, sans-serif',
    outline: 1,
    background: '#f2f2f2',
    width: '100%',
    border: '1px solid gray',
    margin: '0 0 1em',
    padding: '1em',
    boxSizing: 'border-box',
    fontSize: '1em'
};

const FormStyle: React.CSSProperties = {
    boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)',
    textAlign: 'center',
    padding: '2em',
    maxWidth: '360px'
}

const ButtonStyle: React.CSSProperties = {
    fontFamily: 'Roboto, sans-serif',
    textTransform: 'uppercase',
    outline: 0,
    background: '#4CAF50',
    width: '100%',
    border: 0,
    padding: '15px',
    color: '#FFFFFF',
    fontSize: '14px',
    transition: 'all 0.3 ease',
    cursor: 'pointer'
}