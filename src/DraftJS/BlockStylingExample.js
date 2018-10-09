import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState} from 'draft-js';
import Immutable from 'immutable';
import './BlockStylingExample.css'

const blockRenderMap = Immutable.Map({
  'unstyled': {
    element: 'blockquote'
  }
});

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
  }

  onChange = (editorState) => {
    this.setState({editorState});
  }

  myBlockStyleFn = (contentBlock) => {
    const type = contentBlock.getType();
    if (type === 'blockquote') {
      return 'superFancyBlockquote';
    }
  }

  render() {
    return (
      <div>
        <div>Editor 1(blockquote)</div>
        <Editor 
          editorState={this.state.editorState}
          onChange={this.onChange}
          blockStyleFn={this.myBlockStyleFn}
          blockRenderMap={blockRenderMap} 
          />
        <div>Editor 2(not blockquote)</div>
        <Editor 
          editorState={this.state.editorState}
          onChange={this.onChange}
          />
      </div>
        
    );
  }
}

ReactDOM.render(
  <MyEditor />,
  document.getElementById('container')
);