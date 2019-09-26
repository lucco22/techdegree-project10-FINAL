import React, { Component } from 'react';
import Form from './Form';

class CreateCourse extends Component {

  state = {
    errors: [],
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: ''
  };

  render() {
    const {
      errors,
      title,
      description,
      estimatedTime,
      materialsNeeded,
    } = this.state;

    const { context } = this.props;
    const authenticatedUser = context.authenticatedUser;

    return (
      <div className="bounds course--detail">
        <h1>Create Course</h1>
        <div>
          <div>
            {errors.length > 0
              ? <h2 className="validation--errors--label">Validation Errors</h2> : ''}
            <p>
              {errors.length > 0
                ? errors.map(error => <ul key={error}>error</ul>) : ''}
            </p>
          </div>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Create Course"
            elements={() => (
              <div>
                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <React.Fragment>
                      <input id="title"
                        name="title"
                        type="text"
                        className="input-title course--title--input"
                        placeholder="Course title..."
                        value={title}
                        onChange={this.change} />
                    </React.Fragment>
                    <p>By {authenticatedUser.firstName} {authenticatedUser.lastName}</p>
                    <div className="course--description">
                      <React.Fragment>
                        <textarea id="description"
                          name="description"
                          type="text"
                          placeholder="Course description..."
                          value={description}
                          onChange={this.change} />
                      </React.Fragment>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="grid-25 grid-right">
                    <div className="course--stats">
                      <ul className="course--stats--list">
                        <li key="Estimated Time">
                          <h4>Estimated Time</h4>
                          <div>
                            <React.Fragment>
                              <input
                                id="estimatedTime"
                                name="estimatedTime"
                                type="text"
                                className="course--time--input"
                                placeholder="Hours"
                                value={estimatedTime}
                                onChange={this.change} />
                            </React.Fragment>
                          </div>
                        </li>
                        <li key="Materials">
                          <h4>Materials Needed</h4>
                          <div>
                            <textarea
                              id="materialsNeeded"
                              name="materialsNeeded"
                              placeholder="List materials..."
                              value={materialsNeeded}
                              onChange={this.change}
                            />
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )} />
        </div>
      </div>
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  };

  submit = (e) => {
    const { context } = this.props;

    const {
      authenticatedUser,
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors
    } = this.state;

    const course = {
      authenticatedUser,
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors
    };

    if (errors.length > 0) {
      context.data.createCourse(course, authenticatedUser)
        .then(errors => {
          if (errors.length) {
            e.preventDefault();
            this.setState({ errors })
          } else {
            context.actions.createCourse(course, authenticatedUser)
              .then(this.props.history.push('/'));
          }
        })
        .catch(err => {
          console.log(err);
          this.props.history.push('/error');
        });
    } else {
      console.log("nope")
     context.data.createCourse();
    }
  };

  cancel = () => {
    this.props.history.push('/');
  };

};
export default CreateCourse;