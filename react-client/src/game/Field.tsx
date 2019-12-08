/** @jsx jsx */ jsx;
import { jsx, css } from '@emotion/core'
import * as React from "react";
import { TileInfo, Coordinates } from "../../../core/Field";
import { MinerPlayerState } from "../../../core/MinerGameState";
import { Tile, tileSize, TileData } from './Tile';
import { useMemo } from 'react';
import { GameClient } from '../client/GameClient';


const MapWrapperStyles = css({
    display: 'grid'
})

export function Field({ name, state, game, sessionId, canPlay }: { canPlay: boolean, sessionId: string, name: string, state: MinerPlayerState, game: GameClient }) {
    const { width, height } = state.fieldSize;
    const { map, remainigLives, remainingFlags, isAlive } = state;
    //const canvasWidth = width * tileSize;
    const allTiles = useMemo(() => {
        let tiles: TileData[] = [];
        let y = 0;
        for (const row of map) {

            let x = 0;
            for (const info of row) {
                tiles.push({ info, x, y });

                x++;
            }
            y++;
        }
        return tiles;
    }, [state]);

    function onOpen(pos: Coordinates) {
        game.open(sessionId, pos);
    }

    function onProbe(pos: Coordinates) {
        game.probe(sessionId, pos);
    }

    function onSwitchFlag(pos: Coordinates) {
        game.flag(sessionId, pos);
    }

    return <div css={{
        width: 'min-content',
        padding: '1em'
    }}>
        <div css={{
            display: 'flex',
            alignItems: 'center'
        }}>
            <h3>{name}</h3>
            <span css={{ display: 'border-block', marginRight: '0.25em', marginLeft: 'auto' }}>Lives: <span css={{ fontWeight: 'bold' }}>{remainigLives}</span></span>
            <span>Flags: <span css={{ fontWeight: 'bold' }}>{remainingFlags}</span></span>
            {!isAlive ? <span css={{ color: 'red' }}>Game Over!</span> : null}
        </div>

        <div css={css({
            display: 'grid',
            gridTemplateRows: `repeat(${height}, ${tileSize}px)`,
            gridTemplateColumns: `repeat(${width}, ${tileSize}px)`
        })}>
            {
                allTiles
                    ? allTiles.map(data =>
                        <Tile
                            {...{
                                data,
                                onOpen,
                                onProbe,
                                onSwitchFlag
                            }}

                        />)
                    : <span>Loading...</span>
            }
        </div>
    </div>
}