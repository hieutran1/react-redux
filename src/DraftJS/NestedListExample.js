import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils} from 'draft-js';
import { timingSafeEqual } from 'crypto';

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.myEditor = React.createRef();
  }

  onChange = (editorState) => {
    this.setState({editorState});
  }

  onTab = (e) => {
    e.preventDefault();
    const newEditorState = RichUtils.onTab(e, this.state.editorState, 1);
    this.onChange(newEditorState);
    this.focus();
  }

  focus = () => {
    this.myEditor.current.focus();
  }

  render() {
    return (
      <div onClick={this.focus}>
        <Editor
        editorState={this.state.editorState} 
        onChange={this.onChange} 
        onTab={this.onTab}
        ref={this.myEditor}/>
      </div>
    );
  }
}

ReactDOM.render(
  <MyEditor />,
  document.getElementById('container')
);