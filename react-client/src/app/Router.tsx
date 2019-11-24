import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch, Redirect } from "react-router";
import { Client } from "../client/Client";
import { LobbyComponent } from "../lobby/LobbyComponent";

export function Router({ client }: { client: Client }) {
    return (
        <BrowserRouter>
            <Switch>
                <Redirect exact={true} from='/' to='/lobby' />

                <Route path="/lobby">
                    <LobbyComponent sessionClient={client}></LobbyComponent>
                </Route>
            </Switch>
        </BrowserRouter>)
}