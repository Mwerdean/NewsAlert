import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import '../App.css'
import styled from 'styled-components'
import {StaggeredMotion, spring} from 'react-motion'
import { login } from '../ducks/reducer'
import axios from 'axios'
import { connect } from 'react-redux'

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

    class Forum extends Component {
    componentDidMount() {
        axios.get('/user-data').then(response => {
            if (response.data.user){
                this.props.login(response.data.user)
            }
        })
    }
  render() {
    const { user } = this.props
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
        <ContentWrapper className="forumbackground">

            <div className="flex">
                <div className="empty"></div>
                <div className="middlebox">
                    <div className="title">Forum</div>
                    <div className="content">
                    
                      {user &&
                        <div className="accountinfo">
                            <div>
                                <h1>Account Info</h1>
                                <div> You are logged in as: 
                                    <div><strong>{user.name}</strong></div>
                                    <div><strong>{user.email}</strong></div>
                                    <div><strong>{user.auth0_id}</strong></div>
                                </div>
                                </div>
                                <img alt="thing" src={user.pictureUrl} className="infopicture"/>
                            </div>}
                      {!user && <p className="butyoumust">You must log in! <Link to="/signin">Log In</Link></p>}
                
                    </div>
                    <div className="content">
                        <div className="frm1">
                        content
                        </div>
                    </div>
                </div>
                <div className="empty">
                <Link to="/create"><button className="createbutton">Create&nbsp;Post</button></Link>
                </div> 
            </div>
        </ContentWrapper>
      </Wrapper>
    )}
    </StaggeredMotion>
    );
  }
}

const mapStateToProps = state => {
    return {
     user: state.user
    }
 }
 
 const mapDispatchToProps = {
     login:login
 }
 
 export default connect(mapStateToProps, mapDispatchToProps)(Forum)
 