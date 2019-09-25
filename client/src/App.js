/*******
 Project 10 - Full Stack App w/ React & Rest API
*******/

import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Courses from './components/Courses';
import Header from './components/Header';
//import PrivateRoute from './PrivateRoute';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import UserSignUp from './components/UserSignUp';

import withContext from './Context';

const CoursesWithContext = withContext(Courses);
const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <HeaderWithContext />
          <Switch>
            <Route exact path="/" component={CoursesWithContext}/>
            <Route path="/signup" component={UserSignUpWithContext} />
            <Route path="/signin" component={UserSignInWithContext} />
            <Route path="/signout" component={UserSignOutWithContext} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
