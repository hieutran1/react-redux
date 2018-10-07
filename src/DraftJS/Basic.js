import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, convertToRaw} from 'draft-js';

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
  }

  onChange = (editorState) => {
    console.log('onChange - editorState: ', editorState, editorState.convertToRaw);
    this.setState({editorState});
  }

  render() {
    return (
        <Editor editorState={this.state.editorState} onChange={this.onChange} />
    );
  }
}

ReactDOM.render(
  <MyEditor />,
  document.getElementById('container')
);