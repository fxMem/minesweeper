import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch, Redirect } from "react-router";
import { Client } from "../client/Client";
import { LobbyComponent } from "../lobby/LobbyComponent";
import { LoginComponent } from "../login/LoginComponent";
import { RoomComponent } from "../room/RoomComponent";

export function Router({ client }: { client: Client }) {
    return (
        <BrowserRouter>
            <Switch>
                <Redirect exact={true} from='/' to='/lobby' />

                <Route path="/lobby">
                    <LobbyComponent sessionClient={client}></LobbyComponent>
                </Route>

                <Route path="/room">
                    <RoomComponent vote={client} game={client} session={client}></RoomComponent>
                </Route>
            </Switch>
        </BrowserRouter>)
}