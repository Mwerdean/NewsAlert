import React, { Component } from 'react'
import {CSSTransitionGroup} from 'react-transition-group'
import {Link} from 'react-router-dom'
import Cleave from 'cleave.js/react'
import axios from 'axios'
// eslint-disable-next-line
import CleavePhone from 'cleave.js/dist/addons/cleave-phone.us'
import MdCloudCircle from 'react-icons/lib/md/cloud-circle'
import MdAccountCircle from 'react-icons/lib/md/account-circle'
import MdCheckCircle from 'react-icons/lib/md/check-circle'
import styled from 'styled-components'
// import {StaggeredMotion, spring} from 'react-motion'

//    const colors = [
//         '#000000',
//         '#1a1a1a',
//         '#333333',
//         '#4d4d4d',
//         '#ffa366',
//     ]

//     const Wrapper = styled.div`
//     display:flex;
//     width:100vw;
//     min-height:100vh;
//     `;

//     const Box = styled.div`
//     flex-basis:${(props) => props.width}%;
//     background-color:${(props) => props.bgColor};
//     `;

//     const ContentWrapper = styled.div`
//     flex-basis:100%;    
//     `;


class Home extends Component {
    constructor() {
        super()
        
        this.state = {
            phoneRawValue: '',
            displayTy: false
        }
        this.onPhoneChange = this.onPhoneChange.bind(this)
        this.submit = this.submit.bind(this)
        console.log(this.state)
    }

    componentDidMount() {
        document.title = "News Alert"
    }

    submit() {
        axios.post('/phone_database', {
            number: this.state.phoneRawValue
        }).then(res => {
                this.setState({displayTy: !this.state.displayTy})
            console.log(res)
        }).catch((error) => {
            console.log(error)
        })
    }

    onClick(event){
        window.scroll({top:0,left:0,behavior:'smooth'})
    }

    onPhoneChange(event) {
        this.setState({ phoneRawValue: event.target.rawValue });
    }




    
  render() {
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
                <div className="a1"><button className="submitbtn" onClick={this.submit}>Submit</button></div>
                <div className={`thankyou ${this.state.displayTy ? 'displayTy' : ''}`}>Thanks for Subscribing! Please head over to the forum to participate in what gets sent out next!
                </div>
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
        <div className="infopage">
        <div className="emptyten"></div> 
        <div>
            <div className="centertext">
                <div className="centerlarge">SERVICES</div>
                <div className="centersmall">We provide community driven info straight to your phone</div>
            </div>
            <div className="pointCont">
                <div>
                    <div className="md"><MdCloudCircle /></div>
                    <div className="infot">Let the people choose</div>
                    <div className="infos">The messages that get sent out are submitted by the users themselves in our forum. That way ony the most popular ideas get sent to you.</div>
                </div>
                <div>
                    <div className="md"><MdAccountCircle /></div>
                    <div className="infot">Easy to get started</div>
                    <div className="infos">If you have a Facebook, Google account, or even Github account, you can sign up quickly via the Auth0 platform.</div>
                </div>
                <div>
                    <div className="md"><MdCheckCircle /></div>
                    <div className="infot">Responsive Design</div>
                    <div className="infos">On the run? This website is mobile friendly!</div>
                </div>
            </div>
            </div>
            <div className="emptyten"></div> 
        </div>


        <div id="thewhypage1"className="thewhypage">
            <div className="empty"/>
            <div className="video">
            <div className="centertext">
                <div className="centerlarge">What else?</div>
            </div>
                <iframe width="700" height="415" src="https://www.youtube.com/embed/MHg_M_zKA6Y?start=55" frameBorder="0" gesture="media" title='business stuff' allow="encrypted-media" allowFullScreen></iframe> 
            </div>
            <div className="empty"/>
        </div>
    </div>
    
    //   </Wrapper>
    // )}
    // </StaggeredMotion>
    );
  }
}

export default Home;
