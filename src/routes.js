import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from "./pages/Main";
import Box from "./pages/Box";
import Wakemydyno from "./pages/Wakemydyno";

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/box/:id" component={Box} />
            <Route path="/wakemydyno.txt" component={Wakemydyno} />
        </Switch>
    </BrowserRouter>
);

export default Routes;