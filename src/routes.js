import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from "./pages/Main";
import Box from "./pages/Box";

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" component={Main} />
        </Switch>
    </BrowserRouter>
);

export default Routes;