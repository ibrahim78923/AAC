import { Dispatch, SetStateAction } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

export interface TextEditorI {
  handleCancel: () => void;
  setModal: Dispatch<
    SetStateAction<{
      chart: boolean;
      text: boolean;
      table: boolean;
      counter: boolean;
    }>
  >;
  form: any[];
  setForm: Dispatch<SetStateAction<any[]>>;
  setValue: UseFormReturn<FieldValues>['setValue'];
  setDraggedItemData: Dispatch<SetStateAction<any>>;
  watch: UseFormReturn<FieldValues>['watch'];
  handleSubmit: any;
  reset: any;
}
