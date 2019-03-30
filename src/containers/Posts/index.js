import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

import { fetchPosts, resetError } from '../../store/actions';
import NewPost from '../NewPost';

const styles = theme => ({
  card: { display: 'flex' },
  cardDetails: { flex: 1 },
  cardGrid: { marginTop: theme.spacing.unit * 2 },
  loader: { flexGrow: 1 },
  link: { textDecoration: 'none' },
  close: { padding: theme.spacing.unit / 2 },
});

class Posts extends Component {
  componentDidMount() {
    if (!this.props.posts) {
      this.props.fetchPosts();
    }
  }

  // Resets error in redux store once the snackbar is closed
  handleErrorClose = () => {
    this.props.resetError();
  }

  render() {
    const { classes, posts, error } = this.props;
    let content;
    if (!posts && !error) {
      content = <div className={classes.loader}><LinearProgress /></div>
    } else if (error) {
      console.error(error);
      content = (<Typography component="h4" variant="h6" color="error">
        {error.message}
      </Typography>)
    } else if (posts.length > 0) {
      content = (<>{posts.map(post => (
        <Grid item key={post.id} xs={12} md={6}>
          <Card className={classes.card}>
            <div className={classes.cardDetails}>
              <CardContent>
                <Typography component="h2" variant="h6">
                  {post.title}
                </Typography>
                <Link to={`/posts/${post.id}`} className={classes.link}>
                  <Typography variant="subtitle2" color="primary">
                    Continue reading...
                  </Typography>
                </Link>
              </CardContent>
            </div>
          </Card>
        </Grid>
      ))}</>)
    } else {
      content = (<Typography component="h4" variant="h6" color="error">
        There are no posts yet.
      </Typography>)
    }
    return (
      <>
        <Grid container spacing={40} className={classes.cardGrid}>
          {content}
        </Grid>
        {/* Displays error in snackbar when adding new post fails */}
        {this.props.addPostError && <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={true}
          autoHideDuration={6000}
          onClose={this.handleErrorClose}
          ContentProps={{
            'aria-describedby': 'error-message',
          }}
          message={<span id="error-message">Could not add new post: {this.props.addPostError.message}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleErrorClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />}
        <NewPost open={this.props.openAddModal} onClose={this.props.handleAddClose} id={this.props.posts ? (this.props.posts.length + 1) : 1} />
      </>
    );
  }
}

Posts.propTypes = {
  classes: PropTypes.object.isRequired,
  posts: PropTypes.array,
  error: PropTypes.object,
  fetchPosts: PropTypes.func.isRequired,
  handleAddClose: PropTypes.func.isRequired,
  openAddModal: PropTypes.bool.isRequired,
  addPostError: PropTypes.object,
  resetError: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    posts: state.posts,
    error: state.error,
    addPostError: state.addPostError,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    resetError: () => dispatch(resetError()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Posts));
