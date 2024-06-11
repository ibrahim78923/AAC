import { REPORT_TYPE } from '@/constants/strings';
import { generateUniqueId } from '@/utils/dynamic-forms';
import { useState } from 'react';

export const useTableEditor = (props: any) => {
  const {
    setForm,
    setModal,
    setFieldData,
    form,
    tableTitle,
    setValue,
    setColumnsData,
    columnsData,
    setDraggedItemData,
  } = props;
  const [edit, setEdit] = useState(true);
  const [editValue, setEditValue] = useState(tableTitle);
  const handleSave = () => {
    const uniqueId = generateUniqueId();
    setForm([
      ...form,
      {
        id: uniqueId,
        type: REPORT_TYPE?.TABLE,
        title: tableTitle,
        component: columnsData,
      },
    ]);
    setFieldData(false);
    setModal({
      chart: false,
      text: false,
      table: false,
      counter: false,
    });
    setColumnsData([]);
    setValue('tableTitle', 'Report Table');
    setDraggedItemData(null);
  };

  return {
    editValue,
    setEditValue,
    setEdit,
    edit,
    handleSave,
  };
};
