import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const Leaderboard = (props) => {
  const { data: topPlayers } = props;

  // Table styles
  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const useStyles = makeStyles({
    table: {
      minWidth: 350,
    },
  });
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table id='table' className={classes.table}>
        <TableHead>
          <TableRow id='table-row'>
            <StyledTableCell id='rank'>Rank</StyledTableCell>
            <StyledTableCell id='name'>Name</StyledTableCell>
            <StyledTableCell id='score'>Score</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {topPlayers.map((row, idx) => (
            <StyledTableRow className='row' key={row.name}>
              <StyledTableCell>{idx + 1}</StyledTableCell>
              <StyledTableCell>{row.name}</StyledTableCell>
              <StyledTableCell>{row.score}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

Leaderboard.propTypes = {
  data: PropTypes.array
};

export default Leaderboard;
