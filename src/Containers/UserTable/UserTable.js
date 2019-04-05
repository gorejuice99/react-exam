import React, { Component } from 'react';
import axios from '../../axios';
import { withStyles } from '@material-ui/core/styles';
import UsersList from '../../Components/UsersList/UsersList';

import PropTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  containerTable: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  }
});

class UserTable extends Component {
  state = {
    users: [],
    selectedUser: [],
    openModal: false,
    action: 'update'
  };

  componentDidMount() {
    axios
      .get('/users')
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  openModalUserHandler = userInfo => {
    console.log(userInfo);
    this.setState({
      openModal: true,
      action: 'update',
      selectedUser: {
        name: userInfo.name,
        email: userInfo.email,
        phone: userInfo.phone,
        id: userInfo.id
      }
    });
  };

  openModalDeleteUser = userInfo => {
    this.setState({
      openModal: true,
      action: 'delete',
      selectedUser: {
        name: userInfo.name,
        email: userInfo.email,
        phone: userInfo.phone,
        id: userInfo.id
      }
    });
  };

  inputChangeHandler = (event, inputIdentifier) => {
    const userForm = {
      ...this.state.selectedUser
    };

    userForm[inputIdentifier] = event.target.value;
    this.setState({
      selectedUser: userForm
    });
  };

  closeUserModalHandler = () => {
    this.setState({ openModal: false });
  };

  updateUserHandler = () => {
    let userFormData = {};
    for (let userFieldKey in this.state.selectedUser) {
      userFormData[userFieldKey] = this.state.selectedUser[userFieldKey];
    }

    axios
      .put('/users/' + this.state.selectedUser.id, userFormData)
      .then(response => {
        console.log(response);
        this.setState({ openModal: false });
      })
      .catch(error => {
        console.log(error);
      });
  };

  deleteUserHandler = () => {
    axios
      .delete('/users/' + this.state.selectedUser.id)
      .then(response => {
        console.log(response);
        this.setState({ openModal: false });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { classes } = this.props;

    const users = this.state.users.map(user => {
      return (
        <UsersList
          openModalUpdateUser={this.openModalUserHandler}
          openModalDeleteUser={this.openModalDeleteUser}
          {...user}
          key={user.id}
        />
      );
    });

    let title = 'Update';
    let context = 'Update your user information';
    let actionBtn = (
      <Button onClick={this.updateUserHandler} color="primary">
        Update
      </Button>
    );

    let formElementsArray = [];
    for (let key in this.state.selectedUser) {
      if (key !== 'id') {
        formElementsArray.push({
          id: key,
          value: this.state.selectedUser[key]
        });
      }
    }

    let textFields = (
      <div>
        {formElementsArray.map(formElement => (
          <TextField
            key={formElement.id}
            autoFocus
            margin="dense"
            id="name"
            label={formElement.id}
            type="text"
            fullWidth
            value={formElement.value}
            onChange={event => this.inputChangeHandler(event, formElement.id)}
          />
        ))}

        {/* <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          value={this.state.selectedUser.email}
          onChange={event =>
            this.inputChangeHandler(event, this.state.selectedUser.email)
          }
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          value={this.state.selectedUser.phone}
          onChange={event =>
            this.inputChangeHandler(event, this.state.selectedUser.phone)
          }
        /> */}
      </div>
    );
    if (this.state.action === 'delete') {
      title = 'Delete';
      context = 'This will delete your user';
      actionBtn = (
        <Button onClick={this.deleteUserHandler} color="secondary">
          Delete
        </Button>
      );
      textFields = (
        <div>
          <h3>Id: {this.state.selectedUser.id}</h3>
          <h3>Name: {this.state.selectedUser.name}</h3>
          <h3>Email: {this.state.selectedUser.email}</h3>
          <h3>Phone: {this.state.selectedUser.phone}</h3>
        </div>
      );
    }

    return (
      <React.Fragment>
        <Paper className={classes.containerTable}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{users}</TableBody>
          </Table>
        </Paper>

        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.openModal}
        >
          <DialogTitle id="form-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText>{context}</DialogContentText>
            {/* loop ko sana. wala ng time lol}*/}
            {textFields}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeUserModalHandler} color="primary">
              Cancel
            </Button>
            {actionBtn}
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

UserTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserTable);
