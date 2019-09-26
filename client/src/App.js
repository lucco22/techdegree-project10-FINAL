/*******
 Project 10 - Full Stack App w/ React & Rest API
*******/

import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import CourseDetail from './components/CourseDetail';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import Header from './components/Header';
import NotFound from './components/NotFound';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import UserSignUp from './components/UserSignUp';

import withContext from './Context';


const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const HeaderWithContext = withContext(Header);
const UpdateCourseWithContext = withContext(UpdateCourse)
;const UserSignUpWithContext = withContext(UserSignUp);
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
            <Route exact path="/courses/:id" component={CourseDetailWithContext} />
            <PrivateRoute exact path="/courses/create" component={CreateCourseWithContext} />
            <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext}/>
            <Route path="/signup" component={UserSignUpWithContext} />
            <Route path="/signin" component={UserSignInWithContext} />
            <Route path="/signout" component={UserSignOutWithContext} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
