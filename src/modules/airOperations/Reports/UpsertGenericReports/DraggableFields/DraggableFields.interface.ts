import { Dispatch, SetStateAction } from 'react';
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
  form: any[];
  setForm: Dispatch<SetStateAction<any[]>>;
  setValue: UseFormReturn<FieldValues>['setValue'];
  fieldsList: any[];
  modal: {
    chart: boolean;
    text: boolean;
    table: boolean;
    counter: boolean;
  };
  handleCancel: () => void;
  reportId: string;
  setDraggedItemData: Dispatch<SetStateAction<any>>;
  draggedItemData: any;
  mainMetrics: any;
  selectedModule: string;
  data: any;
  handleMoveBack: () => void;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  watch: UseFormReturn<FieldValues>['watch'];
  refetch: () => void;
  methods: any;
  reset: any;
}
