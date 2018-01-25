import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import '../css/admin.css'

class Admin extends Component {
    constructor(){
        super()
        this.state = {
            messageInput:"",
            numbers:{},
        }
        this.CheckId = this.CheckId.bind(this)
        this.ChangeMessageInput = this.ChangeMessageInput.bind(this)
        this.send = this.send.bind(this)
    }

    send(){
        // let myObj3 = {
        //     Input: this.state.messageInput
        // }
        // axios.post('/twilio').catch((error) => {
        //     console.log(error)
        // })
        axios.get('/get').then((res) => {
            this.setState({ numbers:res.data })
            console.log(this.state.numbers)
        })
    }

    ChangeMessageInput(value){
        this.setState({ messageInput: value })
    }

    CheckId(id) {
        if(id ==='github|34040280') {
            return(
                <div>
                    <div>Send Messages</div>
                    <input className="ina" onChange={ event => this.ChangeMessageInput(event.target.value) } />
                    <button className="createbutton" onClick={this.send}>send</button>
                </div>
            )
        }
    }
    
    render() {
        const { user } = this.props
        return (
            <div className="adminBg">
            {user &&
                this.CheckId(user.auth0_id) 
            }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
     user: state.user
    }
 }

 
 
 export default connect(mapStateToProps)(Admin)