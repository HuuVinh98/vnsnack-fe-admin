// file Editor.js
import React, { useRef, useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import "./Editor.scss";

function MyEditor() {
  const editorRef = useRef();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const focus = () => {
    editorRef.current.focus();
  };
  //in đậm
  const onBoldClick = (e) => {
    e.preventDefault(); // Mình dùng preventDefault() để giữ con trỏ chuột vẫn còn ở trong editor nhé các bạn
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };
  //in nghiên
  const onItalicClick = (e) => {
    e.preventDefault(); // Mình dùng preventDefault() để giữ con trỏ chuột vẫn còn ở trong editor nhé các bạn
    setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  };
  //gạch chân
  const onUnderLineClick = (e) => {
    e.preventDefault(); // Mình dùng preventDefault() để giữ con trỏ chuột vẫn còn ở trong editor nhé các bạn
    setEditorState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  };

  //font size
  const onFontSizeClick = (e) => {
    e.preventDefault(); // Mình dùng preventDefault() để giữ con trỏ chuột vẫn còn ở trong editor nhé các bạn
    setEditorState(RichUtils.toggleInlineStyle(editorState, "50px"));
  };
  return (
    <div className="custom-editor" onClick={focus}>
      <div className="tool-bar">
        <div className="font">
          <button onMouseDown={onFontSizeClick}>A</button>
        </div>
        <div className="text-decoration flex -start">
          <button onMouseDown={onBoldClick}>B</button>
          <button onMouseDown={onItalicClick}>
            <i>I</i>
          </button>
          <button onMouseDown={onUnderLineClick}>
            <u>U</u>
          </button>
        </div>
      </div>
      <Editor // vào thẻ div chứa editor thì sẽ focus vào editor
        ref={editorRef} // để chúng ta cào phím lun :)
        editorState={editorState}
        onChange={setEditorState}
      />
    </div>
  );
}

export default MyEditor;
