import React, { Component } from 'react';

import UserTable from '../Containers/UserTable/UserTable';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import axios from '../axios';

import classes from './UsersContainer.module.css';
const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%'
  }
});

class UsersContainer extends Component {
  state = {
    userForm: {
      name: {
        placeholder: 'Your Name',
        value: ''
      },
      email: {
        placeholder: 'Your Email',
        value: ''
      },
      contact: {
        placeholder: 'Your Contact',
        value: ''
      }
    },
    showForm: true,
    users: []
  };

  toggleFormHandler = () => {
    const doesShow = this.state.showForm;
    this.setState({ showForm: !doesShow });
  };

  inputChangeHandler = (event, inputIdentifier) => {
    const userForm = {
      ...this.state.userForm
    };

    const updatedUserForm = {
      ...userForm[inputIdentifier]
    };

    updatedUserForm.value = event.target.value;
    userForm[inputIdentifier] = updatedUserForm;

    this.setState({
      userForm: userForm
    });
  };

  formUserHandler = event => {
    event.preventDefault();

    let userFormData = {};
    for (let formElementIdentifier in this.state.userForm) {
      userFormData[formElementIdentifier] = this.state.userForm[
        formElementIdentifier
      ].value;
    }

    axios
      .post('/users', userFormData)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    let form = null;

    if (this.state.showForm) {
      let formElementsArray = [];
      for (let key in this.state.userForm) {
        formElementsArray.push({
          id: key,
          config: this.state.userForm[key]
        });
      }

      form = (
        <form className={classes.form} onSubmit={this.formUserHandler}>
          <h2>Add User</h2>
          {formElementsArray.map(formElement => (
            <TextField
              key={formElement.id}
              style={{ margin: 8 }}
              placeholder={formElement.config.placeholder}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              value={formElement.config.value}
              onChange={event => this.inputChangeHandler(event, formElement.id)}
            />
          ))}

          <Button variant="contained" color="primary" type="submit">
            Add
          </Button>
        </form>
      );
    }

    return (
      <React.Fragment>
        <h1>Hi, I'm a React App</h1>
        <Button
          variant="contained"
          onClick={this.toggleFormHandler}
          className={classes.AppToggleButton}
        >
          Toggle Form
        </Button>
        {form}

        <UserTable />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(UsersContainer);
