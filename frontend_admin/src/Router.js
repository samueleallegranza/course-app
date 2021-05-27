import React, {useState} from "react";
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect,
    useLocation
} from "react-router-dom";

// Layouts
import AdminLayout from './Layouts/AdminDashboard/AdminDashboard';
import StudentLayout from './Layouts/StudentLayout/StudentLayout';
import StudentAuthLayout from './Layouts/StudentAuthLayout/StudentAuthLayout';

// Admin Views
import AdminUsers from './Views/Admin/Users/Users';
import AdminAuthentication from './Views/Admin/Authentication/Authentication';
import AdminLiveMap from './Views/Admin/LiveMap/LiveMap';
import AdminBadge from './Views/Admin/Authentication/Badge';

// Student Views
import StudentHome from './Views/Student/Home/Home';
import StudentCourses from './Views/Student/Courses/Courses';
import LoginStudent from './Views/Student/LoginStudent/LoginStudent';
import LoginAdmin from './Views/Student/LoginAdmin/LoginAdmin';
import Signup from './Views/Student/Signup/Signup';
import Subscriptions from './Views/Student/Subscriptions/Subscriptions';
import Certificates from './Views/Student/Certificates/Certificates';

// Authentication controls
import WithAuthStudent from './Auth/WithAuthStudent';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const AdminRoutes = ({match}) => {
    let query = useQuery();

    return(
        <Switch>
            {/* 
                NOT WORKING REDIRECT
            <Redirect from={`${match.url}`} to={`${match.url}/users`} exact/> 
            */}

            <Route path={`${match.url}/users`} exact>
                <AdminLayout>
                    <AdminUsers />
                </AdminLayout>
            </Route>

            <Route path={`${match.url}/rooms`} exact>
                <AdminLayout>

                </AdminLayout>
            </Route>

            <Route path={`${match.url}/authentication`} exact>
                <AdminLayout>
                    <AdminAuthentication />
                </AdminLayout>
            </Route>

            <Route path={`${match.url}/livemap`} exact>
                <AdminLayout>
                    <AdminLiveMap />
                </AdminLayout>
            </Route>

            <Route path={`${match.url}/badge`}>
                <AdminBadge
                    full_name={query.get("full_name")}
                    email={query.get("email")}
                    birth={query.get("birth")}
                    event={query.get("event")}
                    printer_mode={query.get("printer_mode")}
                />
            </Route>
        </Switch>
    )
}

const StudentRoutes = ({ match }) => {
    return (
        <Switch>
            <Route path={`${match.url}`} exact>
                <StudentLayout>
                    <StudentHome />
                </StudentLayout>
            </Route>

            <Route path={`${match.url}courses`} exact>
                <StudentLayout>
                    <StudentCourses />
                </StudentLayout>
            </Route>

            <Route path={`${match.url}teachers`} exact>
                <StudentLayout>
                    {/* <StudentTeachers /> */}
                </StudentLayout>
            </Route>

            <Route path={`${match.url}contacts`} exact>
                <StudentLayout>
                    {/* <StudentContacts /> */}
                </StudentLayout>
            </Route>
        
            <Route path={`${match.url}login/student`} exact>
                <StudentAuthLayout>
                    <LoginStudent/>
                </StudentAuthLayout>
            </Route>

            <Route path={`${match.url}login/admin`} exact>
                <StudentAuthLayout>
                    <LoginAdmin />
                </StudentAuthLayout>
            </Route>

            <Route path={`${match.url}signup`} exact>
                <StudentAuthLayout>
                    <Signup />
                </StudentAuthLayout>
            </Route>

            <Route path={`${match.url}subscriptions`} exact>
                <WithAuthStudent>
                    <StudentLayout>
                        <Subscriptions />
                    </StudentLayout>
                </WithAuthStudent>
            </Route>

            <Route path={`${match.url}certificates`} exact>
                <WithAuthStudent>
                    <StudentLayout>
                        <Certificates />
                    </StudentLayout>
                </WithAuthStudent>
            </Route>

        </Switch>
        
    )
}


const Router = () => {

    return (
        <BrowserRouter>
            <Switch>
                
                <Route path='/admin' component={AdminRoutes} />
                <Route path='' component={StudentRoutes} />

            </Switch>
        </BrowserRouter>    
    );
}

export default Router;