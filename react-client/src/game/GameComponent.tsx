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
            setGameState(state);
        });
        game.onGameStateChanged(state => {
            setGameState(state);
        })
    }, []);

    function giveUp() {

    }
    
    return <Loader data={gameState}>
        {
            (gameState) =>
                <div>
                    <GameHeader gameState={gameState} giveUpCallback={giveUp}></GameHeader>

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