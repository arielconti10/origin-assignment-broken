import * as React from "react"
import createHistory from "history/createBrowserHistory"
import { Switch, Route } from "react-router-dom"
import { ConnectedRouter } from "react-router-redux"
import { VinCheckView } from "./containers/VinCheck/VinCheck"
import "./styles/global.scss"

export const Routes = () => (
    <ConnectedRouter history={createHistory()}>
        <Switch>
            <Route path="/" component={VinCheckView} exact />
        </Switch>
    </ConnectedRouter>
)
