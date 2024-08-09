import { EditorState } from 'draft-js';
import { Dispatch, SetStateAction } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

export interface TextEditorI {
  fontSize: string;
  color: string;
  handleCancel: () => void;
  setFieldData: Dispatch<SetStateAction<boolean>>;
  setModal: Dispatch<
    SetStateAction<{
      chart: boolean;
      text: boolean;
      table: boolean;
      counter: boolean;
    }>
  >;
  setFontSize: Dispatch<SetStateAction<string>>;
  setColor: Dispatch<SetStateAction<string>>;
  editorState: EditorState;
  setEditorState: Dispatch<SetStateAction<EditorState>>;
  form: any[];
  setForm: Dispatch<SetStateAction<any[]>>;
  setValue: UseFormReturn<FieldValues>['setValue'];
  setDraggedItemData: Dispatch<SetStateAction<any>>;
  watch: UseFormReturn<FieldValues>['watch'];
}
