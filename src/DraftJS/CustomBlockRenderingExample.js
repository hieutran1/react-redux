import React from 'react';
import ReactDOM from 'react-dom';
import Draft, {Editor, EditorState} from 'draft-js';
import Immutable from 'immutable';
import './BlockStylingExample.css'

class MyCustomBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='MyCustomBlock'>
        {/* here, this.props.children contains a <section> container, as that was the matching element */}
        {this.props.children}
      </div>
    );
  }
}

const blockRenderMap = Immutable.Map({
  'MyCustomBlock': {
    // element is used during paste or html conversion to auto match your component;
    // it is also retained as part of this.props.children and not stripped out
    element: 'section',
    wrapper: <MyCustomBlock />,
  },
  'unstyled': {
    element: 'div',
    aliasedElements: ['p'],
  }
});

// Include 'paragraph' as a valid block and updated the unstyled element but
// keep support for other draft default block types
const extendedBlockRenderMap = Draft.DefaultDraftBlockRenderMap.merge(blockRenderMap);

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
  }

  onChange = (editorState) => {
    this.setState({editorState});
  }

  render() {
    return (
      <div>
        <div>Editor 1</div>
        <Editor 
          editorState={this.state.editorState}
          onChange={this.onChange}
          blockRenderMap={extendedBlockRenderMap} 
        />

        <div>Basic Editor</div>
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