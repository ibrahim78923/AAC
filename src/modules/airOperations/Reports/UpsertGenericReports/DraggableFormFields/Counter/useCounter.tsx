import { REPORT_TYPE } from '@/constants/strings';
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
      },
    ]);
    setFieldData(false);
    setModal({
      chart: false,
      text: false,
      table: false,
      counter: false,
    });
    setDraggedItemData(null);
    successSnackbar('Count Added');
  };
  return {
    handleSave,
  };
};
