import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import Posts from './Posts';
import PostDetail from './Posts/PostDetail';
import Toolbar from '../components/Toolbar';

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
});

class App extends Component {
  state = { openAddModal: false }

  handleAddClick = () => {
    this.setState({ openAddModal: true });
  }

  handleAddClose = () => {
    this.setState({ openAddModal: false });
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <CssBaseline />
        <div className={classes.layout}>
          <Toolbar handleAddClick={this.handleAddClick} />
          <main>
            <Switch>
              <Route path='/posts' exact render={() => <Posts
                openAddModal={this.state.openAddModal} handleAddClose={this.handleAddClose} />} />
              <Route path={'/posts/:id'} component={PostDetail} />
              <Redirect from='/' to='/posts' />
            </Switch>
          </main>
        </div>
      </>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
