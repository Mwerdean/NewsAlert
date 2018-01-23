import React, { Component } from 'react'
// import {StaggeredMotion, spring} from 'react-motion'
import { connect } from 'react-redux'
import { login } from '../ducks/reducer'
import {Link} from 'react-router-dom'
import Upvoter from './Upvoter'
// import styled from 'styled-components'
import axios from 'axios'
import Modal from 'react-modal'
import '../App.css'
import _ from 'underscore'

    // const colors = [
    //     '#000000',
    //     '#1a1a1a',
    //     '#333333',
    //     '#4d4d4d',
    //     '#ffa366',
    // ]

    // const Wrapper = styled.div`
    // display:flex;
    // width:100vw;
    // min-height:100vh;
    // `;

    // const Box = styled.div`
    // flex-basis:${(props) => props.width}%;
    // background-color:${(props) => props.bgColor};
    // `;

    // const ContentWrapper = styled.div`
    // flex-basis:100%;    
    // `;

    const customStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)'
        }
      };

    class Forum extends Component {
        constructor() {
            super()
            this.state = {
                forumInfo: [],
                modalIsOpen: false,
                updateTitle: {},
                updateContent: {},
                tempId:'',
            }
            this.deletePost = this.deletePost.bind(this)
            this.openModal = this.openModal.bind(this)
            this.afterOpenModal = this.afterOpenModal.bind(this)
            this.closeModal = this.closeModal.bind(this)
            this.handleUpdateContent = this.handleUpdateContent.bind(this)
            this.handleUpdateTitle = this.handleUpdateTitle.bind(this)
            this.userIdCheck = this.userIdCheck.bind(this)
            this.fillInput = this.fillInput.bind(this)
            this.edit = this.edit.bind(this)
        }

    componentDidMount() {
        axios.get('/user-data').then(response => {
            if (response.data.user){
                this.props.login(response.data.user)
            }
        })
        
        // axios.get('/getforum').then((res)=> {
        //     this.setState({ forumInfo: res.data })
        //     console.log("res", this.state.forumInfo)
        // })

        axios.get('/getjoin').then((res) => {
            this.setState({ forumInfo: res.data})
            console.log('res' , this.state.forumInfo)
        })
    }

    componentWillMount() {
        Modal.setAppElement('body')
    }

    deletePost(id) {
        axios.delete(`/deletepost/${id}`).then((res) => {
            console.log('responso', res.data)
        }).then(() => {
            axios.get('/getjoin').then((res)=> {
                this.setState({ forumInfo: res.data })
                console.log("res", this.state.forumInfo)
            })
        })
    }

    openModal(id) {
        this.setState({modalIsOpen:true})
        this.setState({ tempId: id })
        console.log(this.state.tempId)
    }

    afterOpenModal() {
        this.subtitle.style.color = '#foo'
    }

    closeModal() {
        this.setState({ modalIsOpen: false })
        console.log(this.state.tempId, this.state.updateContent, this.state.updateTitle)
        let myobj = {
            newtitle: this.state.updateTitle,
            newcontent: this.state.updateContent
        }
        axios.put(`/updatepost/${this.state.tempId}`, myobj).then((res) => {
            console.log(res)
        }).then(() => {
            axios.get('/getjoin').then((res)=> {
                this.setState({ forumInfo: res.data })
                console.log("res", this.state.forumInfo)
            })
        })
                    
    }
    
    handleUpdateTitle(value) {
        this.setState({ updateTitle: value })
    }

    handleUpdateContent(value) {
        this.setState({ updateContent: value })
    }

    edit(id, auth0, eid) {
        if(auth0 === id){
            return(
                <div className="actionbuttons">
                <a onClick = { () => this.openModal(eid) } className="rightbuttons"> Edit </a>
                <div> | | </div>
                <a className="rightbuttons" onClick={ () => this.deletePost(eid) }> Delete </a>
            </div>
            )
        }
    }

    userIdCheck(id) {
        if(id.length > 17){
            return(
                id.substring(0,17) + "..."
            )
        } else return(
            id
        )
    }

    logout(){
        axios.put('/logout').then((res) => {
            this.props.user = null
        }).then(()=> {

        })
    }

    fillInput() {
        this.state.forumInfo.map((element, index) => {
             return (
               <div>{element.title}</div> 
             )
         })
    }

  render() {
    const { user } = this.props 
    let displayForum = _.sortBy(this.state.forumInfo , 'id').map((element, index) => {
        return (
            <div key={index} className="contentforumpost">
                <div className="postleftcontent">
                    <div className="useridborder">User ID:
                        <div>{this.userIdCheck(element.auth0_id)}
                        </div>
                    </div>
                    <div>
                        <Upvoter />
                    </div>
                    <img alt="thing" src={element.pictureurl} className="infopicture2"/>
                </div>
                <div className="postrightcontent">
                    <div className="titlebuttons">
                        <h3 className="test3" >{element.title}</h3>
                        {user &&
                            this.edit(element.auth0_id, user.auth0_id, element.id)
                        }
                    </div>
                    <div>{element.content}</div>
                </div>
            </div>
        )
    })
    return (
    // <StaggeredMotion
    //     defaultStyles={[
    //         { width:100 },
    //         { width:100 },
    //         { width:100 },
    //         { width:100 },
    //     ]}
    //     styles={(prevStyles) => [
    //         { width:spring(0) },
    //         { width:spring(prevStyles[0].width) },
    //         { width:spring(prevStyles[1].width) },
    //         { width:spring(prevStyles[2].width) },
    //     ]}
    //     >
    // {(styles) => (
    //   <Wrapper>
    //     <Box bgColor={colors[0]} width={styles[0].width} className="box1"/>
    //     <Box bgColor={colors[1]} width={styles[1].width} className="box2"/>
    //     <Box bgColor={colors[2]} width={styles[2].width} className="box3"/>
    //     <Box bgColor={colors[3]} width={styles[3].width} className="box4"/>
        <div className="forumbackground">

            <div className="flex">
                <div className="emptyleft"></div>
                <div className="middlebox">
                    
                    <Modal 
                        isOpen = { this.state.modalIsOpen }
                        onAfterOpen = { this.afterOpenModal }
                        onRequestClose = { this.closeModal }
                        style = { customStyles }
                        contentLabel = "Update Post"
                    >
                        <h2 ref={subtitle => this.subtitle = subtitle}>Edit Post</h2>
                        <div>Edit Title:</div>
                        <input className="ina" placeholder="Type your new title here" onChange={ event => this.handleUpdateTitle(event.target.value) }/>
                        <div>Edit: Content</div>  
                        <input className="ina" placeholder="Type your new content here"onChange={ event => this.handleUpdateContent(event.target.value) }/>
                        <button onClick={this.closeModal} className="createbutton">Submit</button>
                    </Modal>
                    <div className="contentmain">
                    <div className="title">Forum</div>
                        <div className="forum1">
                        {displayForum}
                        </div>
                    </div>
                </div>
                <div className="emptyright">
                    <div className="content">
                    <div className="test5">
                      {user &&
                        <div className="accountinfo">
                            <div className="test4">
                                <h1>Account Info</h1>
                                <div className="spacing2"><img alt="thing" src={user.pictureUrl} className="infopicture"/></div>
                                <div> You are logged in as: </div>
                                    <div><strong>{user.name}</strong></div>
                                    <div><strong>{user.email}</strong></div>
                                    <div><strong>{user.auth0_id}</strong></div>
                                </div>
                            </div>}
                      {!user && <p className="butyoumust">You must log in! <Link to="/signin">Log In</Link></p>}
                      <div>
                          <ol className="list">Rules:
                              <li>Be Nice.</li>
                              <li>Posts which result in harassment of any individual, or other entity may be removed at the moderators' discretion.</li>
                              <li>No Politics</li>
                              <li>No personal information.</li>
                          </ol>
                      </div>
                      </div>
                    </div>
                <div className="center">
                    <Link to="/create"><button className="createbutton">Create&nbsp;Post</button></Link>
                 </div>
                 <div className="center">
                 <Link to="/signin"><button className="createbutton" onClick={ this.logout }>Logout</button></Link>
                 </div>
                </div> 
            </div>
        </div>
    //   </Wrapper>
    // )}
    // </StaggeredMotion>
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
 