import { EditorState } from 'draft-js';
import { Dispatch, SetStateAction } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

export interface TextI {
  editorState: EditorState;
  setValue: UseFormReturn<FieldValues>['setValue'];
  setEditorState: Dispatch<SetStateAction<EditorState>>;
  fontSize: string;
  color: string;
  watch: (field: string) => any;
}
