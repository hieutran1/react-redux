import React from 'react';
import { connect } from 'react-redux';

class UserComponent extends React.Component {
  onSomeButtonClicked() {
    const { userId, dispatch } = this.props;
    dispatch({type: 'USER_FETCH_REQUESTED', payload: {userId}});
  }

  render() {
    return (
      <div>ddd</div>
    );
  }
}

export default connect()(UserComponent);