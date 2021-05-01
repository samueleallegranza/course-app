import React from 'react';

const Main = (props) => {
    <div>
        <div className="Background">
            <div className="Window">
                <div className="Appbar">
                    
                </div>
            </div>
        </div>
        {props.children}
    </div>
}

export default Main;