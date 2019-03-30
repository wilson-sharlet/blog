import { actionTypes } from './actions';

const initialState = {
  posts: null,
  error: null,
  addPostError: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_POSTS:
      return {
        addPostError: null,
        error: null,
        posts: action.posts,
      }
    case actionTypes.FETCH_POSTS_FAILED:
      return {
        ...state,
        error: action.error,
      }
    case actionTypes.ADD_POST:
      const posts = JSON.parse(JSON.stringify(state.posts));
      posts.push(action.post);
      return {
        ...state,
        posts,
      }
    case actionTypes.CREATE_POST_FAILED:
      return {
        ...state,
        addPostError: action.error,
      }
    case actionTypes.RESET_ERROR:
      return {
        ...state,
        addPostError: null,
      }
    default:
      return state;
  }
}

export default reducer;