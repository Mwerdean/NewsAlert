import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import Forum from './components/Forum'
import SignIn from './components/SignIn'
import Create from './components/Create'

export default (
    <Switch>
     <Route exact path="/" component={Home}/>
     <Route path="/forum" component={Forum}/>
     <Route exact path="/signin" component={SignIn}/>
     <Route exact path="/(access_token.*)" component={SignIn}/>
     <Route path = "/create" component={Create}/>
    </Switch>
)