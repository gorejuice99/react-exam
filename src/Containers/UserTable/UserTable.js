import React, { Component } from 'react';
import axios from '../../axios';
import { withStyles } from '@material-ui/core/styles';
import UsersList from '../../Components/UsersList/UsersList';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
    users: []
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

  render() {
    const users = this.state.users.map(user => {
      return <UsersList {...user} key={user.id} />;
    });

    return (
      <Paper className={this.props.containerTable}>
        <Table className={this.props.table}>
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
    );
  }
}

export default withStyles(styles)(UserTable);
