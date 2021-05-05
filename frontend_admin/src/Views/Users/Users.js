import React from 'react'
import "./Users.scss"

import UserList from './UserList';
import InputText from '../../Components/Inputs/InputText/InputText';

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


const Users = () => {
    return (
        <div className="Content-default Users-page">
            <h1>Users</h1>

            <div className="Filter">
                <InputText className="FilterSearch" placeholder="Search" />
                <InputText className="FilterSelect" placeholder="Select" />
                <button className="AddUser ButtonWithIcon"></button>
            </div>

            <UserList />
        </div>
    )
}

export default Users;