import { Dispatch, SetStateAction } from 'react';
import { UseFormReturn, FieldValues } from 'react-hook-form';
export interface xAxisOptionsI {
  label: string;
  value: string;
  ref: string | null;
}
export interface chartTypeI {
  BAR_CHART: string;
  HORIZONTAL_BAR_CHART: string;
  PIE_CHART: string;
  DONUT_CHART: string;
}
export interface ChartEditorI {
  metricType: any;
  setValue: UseFormReturn<FieldValues>['setValue'];
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
  setDraggedItemData: Dispatch<SetStateAction<any>>;
  draggedItemData: any;
  watch: UseFormReturn<FieldValues>['watch'];
  methods: any;
  reset: any;
}
