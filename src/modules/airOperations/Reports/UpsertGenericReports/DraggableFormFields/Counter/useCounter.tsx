import { MODAL_INITIAL_STATES, REPORT_TYPE } from '@/constants/strings';
import { successSnackbar } from '@/utils/api';
import { generateUniqueId } from '@/utils/dynamic-forms';
import { CounterI } from './Counter.interface';

export const useCounter = (props: CounterI) => {
  const {
    setModal,
    setFieldData,
    form,
    setForm,
    setDraggedItemData,
    draggedItemData,
  } = props;
  const handleSave = () => {
    const uniqueId = generateUniqueId();
    setForm([
      ...form,
      {
        id: uniqueId,
        reportType: REPORT_TYPE?.COUNTER,
        ticketCount: draggedItemData?.ticketCount,
        title: draggedItemData?.title,
        templateType: draggedItemData?.type,
        fieldName: draggedItemData?.fieldName ? draggedItemData?.fieldName : '',
        fieldValue: draggedItemData?.fieldValue
          ? draggedItemData?.fieldValue
          : '',
      },
    ]);
    setFieldData(false);
    setModal(MODAL_INITIAL_STATES);
    setDraggedItemData(null);
    successSnackbar('Count Added');
  };
  return {
    handleSave,
  };
};
