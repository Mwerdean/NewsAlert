import React, { Component } from 'react'
import './App.css'
import routes from './routes'
import Rxjs from 'rxjs'
import {Link} from 'react-router-dom'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isMin: false
    }
  }

  componentDidMount(){
    Rxjs.Observable.fromEvent(window, 'scroll')
    .debounceTime(20)
    .subscribe(e => {
      if(window.scrollY > 15) {
        this.setState({ isMin:true })
      } else {
        this.setState({ isMin: false })
      }
    })
  }

  onClick(event){
    window.scroll({top:0,left:0,behavior:'smooth'})
  }

  render() {
    return (

<div>
<nav className={`navbar  ${this.state.isMin ? 'navbar2' : ''}`}>
  <div className="navcont">
    <div className={`logo ${this.state.isMin ? 'logo2' : ''}`}> <div className="" >Matthew Werdean</div> </div>
    <div className={`navright ${this.state.isMin ? 'navr2' : ''}`} >
      <Link to='/' className="backtotop">HOME</Link>
      <div className="r2">|&nbsp;|</div>
      <Link to='forum' className="backtotop">FORUM</Link>
      <div className="r2">|&nbsp;|</div>
      <a onClick={this.onClick} className={`backtotop ${this.state.isMin ? 'back2' : ''}`}>BACK&nbsp;TO&nbsp;TOP</a></div>
  </div>
</nav>
  {routes} 
</div>
    );
  }
}

export default App;
