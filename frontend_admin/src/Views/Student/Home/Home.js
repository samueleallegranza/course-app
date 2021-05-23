import React from 'react';
import './Home.scss';

import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Illustration from './illustration.svg';

const Home = () => {
    return (
        <div className="Home-Page">
            <div className="Hero">
                <div className="Presentation">
                    <div className="Title">
                        Master your <span className="highlighted"> Office</span> skills in just a day.
                    </div>
                    <div className="Subtitle">
                        Learn how to be productive with
                        Microsoft Office Suite, and boost
                        your business.
                    </div>
                    <div className="CallToAction">
                        <Link to="/signup" className="button">Start now
                            <ArrowForwardIcon />
                        </Link>
                    </div>
                </div>
            
                <div className="Illustration">
                    <img src={Illustration} alt="illustration" />
                </div>
            </div>
        </div>
    )
}

export default Home;