export default Users = (state = [], action) => {
  switch (action.type) {
    case 'USER_FETCH_REQUESTED':
      return { ...state, isLoading: true};
      break;
    case 'USER_FETCH_SUCCEEDED':
      return action.data;
      break;
    case 'USER_FETCH_FAILED':
      break;
    default:
      return state;
  }
}