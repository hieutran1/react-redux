import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, SelectionState, DraftModifier} from 'draft-js';
import './RaceConditionExample.css';

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
  }
  
  handleChange = (editorState) => {
    this.setState({editorState});
    logEditorText('setState@handleChange', editorState);
  }
  
  handlePastedText = (text, styles, editorState) => {
    this.setState({
      editorState: removeEditorStyles(text, editorState)
    });
    logEditorText('setState@handlePastedText', editorState);
  }

  onPaste = (event) => {
  	const newEditorState = removeEditorStyles(this.state.editorState);
    this.setState({
      editorState: newEditorState
    });
    logEditorText('setState@onPaste', newEditorState);
  }
  
  componentDidUpdate() {
  	console.group("render cycle");
  }
  
  render() {
  	logEditorText('render', this.state.editorState);
    console.groupEnd();
    return (
      <div className="container-root" onPaste={this.onPaste}>
        <Editor 
          placeholder="Type away :)"
          editorState={this.state.editorState}
          onChange={this.handleChange}
          handlePastedText={this.handlePastedText} // fix race condition
        />
      </div>
    );
  }
}

function getBlockSelection(block, start, end) {
	const blockKey = block.getKey();
  return new SelectionState({
    anchorKey: blockKey,
    anchorOffset: start,
    focusKey: blockKey,
    focusOffset: end,
  });
}

function removeEditorStyles(editorState) {
	let newEditorState = editorState;
  let newContent = editorState.getCurrentContent();
	const blocks = newContent.getBlocksAsArray();
  for (let block of blocks) {
  	block.findStyleRanges(() => true, function(start, end) {
      newContent = DraftModifier.removeInlineStyle(
        newContent,
        getBlockSelection(block, start, end),
        block.getInlineStyleAt(start),
      );
    });
    newEditorState = EditorState.push(newEditorState, newContent, 'change-inline-style');
  }
  
  return newEditorState;
}

function logEditorText(label, editorState) {
	const editorText = editorState.getCurrentContent().getPlainText();
  console.log(label, `"${editorText}"`);
}

const App = () => (
  <div>
    <b>Bold Text</b>, Regular Text
    <div><Container /></div>
  </div>
)
ReactDOM.render(<App />, document.getElementById('root'))