import { Field, Coordinates, TileActionResult, TileInfo } from "./Field";
import { MinerGameOptions, MinerMessage, MinerPlayerAction } from "./MinerPlayerAction";
import { MinerGameState } from "./MinerGameState";

export class MinerGame {

    private fields = new Map<string, { field: Field, isAlive: boolean, remainigLives: number }>();
    private winner: string;
    constructor(private options: MinerGameOptions, private send: (data: any) => void) {

    }

    addPlayer({ nickname }: { nickname: string }) {
        if (!this.fields.has(nickname)) {
            this.fields.set(nickname, {
                field: new Field({ ...this.options, flags: this.options.flagsAvailable }),
                isAlive: true,
                remainigLives: this.options.lives
            });
        }
    }

    removePlayer({ nickname }: { nickname: string }) {
        this.fields.delete(nickname);
    }

    message({ nickname }: { nickname: string }, data: MinerMessage): TileActionResult | MinerGameState {

        if (data.action === MinerPlayerAction.checkState) {
            return this.buildGameState();
        }

        const field = this.fields.get(nickname).field;
        const result = this.makeMove(field, data);

        this.updateResultForPlayer(nickname, result);
        this.send(this.buildGameState());

        return result;
    }

    private updateResultForPlayer(nickname: string, result: TileActionResult) {
        result.win && (this.winner = nickname);

        if (result.blewOver) {
            let fieldData = this.fields.get(nickname);

            // TODO: Refactor to separate class
            fieldData.remainigLives--;
            fieldData.isAlive = fieldData.remainigLives > 0;
        }
    }

    private makeMove(field: Field, data: MinerMessage): TileActionResult {
        let result: TileActionResult = null;

        switch (data.action) {
            case MinerPlayerAction.open:
                result = field.open(data.pos);
                break;
            case MinerPlayerAction.flag:
                result = field.flag(data.pos);
                break;
            case MinerPlayerAction.probe:
                result = field.probe(data.pos);
                break;
        }

        return result;
    }

    private buildGameState(): MinerGameState {

        return {
            data: Array.from(this.fields).map
                (
                    f =>
                        ({
                            name: f[0],
                            state: {
                                remainigLives: f[1].remainigLives,
                                remainingFlags: f[1].field.flagsRemain,
                                isAlive: f[1].isAlive,
                                map: f[1].field.getAllTilesData(),
                                fieldSize: {
                                    width: f[1].field.width,
                                    height: f[1].field.height,
                                }
                            }
                        })
                ),
            winner: {
                name: this.winner
            }
        }
    }

    start() {

    }

    dispose() {
        this.fields.clear();

        // prob won't needed but whatever
        this.send = null;
    }
}