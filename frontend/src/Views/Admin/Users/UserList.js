import React from 'react';
import './UserList.scss';

import DeleteIcon from '@material-ui/icons/Delete';

import ButtonIcon from '../../../Components/Buttons/ButtonIcon/ButtonIcon';

const UserList = (props) => {
    return (
        <div className="UserList">
    
            <div className="Header UserList-dimensions">
                <span className="User">User</span>
                <span className="Type">Type</span>
                <span className="Username">Username</span>
            </div>
            <div className="List">
            {
                props.users.map((user, index) => {
                    return (
                        <div className="User UserList-dimensions">
                            <img className="Avatar" src={require('../../../Media/avatar.png').default} />
                            <div className="User">
                                <div className="Name">{user.full_name}</div>
                                <div className="Email">{user.email}</div>
                            </div>
                            <div className="Type">{user.type}</div>
                            <div className="Username">{user.username}</div>
                            <div className="DeleteBtn">
                                <ButtonIcon> <DeleteIcon /> </ ButtonIcon>
                            </div>
                        </div>
                    )
                })
            }
            </div>

        </div>
    )
}

export default UserList;