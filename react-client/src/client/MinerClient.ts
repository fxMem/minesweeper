import { Client, ClientConnectionHandler } from 'seedengine.client';
import { SessionMessage, SessionCommand } from 'seedengine.client/session/SessionMessage';

import { MinerGameState, MinerGameStateUpdateHeader } from './../../../core/MinerGameState';
 import { TileActionResult, Coordinates } from './../../../core/Field';
 import { MinerPlayerAction } from "./../../../core/MinerPlayerAction";

export class MinerClient implements Client {
    handler: ClientConnectionHandler;

    flag(sessionId: string, pos: Coordinates): Promise<TileActionResult> {
        return this.invokeMinerMessage(sessionId, MinerPlayerAction.flag, pos);
    }

    probe(sessionId: string, pos: Coordinates): Promise<TileActionResult> {
        return this.invokeMinerMessage(sessionId, MinerPlayerAction.probe, pos);
    }

    open(sessionId: string, pos: Coordinates): Promise<TileActionResult> {
        return this.invokeMinerMessage(sessionId, MinerPlayerAction.open, pos);
    }

    getState(sessionId: string): Promise<MinerGameState> {
        return this.invokeMinerMessage(sessionId, MinerPlayerAction.checkState);
    }

    private invokeMinerMessage(sessionId: string, action: MinerPlayerAction, pos?: Coordinates, ): Promise<any> {
        return this.handler.invokeWithMessage<SessionMessage>({
            sessionCommand: SessionCommand.message,
            sessionId,
            payload: {
                pos,
                action
            }
        });
    }

    onGameStateUpdate(callback: (data: MinerGameState) => void): void {
        this.handler.subscribeToTitledMessage(MinerGameStateUpdateHeader, callback);
    }


}