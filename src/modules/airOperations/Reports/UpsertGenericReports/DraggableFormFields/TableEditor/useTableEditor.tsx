import { MODAL_INITIAL_STATES, REPORT_TYPE } from '@/constants/strings';
import { successSnackbar } from '@/utils/api';
import { generateUniqueId } from '@/utils/dynamic-forms';
import { useEffect, useState } from 'react';
import { TableEditorI } from './TableEditor.interface';
import { useAppSelector } from '@/redux/store';
import { useDispatch } from 'react-redux';
import {
  setColumnsData,
  setFieldData,
} from '@/redux/slices/genericReport/genericReportSlice';

export const useTableEditor = (props: TableEditorI) => {
  const {
    setForm,
    setModal,
    form,
    setDraggedItemData,
    draggedItemData,
    watch,
    reset,
  } = props;

  const columnsData = useAppSelector(
    (state) => state?.genericReport?.columnsData,
  );
  const disableTemplate = useAppSelector(
    (state) => state?.genericReport?.disableTemplate,
  );
  const dispatch = useDispatch();
  const tableTitle = watch('tableTitle');
  const [columnObject, setColumnObject] = useState([]);
  const [columnField, setColumnField] = useState(columnsData);

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
    dispatch(setFieldData(false));
    setModal(MODAL_INITIAL_STATES);
    dispatch(setColumnsData([]));
    setDraggedItemData(null);
    successSnackbar('Table Added');
    reset();
  };

  useEffect(() => {
    dispatch(setColumnsData(columnField));
  }, [columnField]);

  return {
    handleSave,
    setColumnObject,
    columnsData,
    setColumnField,
    disableTemplate,
  };
};
