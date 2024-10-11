import { Dispatch, SetStateAction } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

export interface tableFieldsI {
  fieldType: string;
  fieldName: string;
  collectionName: string;
}
export interface TableEditorI {
  setValue: UseFormReturn<FieldValues>['setValue'];
  handleCancel: () => void;
  metricType: any;
  setForm: Dispatch<SetStateAction<any[]>>;
  setModal: Dispatch<
    SetStateAction<{
      chart: boolean;
      text: boolean;
      table: boolean;
      counter: boolean;
    }>
  >;
  form: any[];
  setDraggedItemData: Dispatch<SetStateAction<any>>;
  draggedItemData: any;
  watch: UseFormReturn<FieldValues>['watch'];
  methods: any;
  reset: any;
}
