import React, { Component } from 'react'
import { CSSTransitionGroup } from 'react-transition-group'
import { connect } from 'react-redux'
import { login } from '../ducks/reducer'
import { Link } from 'react-router-dom'
import Upvoter from './Upvoter'
import axios from 'axios'
import Modal from 'react-modal'
import '../App.css'
import _ from 'underscore'
require('dotenv').config()

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

class Forum extends Component {
    constructor() {
        super()
        this.state = {
            forumInfo: [],
            modalIsOpen: false,
            modalIsOpen2: false,
            updateTitle: {},
            updateContent: {},
            updateResponse: {},
            tempId: '',
            replies: [],
        }
        this.deletePost = this.deletePost.bind(this)
        this.openModal = this.openModal.bind(this)
        this.afterOpenModal = this.afterOpenModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.closeModal2 = this.closeModal2.bind(this)
        this.handleUpdateContent = this.handleUpdateContent.bind(this)
        this.handleUpdateTitle = this.handleUpdateTitle.bind(this)
        this.replies = this.replies.bind(this)
        this.userIdCheck = this.userIdCheck.bind(this)
        this.edit = this.edit.bind(this)
        this.handleCreateResponse = this.handleCreateResponse.bind(this)
        this.cancelModal = this.cancelModal.bind(this)
        this.createReply = this.createReply.bind(this)
        this.edit2 = this.edit2.bind(this)
        this.deleteReply = this.deleteReply.bind(this)
        this.userIdCheck2 = this.userIdCheck2.bind(this)
        this.closeModals = this.closeModals.bind(this)
    }

    componentDidMount() {
        // axios.get('/user-data').then(response => {
        //     if (response.data.user){
        //         this.props.login(response.data.user)
        //     }
        // })

        // axios.get('/getforum').then((res)=> {
        //     this.setState({ forumInfo: res.data })
        //     console.log("res", this.state.forumInfo)
        // })

        axios.get('/getreplies').then((res) => {
            this.setState({ replies: res.data })
            console.log('res', this.state.replies)
        })

        axios.get('/getjoin').then((res) => {
            this.setState({ forumInfo: res.data })
            console.log('res', this.state.forumInfo)
        })



    }

    componentWillMount() {
        Modal.setAppElement('body')

    }

    deletePost(id) {
        axios.delete(`/deletepost/${id}`).then((res) => {
            console.log('responso', res.data)
        }).then(() => {
            axios.get('/getjoin').then((res) => {
                this.setState({ forumInfo: res.data })
                console.log("res", this.state.forumInfo)
            })
        })
    }

    deleteReply(id) {
        axios.delete(`/deletereply/${id}`).then((res) => {
            console.log('responso', res.data)
        }).then(() => {
            axios.get('/getreplies').then((res) => {
                this.setState({ replies: res.data })
                console.log('res', this.state.replies)
            })
        })
    }

    openModal(id) {
        this.setState({ modalIsOpen: true })
        this.setState({ tempId: id })
        console.log(this.state.tempId)
    }

    createReply(id) {
        this.setState({ modalIsOpen2: true })
        this.setState({ tempId: id })
    }

    afterOpenModal() {
        this.subtitle.style.color = '#foo'
    }

    closeModals() {
        this.setState({ modalIsOpen: false })
        console.log(this.state.tempId, this.state.updateContent, this.state.updateTitle)
        let myobj = {
            newtitle: this.state.updateTitle,
            newcontent: this.state.updateContent
        }
        axios.put(`/updatepost/${this.state.tempId}`, myobj).then((res) => {
            console.log(res)
        }).then(() => {
            axios.get('/getjoin').then((res) => {
                this.setState({ forumInfo: res.data })
                console.log("res", this.state.forumInfo)
            })
        })
    }
    closeModal() {
        this.setState({ modalIsOpen: false })

    }

    cancelModal() {
        this.setState({ modalIsOpen: false })
    }

    closeModal2() {
        this.setState({ modalIsOpen2: false })
        let myObj2 = {
            auth0_id: this.props.user.auth0_id,
            newreply: this.state.updateResponse,
            postid: this.state.tempId
        }
        axios.post('/reply', myObj2).then(() => {
            axios.get('/getreplies').then((res) => {
                this.setState({ replies: res.data })
                console.log('res', this.state.replies)
            })
        })
    }

    handleUpdateTitle(value) {
        this.setState({ updateTitle: value })
    }

    handleUpdateContent(value) {
        this.setState({ updateContent: value })
    }

    handleCreateResponse(value) {
        this.setState({ updateResponse: value })
    }


    edit(id, auth0, eid) {
        if (auth0 === id || auth0 === process.env.UNIQUE_ID) {
            return (
                <div className="actionbuttons">
                    <a onClick={() => this.openModal(eid)} className="rightbuttons"> Edit </a>
                    <div> | | </div>
                    <a className="rightbuttons" onClick={() => this.deletePost(eid)}> Delete </a>
                </div>
            )
        }
    }

    edit2(id, auth0, eid) {
        if (auth0 === id || auth0 === process.env.UNIQUE_ID) {
            return (
                <a className="rightbuttons" onClick={() => this.deleteReply(eid)}> Delete </a>
            )
        }
    }

    userIdCheck(id) {
        if (id.length > 17) {
            return (
                id.substring(0, 17) + "..."
            )
        } else return (
            id
        )
    }

    userIdCheck2(id) {
        if (id.length > 20) {
            return (
                id.substring(0, 20) + "..."
            )
        } else return (
            id
        )
    }

    logout() {
        axios.put('/logout').then((res) => {
            this.props.user = null
        }).then(() => {

        })
    }


    replies(id) {
        const { user } = this.props
        return (this.state.replies.map((element, index) => {
            console.log(typeof element.postid, typeof id)
            if (element.postid === id) {
                return (
                    <div className="replybox">
                        <div className="flex seperate">
                            <div className="replyname">User ID: {element.auth0_id}</div>
                            {user &&
                                this.edit2(element.auth0_id, user.auth0_id, element.id)
                            }
                        </div>
                        <div>{element.reply_id}</div>
                        <div>{element.content}</div>
                    </div>
                )
            }
        }))
    }



    render() {
        const { user } = this.props
        let displayForum = _.sortBy(this.state.forumInfo, 'id').map((element, index) => {
            return (
                <div>
                    <div key={index} className="contentforumpost">
                        <div className="postleftcontent">
                            <div className="useridborder">User ID:
                        <div>{this.userIdCheck(element.auth0_id)}</div>
                            </div>
                            <div>
                                <Upvoter />
                            </div>
                            <img alt="thing" src={element.pictureurl} className="infopicture2" />
                        </div>
                        <div className="postrightcontent">
                            <div className="titlebuttons">
                                <h3 className="test3" >{element.title}</h3>
                                {user &&
                                    this.edit(element.auth0_id, user.auth0_id, element.id)
                                }
                            </div>
                            <div className="flex seperate">
                                <div className="sizing">{element.content}</div>
                                {user &&
                                    <button onClick={() => this.createReply(element.id)} className="replybutton">Reply</button>
                                }
                            </div>
                        </div>
                    </div>
                    <CSSTransitionGroup
                        transitionName="EnterTransition"
                        transitionAppear={false}
                        transitionEnter={true}
                        transitionEnterTimeout={500}
                        transitionLeave={true}
                        transitionLeaveTimeout={500}>
                        {this.replies(element.id)}
                    </CSSTransitionGroup>
                </div>
            )
        })
        return (
            <div className="forumbackground">


                <div className="responsiveacc">
                    <div className="content flex">
                        <div className="test52">
                            {user &&
                                <div className="accountinfo2">
                                    <div className="test4">
                                        <h1>Account Info</h1>
                                        <div className="accinfo4">
                                        <div className="spacing2"><img alt="thing" src={user.pictureUrl} className="infopicture" /></div>
                                       <div>
                                        <div> You are logged in as: </div>
                                        <div><strong>{user.name}</strong></div>
                                        <div><strong>{user.email}</strong></div>
                                        <div><strong>{this.userIdCheck2(user.auth0_id)}</strong></div>
                                        </div>
                                        </div>
                                    </div>
                                </div>}
                            {!user && <p className="butyoumust">You must <Link to="/signin">Log In!</Link></p>}
                            <div>
                                <div>Welcome to the News Alert Forum! You can post articles here and they may get chosen to be sent out to everyone!</div>
                                <ol className="list">Rules:
                              <li>Be Nice.</li>
                                    <li>Posts which result in harassment of any individual, or other entity may be removed at the moderators' discretion.</li>
                                    <li>No Politics</li>
                                    <li>No personal information.</li>
                                </ol>
                            </div>
                            <div className="buttonres">
                        <div className="center">
                            <Link to="/create"><button className="createbutton cbc">Create&nbsp;Post</button></Link>
                        </div>
                        <div className="center">
                            <Link to="/signin"><button className="createbutton cbc" onClick={this.logout}>Logout</button></Link>
                        </div>
                    </div>
                        </div>
                    </div>
                </div>




                <div className="flex">
                    <div className="emptyleft"></div>
                    <div className="title">News Alert Forum</div>
                    <div className="emptyleft2"></div>
                </div>
                <div className="flex">
                    <div className="emptyleft"></div>
                    <div className="middlebox">

                        <Modal
                            isOpen={this.state.modalIsOpen}
                            onAfterOpen={this.afterOpenModal}
                            onRequestClose={this.closeModal}
                            style={customStyles}
                            contentLabel="Update Post"
                        >
                            <h2 ref={subtitle => this.subtitle = subtitle}>Edit Post</h2>
                            <div>Edit Title:</div>
                            <input className="ina" placeholder="Type your new title here" onChange={event => this.handleUpdateTitle(event.target.value)} />
                            <div>Edit: Content</div>
                            <input className="ina" placeholder="Type your new content here" onChange={event => this.handleUpdateContent(event.target.value)} />
                            <button onClick={this.closeModals} className="createbutton">Submit</button>
                        </Modal>
                        <Modal
                            isOpen={this.state.modalIsOpen2}
                            onAfterOpen={this.afterOpenModal}
                            onRequestClose={this.closeModal}
                            style={customStyles}
                            contentLabel="Create Response"
                        >
                            <h2 ref={subtitle => this.subtitle = subtitle}>Create Response</h2>
                            <div>Edit Response:</div>
                            <input className="ina" placeholder="Type your response" onChange={event => this.handleCreateResponse(event.target.value)} />
                            <button onClick={this.closeModal2} className="createbutton">Submit</button>
                        </Modal>
                        <div className="contentmain">
                            <div className="forum1">
                                <CSSTransitionGroup
                                    transitionName="EnterTransition"
                                    transitionAppear={false}
                                    transitionEnter={true}
                                    transitionEnterTimeout={500}
                                    transitionLeave={true}
                                    transitionLeaveTimeout={500}>
                                    {displayForum}
                                </CSSTransitionGroup>
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
                                            <div className="spacing2"><img alt="thing" src={user.pictureUrl} className="infopicture" /></div>
                                            <div> You are logged in as: </div>
                                            <div><strong>{user.name}</strong></div>
                                            <div><strong>{user.email}</strong></div>
                                            <div><strong>{this.userIdCheck2(user.auth0_id)}</strong></div>
                                        </div>
                                    </div>}
                                {!user && <p className="butyoumust">You must <Link to="/signin">Log In!</Link></p>}
                                <div>
                                <div>Welcome to the News Alert Forum! You can post articles here and they may get chosen to be sent out to everyone!</div>
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
                            <Link to="/signin"><button className="createbutton" onClick={this.logout}>Logout</button></Link>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = {
    login: login
}



export default connect(mapStateToProps, mapDispatchToProps)(Forum)
