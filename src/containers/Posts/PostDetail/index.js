import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

import { fetchPosts } from '../../../store/actions';

const styles = theme => ({
  card: { display: 'flex' },
  cardDetails: { flex: 1 },
  cardGrid: { marginTop: theme.spacing.unit * 2 },
  loader: { flexGrow: 1 },
});

class PostDetail extends Component {
  componentDidMount() {
    if (!this.props.post) {
      this.props.fetchPosts();
    }
  }

  render() {
    const { classes, post, error } = this.props;
    let content;
    if (!post && !error) {
      content = <div className={classes.loader}><LinearProgress /></div>
    } else if (error) {
      console.error(error);
      content = (<Typography component="h4" variant="h6" color="error">
        {error.message}
      </Typography>)
    } else if (post.id) {
      content = (<>
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h6">
                {post.title}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {post.body}
              </Typography>
            </CardContent>
          </div>
        </Card>
      </>)
    } else {
      content = (<Typography component="h4" variant="h6" color="error">
        This post doesn't exist.
      </Typography>)
    }
    return (
      <>
        <Grid container spacing={40} className={classes.cardGrid}>
          {content}
        </Grid>
      </>
    );
  }
}

PostDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  post: PropTypes.object,
  error: PropTypes.object,
  fetchPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => {
  let post = null;
  if (state.posts && state.posts.length) {
    post = state.posts.find((post) => ""+post.id === props.match.params.id) || {};
  }
return {
    post,
    error: state.error,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PostDetail));
