import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

import { createPost } from '../../store/actions';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  form: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
});

class NewPost extends Component {
  state = {
    title: '',
    body: '',
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.title && this.state.body) {
      this.props.createPost({
        id: this.props.id,
        title: this.state.title,
        body: this.state.body,
      });
    }
    this.props.onClose();
  }

  render() {
    const { classes } = this.props;
    const modalStyle = { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
    return (
      <>
        <Modal
          aria-labelledby="add-post"
          open={this.props.open}
          onClose={this.props.onClose}
        >
          <div style={modalStyle} className={classes.form}>
            <form onSubmit={this.handleSubmit} className={classes.container} noValidate autoComplete="off">
              <TextField
                id="title"
                label="Title"
                placeholder="Title"
                className={classes.textField}
                value={this.state.title}
                onChange={this.handleChange('title')}
                margin="normal"
              />
              <TextField
                id="post-body"
                label="Body"
                placeholder="Body"
                multiline
                className={classes.textField}
                onChange={this.handleChange('body')}
                value={this.state.body}
                margin="normal"
                rows="5"
              />
              <div><Button type="submit" variant="contained" color="primary" disabled={!this.state.title || !this.state.body}>
                Submit
              </Button></div>
            </form>
          </div>
        </Modal>
      </>
    );
  }
}

NewPost.propTypes = {
  classes: PropTypes.object.isRequired,
  createPost: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    createPost: (post) => dispatch(createPost(post)),
  }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(NewPost));
