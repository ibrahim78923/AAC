import { Dispatch, SetStateAction } from 'react';
import { EditorState } from 'draft-js';
import { UseFormReturn, FieldValues } from 'react-hook-form';

export interface DraggableFieldsI {
  setModal: Dispatch<
    SetStateAction<{
      chart: boolean;
      text: boolean;
      table: boolean;
      counter: boolean;
    }>
  >;
  setFieldData: Dispatch<SetStateAction<boolean>>;
  form: any[];
  setForm: Dispatch<SetStateAction<any[]>>;
  metricType: any;
  setValue: UseFormReturn<FieldValues>['setValue'];
  setEditorState: Dispatch<SetStateAction<EditorState>>;
  fieldsList: any[];
  fieldData: boolean;
  modal: {
    chart: boolean;
    text: boolean;
    table: boolean;
    counter: boolean;
  };
  editorState: EditorState;
  fontSize: string;
  setFontSize: Dispatch<SetStateAction<string>>;
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
  setColumnsData: any;
  setOpenDrawer: Dispatch<SetStateAction<boolean>>;
  openDrawer: boolean;
  setMetricType: any;
  columnsData: any[];
  showTemplate: boolean;
  handleCancel: () => void;
  reportId: string;
  setDraggedItemData: Dispatch<SetStateAction<any>>;
  disableTemplate: boolean;
  draggedItemData: any;
  templateList: any[];
  mainMetrics: any;
  selectedModule: any;
  data: any;
  handleMoveBack: () => void;
  watch: UseFormReturn<FieldValues>['watch'];
}
