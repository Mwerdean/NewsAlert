import React, { Component } from 'react'
import './App.css'
import routes from './routes'
import Rxjs from 'rxjs'
import { Link } from 'react-router-dom'
import { CSSTransitionGroup } from 'react-transition-group'



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isMin: false,
      displayThing: null
    }
    this.displayMenu = this.displayMenu.bind(this)
    this.menuChange = this.menuChange.bind(this)
  }

  componentDidMount() {
    Rxjs.Observable.fromEvent(window, 'scroll')
      .debounceTime(20)
      .subscribe(e => {
        if (window.scrollY > 15) {
          this.setState({ isMin: true })
        } else {
          this.setState({ isMin: false })
        }
      })
  }

  onClick(event) {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' })
  }

  displayMenu() {
    if (this.state.displayThing === null) {
      this.setState({
        displayThing: <div className={`menuoptions  ${this.state.isMin ? 'menuoptions2' : ''}`}>
          <div><Link to='/' onClick={this.menuChange} className="backtotop">HOME</Link></div>
          <div><Link to='forum' onClick={this.menuChange} className="backtotop">FORUM</Link></div>
          <div><Link to='/about' onClick={this.menuChange} className="backtotop">About</Link></div>
        </div>
      })
    } else { this.setState({ displayThing: null }) }
  }

  menuChange() {
    this.setState({ displayThing: null })
  }

  render() {
    return (
      <div>
        <nav className='navbar'>
          <div className={`navcont ${this.state.isMin ? 'navbar2' : ''}`}>
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
                      <li><Link to='/contact' className="listhover">Report</Link></li>
                      <li><Link to='/admin' className="listhover">Admin</Link></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <button className="rbutton" onClick={this.displayMenu}>Menu</button>
          </div>
          <CSSTransitionGroup
            transitionName="fly-menu"
            transitionAppear={ false }
            transitionEnter={ true }
            transitionEnterTimeout={ 500 }
            transitionLeave={ true }
            transitionLeaveTimeout={ 500 }>
          {this.state.displayThing}
          </CSSTransitionGroup>
        </nav>
        {routes}
      </div>
    );
  }
}

export default App;
