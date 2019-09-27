/*******
 Project 10 - Full Stack App w/ React & Rest API
*******/

//imports
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

//component imports
import CourseDetail from './components/CourseDetail';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import ErrorHandler from './components/ErrorHandler';
import Header from './components/Header';
import NotFound from './components/NotFound';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import UserSignUp from './components/UserSignUp';

//importing Context.js file, then using the components 'WithContext'
import withContext from './Context';

const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const HeaderWithContext = withContext(Header);
const UpdateCourseWithContext = withContext(UpdateCourse);
;const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);

class App extends React.Component {
  render() {
    //setting up the routes
    return (
      <div>
        <Router>
          <HeaderWithContext />
          <Switch>
            <Route exact path="/" component={CoursesWithContext}/>
            <PrivateRoute path="/courses/create" component={CreateCourseWithContext} />
            <Route path="/courses/:id" component={CourseDetailWithContext} />
            <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext}/>
            <Route path="/signup" component={UserSignUpWithContext} />
            <Route path="/signin" component={UserSignInWithContext} />
            <Route path="/signout" component={UserSignOutWithContext} />
            <Route path = "/error" component={ErrorHandler} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
