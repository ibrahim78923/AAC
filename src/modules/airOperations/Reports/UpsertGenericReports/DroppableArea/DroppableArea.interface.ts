import { Dispatch, SetStateAction } from 'react';
import { UseFormReturn, FieldValues } from 'react-hook-form';

export interface DroppableAreaI {
  modal: {
    chart: boolean;
    text: boolean;
    table: boolean;
    counter: boolean;
  };
  form: any[];
  allChartComponents: Record<string, JSX.Element>;
  draggedItemData: any;
  setModal: Dispatch<
    SetStateAction<{
      chart: boolean;
      text: boolean;
      table: boolean;
      counter: boolean;
    }>
  >;
  setForm: Dispatch<SetStateAction<any[]>>;
  setDraggedItemData: Dispatch<SetStateAction<any>>;
  handleCancel: () => void;
  handleChooseTemplate: () => void;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  watch: UseFormReturn<FieldValues>['watch'];
  refetch: () => void;
}
