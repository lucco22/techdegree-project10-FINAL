import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CourseDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
    }
  }

  componentDidMount() {
    fetch(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
      .then((response) => response.json())
      .then((courses) => this.setState({
          courses: courses
        }))
      .catch(error => {
        if (error.status === 404) {
          console.log('ohh nooo')
        }
      })
  }
  
  delete = async (e) => {
    e.preventDefault();
    //const { course } = this.state;
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    let password = prompt("Please enter your password to confirm this action");
    // used axios here to ensure that I know how to do an axios post as well as get
    fetch(`http://localhost:5000/api/courses/${this.props.match.params.id}`, {
      method: 'DELETE',
      auth: {
        username: `${authUser.emailAddress}`,
        password: password
      },
    }).then(() => {
      this.props.history.push("/");
    })
      .catch(err => {
        console.log(err);
        this.props.history.push("/error");
      });
  }

  render() {
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    const { courses } = this.state;
    return (
      <div className="bounds">
        {courses.map((course, i) =>
          <div>
            <div className="actions--bar">
              <div className="bounds">
                <div className="grid-100">
                  {(authUser && authUser.id === course.user.id) && 
                    <span><Link key="0" className="button" to={`/courses/${this.props.match.params.id}/update`}>Update Course</Link>
                    <Link key="1" className="button" to="#" onClick={this.delete}>Delete Course</Link></span>
                  }
                  <Link key="2" className="button button-secondary" to="/">Return to List</Link>
                </div>
              </div>
            </div>
            <div className="bounds course--detail">
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <h3 className="course--title">{course.title}</h3>
                  <p>By: {course.user.firstName} {course.user.lastName}</p>
                </div>
                <div className="course--description">
                  <p>{course.description}</p>
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <h3>{course.estimatedTime}</h3>
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <ul>
                        <li>{course.materialsNeeded}</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}
export default CourseDetail;
