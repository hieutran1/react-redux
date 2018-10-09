import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, getDefaultKeyBinding, KeyBindingUtil} from 'draft-js';

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    }
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  onChange = (editorState) => {
    this.setState({editorState});
  }

  myKeyBindingFn = (e) => {
    const {hasCommandModifier} = KeyBindingUtil;

    if (e.keyCode === 83 /* `S` key */ && hasCommandModifier(e)) {
      return 'myeditor-save';
    }
    return getDefaultKeyBinding(e);
  }

  handleKeyCommand(command) {
    if (command === 'myeditor-save') {
      // Perform a request to save your contents, set
      // a new `editorState`, etc.
      console.log('Save success');
      return 'handled';
    }
    return 'not-handled';
  }

  render() {
    return (
      <Editor
        editorState={this.state.editorState}
        handleKeyCommand={this.handleKeyCommand}
        keyBindingFn={this.myKeyBindingFn}
        onChange = {this.onChange}
      />
    );
  }
}

ReactDOM.render(
  <MyEditor />,
  document.getElementById('root')
)
