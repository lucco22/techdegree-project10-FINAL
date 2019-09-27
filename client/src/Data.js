import config from './config';

export default class Data {
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) { 
      let encodedCredentials = null;
      //Checks to see if the credentials passed are the email and password
      if(credentials.emailAddress && credentials.password){
        encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
      } else {
        // Credentials are also passed from authData in local storage and are used to authorize requests
        encodedCredentials = credentials;
      }
      // Authorization header set once encodedCredentials is assigned either value
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }

  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }
  
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }
  
  // Retrieves a specific course
  async getCourse(id) {
    const course = await this.api(`/courses/${id}`);
    if(course.status === 200) {
      return course.json().then(data => data);
    } else if (course.status === 401) {
      return null;
    } else {
      // Used for sending down a 500 error
      return course.status;
    }
  }

  // Updates a specific course
  async updateCourse(courses, credentials, id) {
    const response = await this.api(`/courses/${id}`, 'PUT', courses, true, credentials);
    if (response.status === 204) {
      return [];
    }
    else if (response.status === 401) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      // Used for sending down a 500 error
      return response.status;
    }
  }


  
}
