import { MinerGameState } from "../../../core/MinerGameState";
import { TileActionResult, Coordinates } from "../../../core/Field";
import { DisposeCallback } from "../common/DisposeCallback";

export type MinerGameStageChangedCallback = (state: MinerGameState) => void;

export interface GameClient {
    onGameStateChanged(callback: MinerGameStageChangedCallback): DisposeCallback;

    getState(sessionId: string): Promise<MinerGameState>;

    probe(sessionId: string, pos: Coordinates): Promise<TileActionResult>;

    open(sessionId: string, pos: Coordinates): Promise<TileActionResult>;

    flag(sessionId: string, pos: Coordinates): Promise<TileActionResult>;
}