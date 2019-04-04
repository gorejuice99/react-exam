import React, { Component } from 'react';
import axios from '../../axios';
import classes from './UserInfo.module.css';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

class UserInfo extends Component {
  state = {
    userInfo: null
  };

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate() {
    this.loadData();
  }

  loadData() {
    if (this.props.match.params.id) {
      if (
        !this.state.userInfo ||
        (this.state.userInfo &&
          this.state.userInfo.id !== +this.props.match.params.id)
      ) {
        axios
          .get('/users/' + this.props.match.params.id)
          .then(response => {
            console.log(response.data);
            this.setState({ userInfo: response.data });
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }

  goBackHandler = () => {
    this.props.history.push('/');
  };

  render() {
    let user = <h2 style={{ textAlign: 'center' }}>Please select a User!</h2>;
    if (this.props.match.params.id) {
      user = <h2 style={{ textAlign: 'center' }}>Loading....</h2>;
    }
    if (this.state.userInfo) {
      user = (
        <div className={classes.UserInfo}>
          <h1>ID: {this.state.userInfo.id}</h1>
          <h1>Name: {this.state.userInfo.name}</h1>
          <h1>Email: {this.state.userInfo.email}</h1>
          <h1>Contact: {this.state.userInfo.phone}</h1>
          <div className={classes.GoBack}>
            <Button variant="contained" onClick={this.goBackHandler}>
              <ArrowBackIcon />
              Go Back
            </Button>
          </div>
        </div>
      );
    }

    return user;
  }
}

export default UserInfo;
