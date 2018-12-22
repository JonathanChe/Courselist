import React, { Component } from 'react';
import { Grid, TextField } from '@material-ui/core'
import * as contentful from 'contentful';
import Course from '../components/Course';

require('dotenv').config();

// for accessing contentful
const SPACE_ID = process.env.REACT_APP_SPACE_ID;
const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

const client = contentful.createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
});

class CourseList extends Component {

  state = {
    courses: [],
    searchString: '',
  }

  componentDidMount() {
    // retrieve and update state with data from contentful backend
    this.getCourses();
  }

  getCourses() {
    client.getEntries({
      content_type: 'course',
      query: this.state.searchString,
    })
      .then(response => this.setState({ courses: response.items }))
      .catch(err => console.log('Error occured while fetching data', err))
  }

  onSearchInputChange = event => {
    if (event.target.value) {
      this.setState({ searchString: event.target.value });
    } else {
      this.setState({ searchString: '' });
    }
    // matched courses are return
    this.getCourses();
  }

  render() {
    return (
      <div>
        {this.state.courses ?
          (
            <div>
              <TextField style={{ padding: 24 }}
                id='searchInput'
                placeholder='Search for Courses'
                margin='normal'
                onChange={this.onSearchInputChange}
              />
              <Grid container spacing={24} style={{ padding: 24 }}>
                { this.state.courses.map(currentCourse => (
                  <Grid item xs={12} sm={6} lg={4} xl={3}>
                    <Course course={currentCourse} />
                  </Grid>
                ))}
              </Grid>
            </div>)
          : 'No Courses Found'
        }
      </div>
    )
  }
}

export default CourseList;
