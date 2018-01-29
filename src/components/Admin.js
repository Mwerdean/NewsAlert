import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import '../css/admin.css'

class Admin extends Component {
    constructor(){
        super()
        this.state = {
            messageInput:[],
            numbers:[],
            numbers2:[]
        }
        this.CheckId = this.CheckId.bind(this)
        this.ChangeMessageInput = this.ChangeMessageInput.bind(this)
        this.send = this.send.bind(this)
        this.grab = this.grab.bind(this)
    }

    grab(){
        axios.get('/get').then((res) => {
            this.setState({ numbers:res.data })
            console.log(this.state.numbers)
            console.log(this.state.numbers.number)
        }).then(() => {
        this.state.numbers.map((element,index) => {
            this.state.numbers2.push(element.number)
            console.log("heres what you want" , this.state.numbers2)
        })
    })
    }

    send() {
        console.log(this.state.messageInput)
        let myObj3 = {
            numbers: this.state.numbers2,
            message: this.state.messageInput
        }
        axios.post('/twilio' , myObj3).catch((error) => {
            console.log(error)
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
                    <button className="createbutton" onClick={this.grab}>Grab Numbers</button><br />
                    <button className="createbutton" onClick={this.send}>Send</button>
                    <div>{this.state.numbers2}</div>
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