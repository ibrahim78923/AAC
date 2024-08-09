import { Dispatch, SetStateAction } from 'react';
import { EditorState } from 'draft-js';
import { UseFormReturn, FieldValues } from 'react-hook-form';

export interface DroppableAreaI {
  fieldData: boolean;
  modal: {
    chart: boolean;
    text: boolean;
    table: boolean;
    counter: boolean;
  };
  editorState: EditorState;
  setEditorState: Dispatch<SetStateAction<EditorState>>;
  fontSize: string;
  color: string;
  form: any[];
  columnsData: any[];
  allChartComponents: Record<string, JSX.Element>;
  setShowTemplate: Dispatch<SetStateAction<boolean>>;
  showTemplate: boolean;
  draggedItemData: any;
  setModal: Dispatch<
    SetStateAction<{
      chart: boolean;
      text: boolean;
      table: boolean;
      counter: boolean;
    }>
  >;
  setFieldData: Dispatch<SetStateAction<boolean>>;
  setForm: Dispatch<SetStateAction<any[]>>;
  setDraggedItemData: Dispatch<SetStateAction<any>>;
  handleCancel: () => void;
  handleChooseTemplate: () => void;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  watch: UseFormReturn<FieldValues>['watch'];
}
