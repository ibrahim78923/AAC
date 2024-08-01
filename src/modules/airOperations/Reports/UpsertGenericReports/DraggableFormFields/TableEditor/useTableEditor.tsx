import { REPORT_TYPE } from '@/constants/strings';
import { successSnackbar } from '@/utils/api';
import { generateUniqueId } from '@/utils/dynamic-forms';
import { useState } from 'react';
import { TableEditorI } from './TableEditor.interface';

export const useTableEditor = (props: TableEditorI) => {
  const {
    setForm,
    setModal,
    setFieldData,
    form,
    setValue,
    setColumnsData,
    columnsData,
    setDraggedItemData,
    draggedItemData,
    watch,
  } = props;
  const [edit, setEdit] = useState(true);
  const tableTitle = watch('tableTitle');
  const [columnObject, setColumnObject] = useState([]);
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
        columnObject: draggedItemData
          ? draggedItemData?.templateColumnsData
          : columnObject,
        templateType: draggedItemData ? draggedItemData?.type : false,
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
    successSnackbar('Table Added');
  };

  return {
    editValue,
    setEditValue,
    setEdit,
    edit,
    handleSave,
    setColumnObject,
    tableTitle,
  };
};
