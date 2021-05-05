import React from 'react';
import './UserList.scss';

import DeleteIcon from '@material-ui/icons/Delete';

import ButtonIcon from '../../Components/Buttons/ButtonIcon/ButtonIcon';

const UserList = () => {
    return (
        <div className="UserList">
            <div className="Header UserList-dimensions">
                <span className="User">User</span>
                <span className="Type">Type</span>
                <span className="Username">Username</span>
            </div>
            <div className="List">
                <div className="User UserList-dimensions">
                    <img className="Avatar" src={require('../../Media/avatar.png').default} />
                    <div className="User">
                        <div className="Name">Samuele Allegranza</div>
                        <div className="Email">samuele.allegranza@gmail.com</div>
                    </div>
                    <div className="Type">Google</div>
                    <div className="Username">samuele.allegranza</div>
                    <div className="DeleteBtn">
                        <ButtonIcon> <DeleteIcon /> </ ButtonIcon>
                    </div>
                </div>

                <div className="User UserList-dimensions">
                    <img className="Avatar" src={require('../../Media/avatar.png').default} />
                    <div className="User">
                        <div className="Name">Samuele Allegranza</div>
                        <div className="Email">samuele.allegranza@gmail.com</div>
                    </div>
                    <div className="Type">Google</div>
                    <div className="Username">samuele.allegranza</div>
                    <div className="DeleteBtn">
                        <ButtonIcon> <DeleteIcon /> </ ButtonIcon>
                    </div>
                </div>
                <div className="User UserList-dimensions">
                    <img className="Avatar" src={require('../../Media/avatar.png').default} />
                    <div className="User">
                        <div className="Name">Samuele Allegranza</div>
                        <div className="Email">samuele.allegranza@gmail.com</div>
                    </div>
                    <div className="Type">Google</div>
                    <div className="Username">samuele.allegranza</div>
                    <div className="DeleteBtn">
                        <ButtonIcon> <DeleteIcon /> </ ButtonIcon>
                    </div>
                </div>
                <div className="User UserList-dimensions">
                    <img className="Avatar" src={require('../../Media/avatar.png').default} />
                    <div className="User">
                        <div className="Name">Samuele Allegranza</div>
                        <div className="Email">samuele.allegranza@gmail.com</div>
                    </div>
                    <div className="Type">Google</div>
                    <div className="Username">samuele.allegranza</div>
                    <div className="DeleteBtn">
                        <ButtonIcon> <DeleteIcon /> </ ButtonIcon>
                    </div>
                </div>
                <div className="User UserList-dimensions">
                    <img className="Avatar" src={require('../../Media/avatar.png').default} />
                    <div className="User">
                        <div className="Name">Samuele Allegranza</div>
                        <div className="Email">samuele.allegranza@gmail.com</div>
                    </div>
                    <div className="Type">Google</div>
                    <div className="Username">samuele.allegranza</div>
                    <div className="DeleteBtn">
                        <ButtonIcon> <DeleteIcon /> </ ButtonIcon>
                    </div>
                </div>
                <div className="User UserList-dimensions">
                    <img className="Avatar" src={require('../../Media/avatar.png').default} />
                    <div className="User">
                        <div className="Name">Samuele Allegranza</div>
                        <div className="Email">samuele.allegranza@gmail.com</div>
                    </div>
                    <div className="Type">Google</div>
                    <div className="Username">samuele.allegranza</div>
                    <div className="DeleteBtn">
                        <ButtonIcon> <DeleteIcon /> </ ButtonIcon>
                    </div>
                </div>
                <div className="User UserList-dimensions">
                    <img className="Avatar" src={require('../../Media/avatar.png').default} />
                    <div className="User">
                        <div className="Name">Samuele Allegranza</div>
                        <div className="Email">samuele.allegranza@gmail.com</div>
                    </div>
                    <div className="Type">Google</div>
                    <div className="Username">samuele.allegranza</div>
                    <div className="DeleteBtn">
                        <ButtonIcon> <DeleteIcon /> </ ButtonIcon>
                    </div>
                </div>
                <div className="User UserList-dimensions">
                    <img className="Avatar" src={require('../../Media/avatar.png').default} />
                    <div className="User">
                        <div className="Name">Samuele Allegranza</div>
                        <div className="Email">samuele.allegranza@gmail.com</div>
                    </div>
                    <div className="Type">Google</div>
                    <div className="Username">samuele.allegranza</div>
                    <div className="DeleteBtn">
                        <ButtonIcon> <DeleteIcon /> </ ButtonIcon>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default UserList;