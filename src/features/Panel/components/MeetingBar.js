import React from 'react';
import {useGlobal} from "reactn";
import "./MeetingBar.sass";
import {useHistory} from "react-router-dom";

const MeetingBar = () => {
    const meeting = useGlobal('meetingID');

    const history = useHistory();

    return (
        <div className="meeting-bar uk-flex uk-flex-center uk-flex-middle" onClick={() => {
            history.replace('/meeting/' + meeting);
        }}>
            Go back to the meeting
        </div>
    );
}

export default MeetingBar;
