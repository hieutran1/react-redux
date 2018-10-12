import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils, Modifier} from 'draft-js';

const styleMap = {
  strikethrough: {
    textDecoration: 'line-through',
    color: 'rgba(255, 0, 0, 1.0)',
  },
};

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.myEditor = React.createRef();
  }

  onChange = (editorState) => {
    this.setState({editorState});
  }

  handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  handleStyle = (e) => {
    e.preventDefault();
    const {editorState} = this.state;
    const nextEditorState = RichUtils.toggleInlineStyle(editorState, 'strikethrough');
    this.onChange(nextEditorState);
  }

  focus = () => {
    this.myEditor.current.focus();
  }

  render() {
    return (
      <div >
        <button onMouseDown={this.handleStyle}>STRIKETHROUGH</button>
        <div onClick={this.focus}>
          <Editor
            customStyleMap={styleMap}
            editorState={this.state.editorState}
            onChange={this.onChange}
            handleKeyCommand={this.handleKeyCommand}
            ref= {this.myEditor}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <MyEditor /> , document.getElementById('root')
)