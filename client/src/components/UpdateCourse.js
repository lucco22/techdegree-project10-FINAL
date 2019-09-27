import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class UpdateCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      errors: []
    }
  }
  
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = async (e) => {
    e.preventDefault();
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    const authUserId = authUser.id;
    const emailAddress = authUser.emailAddress;
    const password = authUser.password;
    
    const data = this.state;
    data.userId = authUserId;

    //PUT request
    const res = await context.data.api(`/courses/${this.props.match.params.id}`, "PUT", data, true, { emailAddress, password });
    if (res.status === 204) {
      window.location.href = `/courses/${this.props.match.params.id}`;
    } else if (res.status === 400) { 
      this.setState({
         errors: ['Fill out all required fields.']
      })
      return;
    } else if (res.status === 401 || res.status === 403) {     
        window.location.href = '/forbidden';
    } else {
        window.location.href = '/error';    
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
      .then(response => {
        this.setState({
          courses: response.data,
          id: this.props.match.params.id
        })
      })
      .catch(error => {
        if (error.status === 404) {
          console.log('Unable to upload course.')
        }
      })
  }

  render() {
    const courses = this.state.courses;
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    return (

      <div>
        {courses.map(course =>
          <div key={course.id} className="bounds course--detail">
            <h1>Update Course</h1>
            {
            this.state.errors.length ?
              <div>
                <h2 className="validation--errors--label">Validation errors</h2>
                <div className="validation-errors">
                  <ul>
                      {this.state.errors.map((error, i) => <li key={i}>{error}</li>)}
                  </ul>
                </div>
              </div> : null
            }
            <div>
              <form onSubmit={this.submit}>
                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                      defaultValue={course.title} onChange={this.change} /></div>
                    <p>{course.user.firstName} {course.user.lastName}</p>
                  </div>
                  <div className="course--description">
                    <div><textarea id="description" name="description" className="" placeholder="Course description..." defaultValue={course.description} onChange={this.change} />
                    </div>
                  </div>
                </div>
                <div className="grid-25 grid-right">
                  <div className="course--stats">
                    <ul className="course--stats--list">
                      <li key="0" className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" defaultValue={course.estimatedTime} onChange={this.change} /></div>
                      </li>
                      <li key="1" className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." defaultValue={course.materialsNeeded} onChange={this.change} />
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="grid-100 pad-bottom">
                  {(authUser && authUser.id === course.user.id) &&
                    <button className="button" type="submit" onClick={this.submit}>Update Course</button>}
                  <Link className="button button-secondary" to={'/courses/' + this.props.match.params.id}>Cancel</Link>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default UpdateCourse;