import React from "react";
import './Info.sass';
import logo from '../../../assets/logo.png';
import Config from '../../../config';

const Info = () => {
    return (
        <div className="info">
            <div className="top">
                <div className="logo">
                    <img src={logo} alt="Picture" />
                </div>
                <div className="text">
                    Welcome to {Config.appName || 'Chat Zaions'}!<br/><br/>
                    {Config.appName || 'Chat Zaions'} is a messaging app that enables real-time messaging, audio and video calls, groups and conferencing.
                </div>
            </div>
            <div className="text">
                Copyright &copy; {Config.brand || 'Zaions.com'}<br />
                
            </div>
        </div>
    );
};

export default Info;
