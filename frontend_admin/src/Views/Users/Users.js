import React from 'react'
import "./Users.scss"
import "./User-row.scss"

import SearchIcon from '@material-ui/icons/Search';

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

const UserCard = () => {
    return (<div></div>)
}

const Users = () => {
    return (
        <div className="Content-default Users-page">
            <h1>Users</h1>

            <div className="Filter">
                <div className="InputWithIcon">
                    <SearchIcon className="icon" />
                    <input type="text" placeholder="Search"></input>
                </div>
                <div className="Selector">
                    <input type="text" placeholder="Search"></input>
                </div>
            </div>

            <table>
                <tr className="header">
                    {/* <th>Avatar</th> */}
                    <th>User</th>
                    <th>Creation</th>
                    <th>Username</th>
                    <th>Birth</th>
                </tr>
                {
                    users.map((user, index) => {
                        return (
                            <tr className="list">
                                {/* <td><img src={require(`${user.username}.png`).default}></img></td> */}
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.name}</td>
                                <td>{user.name}</td>
                            </tr>
                        )
                    })
                }
            </table>
        </div>
    )
}

export default Users;