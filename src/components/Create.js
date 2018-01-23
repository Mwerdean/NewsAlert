import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../App.css'


class Create extends Component {
    constructor() {
        super()
        this.state = {
            titleInput: '',
            textInput: ''
        }
        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handleTextChange = this.handleTextChange.bind(this)
        this.createPost = this.createPost.bind(this)
    }


    handleTitleChange(value) {
        this.setState({ titleInput: value })
    }

    handleTextChange(value) {
        this.setState({ textInput: value })
    }

    createPost() {
        axios.post('http://localhost:3000/post_database' , {
            auth0_id: this.props.user.auth0_id,
            title: this.state.titleInput,
            content: this.state.textInput
        }).then(res => {
            console.log(res)
        }).catch((error) => {
            console.log('error', error)
        })
    }

    render() {
        const { user } = this.props
        return (
        <div className="forumbackground">
            <div className="flex">
                <div className="empty"></div>
                <div className="middlebox">
                    <div className="submittous">Submit to NewsAlert</div>
                    <div className="content2">
                    {user &&
                        <div className="content2">
                            <div className="createinputs">
                                <div>Title:</div>
                                <input onChange={ event => this.handleTitleChange(event.target.value) }></input>
                            </div>
                            <div className="createinputs">
                                <div>text:</div>
                                <input onChange={ event => this.handleTextChange(event.target.value) }></input>
                            </div>
                            <Link to="/forum"><button onClick={ this.createPost }>submit</button></Link>
                        </div>
                    }
                    {!user && <p className="butyoumust">You must log in! <Link to="/signin">Log In</Link></p>}
                    </div>
                </div>
                <div className="empty"></div>
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

export default connect(mapStateToProps)(Create)