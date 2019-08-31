import { MinerGame } from "../core/MinerGame";
import { MinerGameStateUpdateHeader } from "../core/MinerGameState";
import { MinerGameOptions } from "../core/MinerPlayerAction";

import { Session } from 'seedengine.server/session/Session';
import { Game } from 'seedengine.server/game/Game';

export class MinerGameFactory implements Game {
    create(session: Session): () => void {

        const game = new MinerGame(this.loadOptions(), (payload) => {
            session.sendMessage({ header: MinerGameStateUpdateHeader, payload })
        });

        session.subscribe({
            playerJoin: async (p) => {
                game.addPlayer(p);
            },
            playerLeave: async (p) => {
                game.removePlayer(p);
            },
            message: async (m, from) => {
                return game.message(from, m);
            },
            started: () => {
                game.start();
            }
        });

        return () => {
            game.dispose();
        };
    }

    loadOptions(): MinerGameOptions {

        function generateRandomMap(n: number, m: number, bombsCount: number): boolean[][] {
            const map = [];
            for (let i = 0; i < n; i++) {
                map[i] = [];
                for (let j = 0; j < width; j++) {
                    map[i][j] = false;
                }
            }

            let remain = bombsCount;
            const averageOnLine = bombsCount / n;
            for (let i = 0; i < n; i++) {
                for (let h = 0; h < averageOnLine; h++) {

                    while (true) {
                        if (!remain) {
                            break;
                        }

                        const next = Math.floor(Math.random() * m);
                        if (!map[i][next]) {
                            map[i][next] = true;
                            remain--;
                            break;
                        }
                    }
                }
            }

            while (remain > 0) {
                const y = Math.floor(Math.random() * n);
                const x = Math.floor(Math.random() * m);
                if (!map[y][x]) {
                    map[y][x] = true;
                    remain--;
                }
            }

            return map;
        }

        const height = 15, width = 15, bombs = 20;
        return {
            flagsAvailable: bombs,
            height,
            width,
            lives: 1,
            map: generateRandomMap(height, width, bombs)
        }
    }

}