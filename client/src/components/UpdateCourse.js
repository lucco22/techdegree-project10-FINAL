import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class UpdateCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      id: "",
      title: "",
      description: "",
      materialsNeeded: "",
      estimatedTime: "",
      firstName: "",
      lastName: ""
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

    //POST request
    const res = await context.data.api("/courses", "PUT", data, true, { emailAddress, password });
    if (res.status === 200 || res.status === 201) {
      window.location.href = '/';
    } else if (res.status === 400) { 
      this.setState({
         errors: ['Please check that all field inputs are correct']
      })
      return;
    } else if (res.status === 401 || res.status === 403) {     
        window.location.href = '/forbidden';
    } else {
        window.location.href = '/error';    
    }
  }


  // submit = e => {
  //   e.preventDefault();
  //   const { context } = this.props;
  //   const { id, title, description, estimatedTime, materialsNeeded } = this.state;
  //   const courses = { id, title, description, estimatedTime, materialsNeeded };
  //   const authUser = context.authenticatedUser;
  //   const emailAddress = authUser.emailAddress;
  //   const password = authUser.password;
  //   const credentials = btoa(`${emailAddress}:` + password);
  //   context.data.updateCourse(courses, credentials, authUser)


  //   if (courses.description === '' || courses.title === '') {
  //     this.setState({
  //       errors: 'Course and Description are required'
  //     })
  //   } else {
  //     axios({
  //       method: 'PUT',
  //       url: 'http://localhost:5000/api/courses/' + this.props.match.params.id,
  //       headers: {
  //         'Content-Type': 'application/json; charset=utf-8',
  //         'Authorization': `Basic ${credentials}`
  //       },

  //       auth:
  //       {
  //         emailAddress: emailAddress,
  //         password
  //       },
  //       // 'Basic' + btoa(this.props.context.authenticatedUser.emailAddress),

  //       data: {
  //         title: courses.title,
  //         description: courses.description,
  //         estimatedTime: courses.estimatedTime,
  //         materialsNeeded: courses.materialsNeeded
  //       }
  //     }).then(() => {
  //       alert("Course updated successfully");
  //       this.props.history.push("/");
  //     }).catch(err => {
  //       if (err.response.status === 400) {
  //         this.setState({
  //           errors: err.response.data.message
  //         })
  //       } else if (err.response.status === 500) {
  //         alert("Course and Description must be updated ")
  //         this.props.history.push("/error");
  //       }
  //     })
  //   }
  // }



  componentDidMount() {
    axios.get('http://localhost:5000/api/courses/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          courses: response.data,
          id: this.props.match.params.id
        })
      })
      .catch(error => {
        if (error.status === 404) {
          console.log('ohh nooo')
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
          <div className="bounds course--detail">
            <h1>Update Course</h1>
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

export default UpdateCourse




// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

// export default class UpdateCourse extends Component {
//   state = {
//     course: '',
//     title: '',
//     description: '',
//     estimatedTime: '',
//     materialsNeeded: '',
//     user: '',
//     userId: '',
//     errors: [],
//   }

//   async componentDidMount() {
//     const { context } = this.props;
//     const course = await context.actions.updateCourse(this.props.match.params.id);
    
//     if(course && course !== 500){
//       this.setState({
//         id: course.id,
//         title: course.title,
//         description: course.description,
//         estimatedTime: course.estimatedTime,
//         materialsNeeded: course.materialsNeeded,
//         user: course[0].user.firstName + ' ' + course[0].user.lastName,
//         userId: course.userId,
//       });
//       //Checks to see that the currently logged in user owns the course or not
//       if(context.authenticatedUser.id !== this.state.userId) {
//         this.props.history.push('/forbidden');
//       }
//     } else if(course === 500){
//       // Redirects user to error page if there was a 500 status
//       this.props.history.push('/error');
//     } else {
//       // If no course was found, the user is redirected to the 404 page
//       this.props.history.push('/notfound');
//     }
//   }

//   cancel = () => {
//     this.props.history.push(`/courses/${this.state.id}`);
//   }

//   submit = () => {
//     const { context } = this.props;
//     const { title, description, estimatedTime, materialsNeeded } = this.state;
//     const course = { title, description, estimatedTime, materialsNeeded };
//     const credentials = JSON.parse(localStorage.getItem('user'));
//     context.data.updateCourse(course, credentials.authData, this.state.id)
//       .then(errors => {
//         //Checks for validation errors and sets them if they exist
//         if(errors.length) {
//           this.setState({ errors });
//         } else if(errors === 500){
//           // Redirects user to error page if 500 error is returned
//           this.props.history.push('/error');
//         } else {
//           // If no errors or 500 error, the course will be updated and user will be redirected to home page
//           this.props.history.push('/');
//           console.log('Course successfully updated!');
//         }
//       })
//       .catch(err => {
//         console.log(err);
//         this.props.history.push('/error');
//       });
//   }

//   //Handles updating the values in the input areas
//   change = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     // Updates the state as the input values are changed
//     this.setState(() => {
//       return {
//         [name]: value
//       };
//     });
//   }

//   render() {
//     const {
//       title,
//       description,
//       estimatedTime,
//       materialsNeeded,
//      } = this.state;
//      const { context } = this.props;
//      const authenticatedUser = context.authenticatedUser;
//      const course = this.state.course;
//     return (
//       <div className="bounds course--detail">
//         <h1>Update Course</h1>
//           <div>
//             <form onSubmit={this.submit}>
//               <div className="grid-66">
//                 <div className="course--header">
//                   <h4 className="course--label">Course</h4>
//                     <div>
//                       <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." onChange={this.change} value={title} />
//                     </div>
//                   <p>By {authenticatedUser.firstName} {authenticatedUser.lastName}</p>
//                 </div>
//                 <div className="course--description">
//                   <div>
//                     <textarea id="description" name="description" value={description} className="" onChange={this.change} placeholder="Course description..." />
//                   </div>
//                 </div>
//               </div>
//               <div className="grid-25 grid-right">
//                 <div className="course--stats">
//                   <ul className="course--stats--list">
//                     <li className="course--stats--list--item">
//                       <h4>Estimated Time</h4>
//                       <div>
//                         <input id="estimatedTime" name="estimatedTime" value={estimatedTime} type="text" className="course--time--input" onChange={this.change} placeholder="Hours" />
//                       </div>
//                     </li>
//                     <li className="course--stats--list--item">
//                       <h4>Materials Needed</h4>
//                       <div>
//                         <textarea id="materialsNeeded" name="materialsNeeded" value={materialsNeeded} className="" onChange={this.change} placeholder="List materials..." />
//                       </div>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//               <div className = "grid-100 pad-bottom">
//                 {(authenticatedUser && authenticatedUser.id === course.user.id)&& 
//                   <button className="button" type="submit" onClick={this.submit}> Update Course</button>}
//                 <Link className="button button-secodary" to={'/courses/' + this.props.match.params.id}> Cancel </Link>
//               </div>
//             </form>
//           </div>
//       </div>
//     )
//   } 
// }
                            