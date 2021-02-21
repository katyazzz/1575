import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {DashboardPage} from './pages/DashboardPage'
import {AuthPage} from "./pages/AuthPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/dashboard" exact>
                    <DashboardPage />
                </Route>
                <Redirect to="/dashboard" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}