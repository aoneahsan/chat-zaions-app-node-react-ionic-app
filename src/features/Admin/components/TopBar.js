import React from 'react';
import "./TopBar.sass";
import placeholder from "../../../assets/placeholder.jpg";
import {FiMoreVertical, FiArrowLeft, FiMoreHorizontal, FiExternalLink} from 'react-icons/fi';
import {useGlobal} from "reactn";

const TopBar = ({back}) => {
    const aoneahsan = () => window.open("http://aoneahsan.website", "_blank");
    const zaionsSite = () => window.open("http://zaions.com", "_blank");

    return (
            <div className="top-bar uk-flex uk-flex-between uk-flex-middle">
                <div className="nav">
                    <div className="button mobile" onClick={back}>
                        <FiArrowLeft/>
                    </div>
                </div>
                <div className="nav">
                    <div className="uk-inline">
                        <div className="button" type="button">
                            <FiMoreHorizontal/>
                        </div>
                        <div data-uk-dropdown="mode: click; offset: 5; boundary: .top-bar">
                            <div className="link" onClick={aoneahsan}>Aoneahsan.website <div className="icon"><FiExternalLink/></div></div>
                            <div className="link" onClick={zaionsSite}>Zaions.com <div className="icon"><FiExternalLink/></div></div>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default TopBar;
