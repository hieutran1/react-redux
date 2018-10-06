import React from 'react';
import ReactDOM from 'react-dom';
import { EditorState} from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createVideoPlugin from 'draft-js-video-plugin';

export const customPlugin = {
  blockStyleFn: (contentBlock) => {
    if (contentBlock.getType() === 'blockquote') {
      return 'superFancyBlockquote';
    }
  },
  customStyleMap: {
    'STRIKETHROUGH': {
      textDecoration: 'line-through',
    },
  },
};

export const createCustomPlugin = (config) => {
  const blockStyleFn = (contentBlock) => {
    if (contentBlock.getType() === 'blockquote') {
      return 'superFancyBlockquote';
    }
  };
  
  const customStyleMap = {
    'STRIKETHROUGH': {
      textDecoration: 'line-through',
    },
  };

  return {
    blockStyleFn: blockStyleFn,
    customStyleMap: customStyleMap,
  };
};

const videoPlugin = createVideoPlugin();

/**
 * 
 */
class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
    this.setEditor = (editor) => {
      this.editor = editor;
    };
    this.focusEditor = () => {
      if (this.editor) {
        this.editor.focus();
      }
    };
  }

  componentDidMount() {
    this.focusEditor();
  }

  render() {
    return (
      <div style={styles.editor} onClick={this.focusEditor}>
        <Editor
          ref={this.setEditor}
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins= {[videoPlugin]}
        />
      </div>
    );
  }
}

const styles = {
  editor: {
    border: '1px solid gray',
    minHeight: '6em'
  }
};

ReactDOM.render(
  <MyEditor />,
  document.getElementById('root')
);