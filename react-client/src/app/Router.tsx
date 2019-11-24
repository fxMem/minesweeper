import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch, Redirect } from "react-router";
import { Client } from "../client/Client";

export function Router({ client }: { client: Client }) {
    return (
        <BrowserRouter>
            <Switch>
                <Redirect exact={true} from='/' to='/session' />

                <Route path="/session" > </Route>
            </Switch>
        </BrowserRouter>)
}