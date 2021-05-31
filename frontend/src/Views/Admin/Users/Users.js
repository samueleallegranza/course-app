import React, { useEffect, useState } from 'react'
import "./Users.scss"

import PersonAddIcon from '@material-ui/icons/PersonAdd';

import UserList from './UserList';
import InputText from '../../../Components/Inputs/InputText/InputText';
import ButtonTextIcon from '../../../Components/Buttons/ButtonTextIcon/ButtonTextIcon';
import Select from '../../../Components/Inputs/Select/Select';

const users = [
    {
        name: "Samuele Allegranza",
        email: "samuele.allegranza@gmail.com",
        username: "samuele.allegranza",
        birth: new Date(2002, 2, 3),
        creation: new Date()
    },
    {
        name: "Rebecca Geninatti",
        email: "rebecca.geninatti@gmail.com",
        username: "rebecca.geninatti",
        birth: new Date(2002, 4, 6),
        creation: new Date()
    },
    {
        name: "Giacomo Sacco",
        email: "giacomo.sacco@gmail.com",
        username: "giacomo.sacco",
        birth: new Date(2002, 7, 17),
        creation: new Date()
    },
]
// Retrieve user list
const getStudentsList = () => {
    console.log('get students!')
    return fetch("/students/get_all")
        .then(response => response.json())
}

const Users = () => {

    // [Filter] Handle user types
    // State that contains index of selected userTypes
    const userTypes = ['Students', 'Teachers', 'Admins'];
    const [userType, setUserType] = useState(0);
    const ChangeUserType = (newUserTypeIndex) => {
        setUserType(newUserTypeIndex);
    }

    // State that contains the list of users to display
    const [userList, setUserList] = useState([]);

    // Update user list based on current filters, only when userType changes
    useEffect(() => {
        if (userType == 0) {
            getStudentsList().then(users => {
                console.log(users);
                setUserList(users);
            });
        }
    }, [userType]);

    return (
        <div className="Content-default Users-page">
            <h1>Users</h1>

            <div className="Filter">
                <div className="FilterSearch">
                    <InputText placeholder="Search" />
                </div>
                <div className="FilterSelect">
                    <Select
                        options={userTypes}
                        handleOnChange={ChangeUserType}
                    />
                </div>
                <div className="AddUser">
                    <ButtonTextIcon className="AddUser" text="Add user">
                        <PersonAddIcon />
                    </ButtonTextIcon>
                </div>
            </div>

            <UserList users={userList} />
        </div>
    )
}

export default Users;