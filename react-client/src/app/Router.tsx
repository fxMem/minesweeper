import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch, Redirect } from "react-router";
import { Client } from "../client/Client";
import { LobbyComponent } from "../lobby/LobbyComponent";
import { LoginComponent } from "../login/LoginComponent";
import { RoomComponent } from "../room/RoomComponent";
import { GameComponent } from "../game/GameComponent";

export function Router({ client }: { client: Client }) {
    return (
        <BrowserRouter>
            <Switch>
                <Redirect exact={true} from='/' to='/lobby' />

                <Route path="/lobby">
                    <LobbyComponent sessionClient={client} />
                </Route>

                <Route path="/room">
                    <RoomComponent vote={client} game={client} session={client} />
                </Route>

                <Route path="/game">
                    <GameComponent
                        game={client}
                        session={client}
                        currentPlayer={{ nickname: client.Nickname }}
                    />
                </Route>
            </Switch>
        </BrowserRouter>)
}