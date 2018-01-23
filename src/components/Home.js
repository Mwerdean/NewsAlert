import React, { Component } from 'react'
import {CSSTransitionGroup} from 'react-transition-group'
import {Link} from 'react-router-dom'
import Cleave from 'cleave.js/react'
import axios from 'axios'
// eslint-disable-next-line
import CleavePhone from 'cleave.js/dist/addons/cleave-phone.us'

class Home extends Component {
    constructor() {
        super()
        
        this.state = {
            phoneRawValue: ''
        }
        this.onPhoneChange = this.onPhoneChange.bind(this)
        this.submit = this.submit.bind(this)
        this.send = this.send.bind(this)
        console.log(this.state)
    }

    submit() {
        // axios.get('http://localhost:3001/get').then((res) => {
        //  console.log('res:', res.data)
        axios.post('http://localhost:3000/phone_database', {
            number: this.state.phoneRawValue
        }).then(res => {
                alert('Thanks for subscribing') 
            console.log(res)
        }).catch((error) => {
            console.log(error)
        })
    // })
    }

    onClick(event){
        window.scroll({top:0,left:0,behavior:'smooth'})
    }

    onPhoneChange(event) {
        this.setState({ phoneRawValue: event.target.rawValue });
    }

    send(){
        axios.post('http://localhost:3000/twilio').catch((error) => {
            console.log(error)
        })
    }



    
  render() {
    return (

    <div>
        <div className="subscribe">
            <div className="empty"/>
            <div className="sub-box">
                <div className="awesomething">
                    <CSSTransitionGroup
                        transitionName="fly-subscribe"
                        transitionAppear={true}
                        transitionAppearTimeout={1000}
                        transitionEnter={false}
                        transitionLeave={false}>
                        <div>Subscribe</div>
                    </CSSTransitionGroup>
                </div>
                <Cleave className="subinput" options={{phone: true, phoneRegionCode: 'US'}}
                        onChange={this.onPhoneChange} onKeyPress={this.submit2} placeholder="Phone Number"/>
                <p>phone: {this.state.phoneRawValue}</p>
                <div className="a1"><button className="submitbtn" onClick={this.submit}>Submit</button><button onClick={this.send}>send</button></div>
                <div className="vertempty" />
                <div className="wrapper">
                    <button className="linktest2" onClick={() => window.scroll({top:1000,left:0,behavior:'smooth'})}>
                        Why Should I?
                        <div className="arrow-down"/>
                    </button>
                </div>
            </div>
            <div className="emptyr">
                <Link to='/signin' className="linktest">
                    <div className="forum">Forum</div>
                    <div className="arrow-right"/>
                </Link>
            </div>
        </div>


        <div id="thewhypage1"className="thewhypage">
            <div className="empty"/>
            <div className="video">
                <iframe width="700" height="415" src="https://www.youtube.com/embed/MHg_M_zKA6Y?start=55" frameBorder="0" gesture="media" title='business stuff' allow="encrypted-media" allowFullScreen></iframe> 
            </div>
            <div className="empty"/>
        </div>
    </div>
    );
  }
}

export default Home;
