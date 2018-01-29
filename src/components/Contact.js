import React, { Component } from 'react';
import axios from 'axios'
import '../css/contact.css'

export default class Contact extends Component {
    constructor() {
        super()
        this.state = {
        messageInput: "",
        displayMessage:false
        }
        this.ChangeMessageInput = this.ChangeMessageInput.bind(this)
        this.send = this.send.bind(this)
    }

    send() {
        let myObj4 = {
            message: this.state.messageInput
        }
        axios.post('/messages' , myObj4).catch((error) => {
            console.log(error)
        })
        this.setState({displayMessage:true})
    }

    ChangeMessageInput(value) {
        this.setState({ messageInput: value})
    }

    render() {
        return (
            <div className="construction">
                <div>Want to report any bugs? Send a message to the developer here!</div>
                <input className="inb" onChange={ event => this.ChangeMessageInput(event.target.value) } />
                <button className="createbutton" onClick={this.send}>Send</button>
                <div className={`dontShowMessage ${this.state.displayMessage ? 'message' : '' }`}>Message sent!</div>
            </div>
        );
    }
}