import React from 'react';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const editorConfiguration = {
  toolbar: [
    'heading',
    '|',
    'bold',
    'italic',
    'link',
    'bulletedList',
    'numberedList',
    '|',
    'outdent',
    'indent',
    '|',
    'imageUpload',
    'blockQuote',
    'insertTable',
    'mediaEmbed',
    'undo',
    'redo',
  ],
};

function CustomEditor(props: any) {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={props.initialData}
      config={editorConfiguration}
      onChange={(event, editor) =>
        props?.handleEditorChange(props.index, editor)
      }
    />
  );
}

export default CustomEditor;
