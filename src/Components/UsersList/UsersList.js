import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
});

const userList = props => (
  <TableRow>
    <TableCell>{props.id}</TableCell>
    <TableCell>{props.name}</TableCell>
    <TableCell>{props.email}</TableCell>
    <TableCell>{props.phone}</TableCell>
    <TableCell>
      <Link to={'/' + props.id}>
        <Button variant="contained" className={props.button}>
          View
        </Button>
      </Link>

      <Button
        onClick={() => props.openModalUpdateUser(props)}
        variant="contained"
        color="primary"
        className={props.button}
      >
        Update
      </Button>
      <Button
        onClick={() => props.openModalDeleteUser(props)}
        variant="contained"
        color="secondary"
        className={props.button}
      >
        Delete
      </Button>
    </TableCell>
  </TableRow>
);

export default withStyles(styles)(userList);
