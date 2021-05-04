import React from "react";
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

// Layouts
import MainLayout from './Layouts/Main/Main';

// Views
import Users from './Views/Users/Users';

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Redirect exact from="/" to="/users" />

                <Route path="/users"> 
                    <MainLayout>
                        <Users />
                    </ MainLayout>
                </Route>

                <Route path="/rooms">
                    <MainLayout>
                        <h1>Rooms</h1>
                    </ MainLayout>
                </Route>

                <Route path="/teachers">
                    <MainLayout>
                        <h1>Teachers</h1>
                    </ MainLayout>
                </Route>
            </Switch>
        </BrowserRouter>    
    );
}

export default Router;