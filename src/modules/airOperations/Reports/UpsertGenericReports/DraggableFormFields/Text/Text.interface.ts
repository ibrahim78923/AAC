import { EditorState } from 'draft-js';
import { Dispatch, SetStateAction } from 'react';
export interface TextI {
  editorState: EditorState;
  setEditorState: Dispatch<SetStateAction<EditorState>>;
  fontSize: string;
  color: string;
}
