import React from 'react';
import './StudentLayout.scss';
import '../../Style/Student_Baseline.scss';

import NavBar from './NavBar';
import Footer from './Footer';

const StudentLayout = (props) => {
    return (
        <div>
            <NavBar />
            {props.children}
            <Footer />
        </div>
    );
}

export default StudentLayout;