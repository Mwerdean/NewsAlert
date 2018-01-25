import React, { Component } from 'react'
import { SocialIcon } from 'react-social-icons'
import '../css/about.css'


export default class About extends Component {
    render() {
        return (
            <div className="aboutBg">
                <div className="aboutTitle">About</div>
                <div className="aboutContent">
                    < div className="aboutContent line">My name is Matthew Werdean and this was a single-page application project I created for DevMountain in order to show my skills in developing. We used languages Javscript, React, and Node.js, with some help from Postgresql to store data in a database</div>
                    <div>
                    <SocialIcon className="SocialIcon" url="https://twitter.com/werdean" color="#ee4444" />
                    <SocialIcon className="SocialIcon" url="https://github.com/Mwerdean" color="#ee4444" />
                    <SocialIcon className="SocialIcon" url="https://www.linkedin.com/" color="#ee4444" />
                    <SocialIcon className="SocialIcon" url="https://codepen.io/mwerdean/" color="#ee4444"/>
                    </div>
                </div>
            </div>
        );
    }
}