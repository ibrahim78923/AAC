import { Dispatch, SetStateAction } from 'react';

export interface CounterI {
  draggedItemData: any;
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
}
