import React from 'react';
import "./TopBar.sass";
import {FiMoreHorizontal, FiExternalLink, FiSettings, FiHome, FiPlusCircle, FiCpu} from 'react-icons/fi';
import Picture from "../../../components/Picture";
import {useGlobal} from "reactn";
import {useHistory, useLocation} from "react-router-dom";
import { useToasts } from 'react-toast-notifications';
import getMeetingRoom from "../../../actions/getMeetingRoom";
import {useSelector} from "react-redux";
import Config from "../../../config";

const TopBar = () => {
    const onlineUsers = useSelector(state => state.io.onlineUsers);
    const io = useSelector(state => state.io.io);
    const [nav, setNav] = useGlobal('nav');
    const setToken = useGlobal('token')[1];
    const setPanel = useGlobal('panel')[1];
    const setOver = useGlobal('over')[1];
    const [user, setUser] = useGlobal('user');
    const setAudio = useGlobal('audio')[1];
    const setVideo = useGlobal('video')[1];
    const setCallDirection = useGlobal('callDirection')[1];

    const aoneahsan = () => window.open("http://aoneahsan.website", "_blank");
    const zaionsSite = () => window.open("http://zaions.com", "_blank");

    const history = useHistory();
    const location = useLocation();
    const { addToast } = useToasts();

    const logout = async () => {
        io.disconnect();
        const username = user.username;
        localStorage.removeItem('token');
        await setToken(null);
        await setUser({});
        addToast(`User ${username} logged out!`, {
            appearance: 'success',
            autoDismiss: true,
        })
        history.replace("/login");
    };

    const errorToast = content => {
        addToast(content, {
            appearance: 'error',
            autoDismiss: true,
        })
    };

    const newMeeting = async () => {
        await setAudio(true);
        await setVideo(true);
        await setCallDirection('meeting');
        try {
            const res = await getMeetingRoom();
            history.replace('/meeting/' + res.data._id);
        }
        catch (e) {
            errorToast('Server error. Unable to initiate call.');
        }
    };

    const getStatus = () => {
        if (onlineUsers.filter(u => u.id === user.id && u.status === 'busy').length > 0) return 'busy';
        if (onlineUsers.filter(u => u.id === user.id && u.status === 'online').length > 0) return 'online';
        if (onlineUsers.filter(u => u.id === user.id && u.status === 'away').length > 0) return 'away';
        return null;
    };

    return (
            <div className="top-bar uk-flex uk-flex-between uk-flex-middle">
                <div className="uk-flex uk-flex-middle">
                    <div className="profile" onClick={() => {
                        setOver(true);
                        setNav('rooms');
                        history.replace('/');
                    }}>
                        <Picture user={user || {}} />
                    </div>
                    {getStatus() && <div className={`dot ${getStatus()}`} />}
                </div>
                <div className="nav">
                    {(user.level === 'root' || user.level === 'admin') &&
                        <div className={`button${location.pathname.startsWith('/admin') ? ' active' : ''}`} onClick={() => {
                            setOver(true);
                            history.replace('/admin');
                        }}>
                            <FiCpu/>
                        </div>
                    }
                    <div className="button mobile" onClick={() => {
                        setOver(true);
                        history.replace('/');
                    }}>
                        <FiHome/>
                    </div>
                    <div className="button" onClick={() => setPanel('createGroup')}>
                        <FiPlusCircle/>
                    </div>
                    <div className={`button${nav === 'settings' ? ' active' : ''}`} onClick={() => {
                        setNav('settings');
                    }}>
                        <FiSettings/>
                    </div>
                    <div className="uk-inline">
                        <div className="button" type="button">
                            <FiMoreHorizontal/>
                        </div>
                        <div data-uk-dropdown="mode: click; offset: 5; boundary: .top-bar">
                            <div className="link" onClick={() => newMeeting()}>New Meeting</div>
                            <div className="link" onClick={() => setPanel('createGroup')}>New Group</div>
                            {Config.demo && <div className="divider"/>}
                            {Config.demo && <div className="link" onClick={aoneahsan}>Aoneahsan.website <div className="icon"><FiExternalLink/></div></div>}
                            {Config.demo && <div className="link" onClick={zaionsSite}>Zaions.com <div className="icon"><FiExternalLink/></div></div>}
                            {(user.level === 'root' || user.level === 'admin') && <div className="divider"/>}
                            {(user.level === 'root' || user.level === 'admin') && <div className="link" onClick={() => {
                                setOver(true);
                                history.replace('/admin');
                            }}>Admin Panel</div>}
                            <div className="divider"/>
                            <div className="link" onClick={logout}>Logout</div>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default TopBar;
