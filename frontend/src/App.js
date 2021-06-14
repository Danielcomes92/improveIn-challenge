import { connect } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import {useEffect} from 'react'
import Auth from './pages/Auth'
import Home from './pages/Home'
import authActions from './redux/actions/authActions'

function App({userLogged, logInForced}) {
  useEffect(() => {
    if (!userLogged && localStorage.getItem('token')) {
      const userData = JSON.parse(localStorage.getItem('userLogged'))
      const userForced = {
        token: localStorage.getItem('token'),
        ...userData
      }
      logInForced(userForced)
    }
  },[userLogged, logInForced])
  
  console.log(userLogged)
  return (
    <BrowserRouter>
      <Switch>
        {!userLogged ? <Route exact path="/" component={Auth} /> : <Route exact path="/" component={Home} />}
        <Redirect to = "/" />
      </Switch>    
    </BrowserRouter>
  );
}

const mapStateToProps = state =>{
  return{
    userLogged: state.authReducer.userLogged
  }
}

const mapDispatchToProps = {
  logInForced : authActions.logInForced
}


export default connect(mapStateToProps, mapDispatchToProps)(App);

