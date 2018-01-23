import React, { Component } from 'react'
import { connect } from 'react-redux'

class Upvoter extends Component {
    constructor() {
        super()
        this.state = {
            upvoteCount:0,
        }
        this.upvote = this.upvote.bind(this)
        this.downvote = this.downvote.bind(this)
    }

    upvote() {
        this.setState({ upvoteCount: (this.state.upvoteCount + 1) })
    }    

    downvote() {
        this.setState({ upvoteCount: (this.state.upvoteCount - 1) })
    }

    render() {
        const { user } = this.props
        return (
          <div>
            {user && 
            <div className="flex2">
            <button className="vote" onClick = {this.downvote}>-</button>
            <div>{this.state.upvoteCount}</div>
            <button className="vote" onClick = {this.upvote}>+</button>
            </div>
            }
            {!user && <p>You must log in to vote!</p>}
          </div> 
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Upvoter)