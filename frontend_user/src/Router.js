import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

// Layouts
import MainLayout from "./Layouts/Main/Main";

// Views
import Dashboard from "./Views/Dashboard/Dashboard";
import Courses from "./Views/Courses/Courses";

const Routing = () => {
  return (
    <Router>
      <Switch>

        <Route exact path="/">
          <MainLayout>
            <Dashboard />
          </MainLayout>
        </Route>
        
        <Route path="/courses">
          <MainLayout>
            <Courses />
          </MainLayout>
        </Route>
      
      </Switch>
    </Router>
  );
}
  
export default Routing;