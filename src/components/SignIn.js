import React, { Component } from 'react'
import Auth0Lock from 'auth0-lock'
import { connect } from 'react-redux'
import { login } from '../ducks/reducer'
import axios from 'axios'
import '../css/signin.css'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {StaggeredMotion, spring} from 'react-motion'

   const colors = [
        '#000000',
        '#1a1a1a',
        '#333333',
        '#4d4d4d',
        '#ffa366',
    ]

    const Wrapper = styled.div`
    display:flex;
    width:100vw;
    min-height:100vh;
    `;

    const Box = styled.div`
    flex-basis:${(props) => props.width}%;
    background-color:${(props) => props.bgColor};
    `;

    const ContentWrapper = styled.div`
    flex-basis:100%;    
    `;

class SignIn extends Component {
    constructor(){
        super()
        this.lock = null
        this.login = this.login.bind(this)
    }

    componentDidMount() {
        this.lock = new Auth0Lock(process.env.REACT_APP_AUTH0_CLIENT_ID, process.env.REACT_APP_AUTH0_DOMAIN) 
        this.lock.on('authenticated' , authResult => {
            this.lock.getUserInfo(authResult.accessToken, (error, user) => {
                axios.post('/login', { userId: user.sub }).then(response => {
                    this.props.login(response.data.user)
                    this.props.history.push('/forum')
                })
            })
        })
    }

    login() {
        this.lock.show()
    }

    render() {
        return (
    <StaggeredMotion
        defaultStyles={[
            { width:100 },
            { width:100 },
            { width:100 },
            { width:100 },
        ]}
        styles={(prevStyles) => [
            { width:spring(0) },
            { width:spring(prevStyles[0].width) },
            { width:spring(prevStyles[1].width) },
            { width:spring(prevStyles[2].width) },
        ]}
        >
    {(styles) => (
      <Wrapper>
        <Box bgColor={colors[0]} width={styles[0].width} className="box1"/>
        <Box bgColor={colors[1]} width={styles[1].width} className="box2"/>
        <Box bgColor={colors[2]} width={styles[2].width} className="box3"/>
        <Box bgColor={colors[3]} width={styles[3].width} className="box4"/>

            <div className="bgclor">
            <div className="logcolor">
            <h3 className="qe">Click to Sign-In</h3>
            <div className="qw">
                <Link to="/forum" className="goback">Go Back</Link>
                <div className="linediv"></div>
                <button onClick={ this.login } className="qq">Log In</button>
                </div>
                </div>
            </div>
            
      </Wrapper>
    )}

    </StaggeredMotion>

        );
    }
}

export default connect(null, { login })(SignIn)