/** @jsx jsx */ jsx;
import { jsx, css } from '@emotion/core'
import * as React from "react";
import { TileInfo, TileState, Coordinates } from '../../../core/Field';
import { MouseEvent as ReactMouseEvent } from 'react';
import bomb from '../pictures/bomb';
import flag from '../pictures/flag';
import emptyUnpressed from '../pictures/emptyUnpressed';
import emptyPressed from '../pictures/emptyPressed';
import $1 from '../pictures/1';
import $2 from '../pictures/2';
import $3 from '../pictures/3';
import $4 from '../pictures/4';
import $5 from '../pictures/5';
import $6 from '../pictures/6';
import $7 from '../pictures/7';
import $8 from '../pictures/8';
import { Action, ActionWithArgument } from '../common/Callbacks';

export const tileSize = 40;
const numbersMap = [
    emptyPressed,
    $1,
    $2,
    $3,
    $4,
    $5,
    $6,
    $7,
    $8,
];

function getImageSrc(tileState: TileInfo): string {
    switch (tileState.state) {
        case TileState.Exploded: return bomb;
        case TileState.Flagged: return flag;
        case TileState.Closed: return emptyUnpressed;
        case TileState.Open: return getNumberedTileImage(tileState.value);
        default: throw `Unknown tile type! ${tileState.state}`;
    }

    function getNumberedTileImage(n: number): string {
        return numbersMap[n];
    }
}

export type TileData = { info: TileInfo } & Coordinates;

export function Tile({ data, onOpen, onProbe, onSwitchFlag }: {
    data: TileData,
    onOpen: ActionWithArgument<Coordinates>,
    onProbe: ActionWithArgument<Coordinates>,
    onSwitchFlag: ActionWithArgument<Coordinates>
}) {
    let clickCounter = 0;
    let probing = false;

    function MouseDown(event: ReactMouseEvent) {
        if (event.button === 0) leftDown();
        if (event.button === 2) rightDown();

        event.preventDefault();
    }
    function MouseUp(event: ReactMouseEvent) {
        if (event.button === 0) leftUp();
        if (event.button === 2) rightUp();

        event.preventDefault();
    };

    function leftUp() {
        clickCounter--;

        if (!probing) {
            onOpen(data);
        }
        else if (clickCounter === 0) {
            onProbe(data);
            probing = false;
        }
    }

    function leftDown() {
        clickCounter++;
        if (clickCounter == 2) {
            probing = true;
        }
    }

    function rightUp() {
        clickCounter--;

        if (!probing) {
            onSwitchFlag(data);
        }
        else if (clickCounter === 0) {
            onProbe(data);
            probing = false;
        }
    }

    function rightDown() {
        clickCounter++;

        if (clickCounter == 2) {
            probing = true;
        }
    }

    return <img
        onMouseDown={MouseDown}
        onMouseUp={MouseUp}
        onContextMenu={(e) => e.preventDefault()}
        height={tileSize}
        width={tileSize}
        src={getImageSrc(data.info)}>
    </img>
}