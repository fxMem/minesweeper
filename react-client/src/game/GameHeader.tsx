/** @jsx jsx */ jsx;
import { jsx, css } from '@emotion/core'
import * as React from "react";
import { HeaderPanel } from '../common/HeaderPanel';
import { Button } from '../common/Button';
import { MinerGameState } from '../../../core/MinerGameState';
import { Action } from '../common/Callbacks';
import { useState } from 'react';

export function GameHeader({ gameState, exitCallback }: { 
    gameState: MinerGameState, 
    exitCallback: Action 
}) {

    const [timePassed, setTimePassed] = useState(0);
    React.useEffect(() => {
        setInterval(() => {
            setTimePassed(time => time + 1);
        }, 1000);
    }, []);

    function formatTime(time: number): string {
        return `${padZeros(Math.floor(time / 60) + '', 2)}:${padZeros(time % 60 + '', 2)}`;

        function padZeros(value: string, amount: number): string {
            while (value.length < amount) {
                value = `0${value}`;
            }

            return value; 
        }
    }

    return <HeaderPanel>
        <span>Game in progress: </span>
        <span css={{ margin: '0 1em 0', fontFamily: 'Lucida Sans Unicode' }}>{formatTime(timePassed)}</span>
        <Button onClick={exitCallback}>Exit</Button>
    </HeaderPanel>
}