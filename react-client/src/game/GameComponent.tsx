/** @jsx jsx */ jsx;
import { jsx, css } from '@emotion/core'
import * as React from "react";
import { MinerGameState } from "../../../core/MinerGameState";
import { Field } from './Field';
import { GameClient } from '../client/GameClient';
import { SessionClient } from '../client/SessionClient';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { HeaderPanel } from '../common/HeaderPanel';
import { Button } from '../common/Button';
import { GameHeader } from './GameHeader';
import { SpinnerCube } from '../common/SpinnerCube';
import { Loader } from '../common/Loader';
import { PlayerInfo } from './PlayerInfo';

export function GameComponent({ session, game, currentPlayer }: {
    currentPlayer: PlayerInfo,
    game: GameClient,
    session: SessionClient
}) {
    const history = useHistory();
    const { sessionId } = history.location.state;
    const [gameState, setGameState] = useState<MinerGameState>(null);
    useEffect(() => {
        game.getState(sessionId).then(state => {
            const firt = state.data[0];
            state.data = [firt, firt, firt, firt, firt, firt, firt];
            setGameState(state);
        });
        game.onGameStateChanged(state => {
            const firt = state.data[0];
            state.data = [firt, firt, firt, firt, firt, firt, firt];
            setGameState(state);
        })
    }, []);

    function exit() {
        session.leaveSession(sessionId);
    }

    return <Loader data={gameState}>
        {
            (gameState) =>
                <div>
                    <GameHeader gameState={gameState} exitCallback={exit}></GameHeader>

                    <div css={{
                        display: 'grid'
                    }}>
                        {
                            gameState.data.map(playerData => <Field {
                                ...{
                                    ...playerData,
                                    sessionId,
                                    game,
                                    canPlay: currentPlayer.nickname === playerData.name
                                }} />)
                        }
                    </div>
                </div>
        }

    </Loader>
}