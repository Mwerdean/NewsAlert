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
    <div className={`logo ${this.state.isMin ? 'logo2' : ''}`}>Matthew Werdean</div>
    <div className={`navright ${this.state.isMin ? 'navr2' : ''}`} >
      <Link to='/' className="backtotop">HOME</Link>
      <div className="r2">|&nbsp;|</div>
      <Link to='forum' className="backtotop">FORUM</Link>
      <div className="r2">|&nbsp;|</div>
      <a onClick={this.onClick} className={`backtotop ${this.state.isMin ? 'back2' : ''}`}>BACK&nbsp;TO&nbsp;TOP</a>
      <div className={`${this.state.isMin ? 'dontShow' : ''}`}>
        <div className="r2">|&nbsp;|</div>
      </div>
     <div className={`${this.state.isMin ? 'dontShow' : ''}`}>
      <ul className="backtotop2">
        <li><Link to='about' className="backtotop2">MORE</Link>
          <ul className="has-children">
            <li><Link to='/about' className="listhover">About</Link></li>
            <li><Link to='/contact' className="listhover">Contact</Link></li>
            <li><Link to='/admin' className="listhover">Admin</Link></li>
          </ul>
        </li>
      </ul>
     </div>
    </div>
  </div>
</nav>
  {routes} 
</div>
    );
  }
}

export default App;
