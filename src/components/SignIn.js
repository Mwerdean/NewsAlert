import React, { Component } from 'react'
import Auth0Lock from 'auth0-lock'
import { connect } from 'react-redux'
import { login } from '../ducks/reducer'
import axios from 'axios'
import '../css/signin.css'
import { Link } from 'react-router-dom'


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
            <div className="bgclor">
            <div className="logcolor">
            <h3 className="qe">Click to Sign-In</h3>
            <div className="qw">
                <Link to="/forum" className="goback">Go to forum</Link>
                <div className="linediv"></div>
                <button onClick={ this.login } className="qq">Log In</button>
                </div>
                </div>
            </div>


        );
    }
}

export default connect(null, { login })(SignIn)