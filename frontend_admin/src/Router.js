import React from "react";
import {
    BrowserRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";

// Layouts
import MainLayout from './Layouts/Main/Main';

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/">
                    <MainLayout>
                        <h1>Home</h1>
                    </ MainLayout>
                </Route>
                <Route path="/users">
                    <h1>Users</h1>
                </Route>
                <Route path="/courses">
                    <h1>Courses</h1>
                </Route>
            </Switch>
        </BrowserRouter>    
    );
}

export default Router;