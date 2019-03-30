import React from 'react';
import { Link } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import MaterialToolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';

const styles = theme => ({
  toolbarMain: { borderBottom: `1px solid ${theme.palette.grey[300]}` },
  toolbarTitle: { flex: 1 },
  link: { textDecoration: 'none' },
});

const Toolbar = (props) => {
  const { classes } = props;
  return (
    <>
      <MaterialToolbar className={classes.toolbarMain}>
        <Typography component="h2" variant="h4" color="inherit" align="center" noWrap className={classes.toolbarTitle}>
          <Link to={'/posts'} className={classes.link}>Blog</Link>
        </Typography>
        <Fab aria-label="Add" onClick={props.handleAddClick}><AddIcon /></Fab>
      </MaterialToolbar>
    </>
  );
}

Toolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  handleAddClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(Toolbar);
