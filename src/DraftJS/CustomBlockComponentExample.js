import React from 'react';
import ReactDOM from 'react-dom';
import Draft, {Editor, EditorState} from 'draft-js';
import Immutable from 'immutable';
import './BlockStylingExample.css'

class MediaComponent extends React.Component {
  render() {
    const {block, contentState} = this.props;
    const {foo} = this.props.blockProps;
    const data = contentState.getEntity(block.getEntityAt(0)).getData();
    // Return a <figure> or some other content using this data.
    return (
      <div>
        {data}
      </div>
    );
  }
}

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
  }

  onChange = (editorState) => {
    this.setState({editorState});
  }

  myBlockRenderer = (contentBlock) => {
    const type = contentBlock.getType();
    if (type === 'atomic') {
      return {
        component: MediaComponent,
        editable: false,
        props: {
          foo: 'bar',
        },
      };
    }
  }

  render() {
    return (
      <div>
        <div>Editor 1</div>
        <Editor 
          editorState={this.state.editorState}
          onChange={this.onChange}
          blockRendererFn={this.myBlockRenderer}
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