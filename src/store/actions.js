import axios from 'axios';

export const actionTypes = {
  SET_POSTS: 'SET_POSTS',
  FETCH_POSTS_FAILED: 'FETCH_POSTS_FAILED',
  ADD_POST: 'ADD_POST',
  CREATE_POST_FAILED: 'CREATE_POST_FAILED',
  RESET_ERROR: 'RESET_ERROR',
}

export const setPosts = (posts) => {
  return {
    type: actionTypes.SET_POSTS,
    posts,
  };
}

export const fetchPostsFailed = (error) => {
  return {
    type: actionTypes.FETCH_POSTS_FAILED,
    error,
  }
}

export const addPost = (post) => {
  return {
    type: actionTypes.ADD_POST,
    post,
  }
}

export const createPostFailed = (error) => {
  return {
    type: actionTypes.CREATE_POST_FAILED,
    error,
  }
}

export const resetError = () => { return { type: actionTypes.RESET_ERROR } }

export const fetchPosts = () => {
  return dispatch => {
    axios.get('/posts')
      .then(response => {
        dispatch(setPosts(response.data))
      })
      .catch(error => {
        dispatch(fetchPostsFailed(error))
      })
  }
}

export const createPost = (post) => {
  return dispatch => {
    axios.post('/posts', post)
      .then(() => {
        dispatch(addPost(post))
      })
      .catch(error => {
        dispatch(createPostFailed(error))
      })
  }
}
