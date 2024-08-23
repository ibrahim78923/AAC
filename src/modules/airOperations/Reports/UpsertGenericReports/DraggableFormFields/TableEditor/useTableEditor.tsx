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
    setValue,
    setDraggedItemData,
    draggedItemData,
    watch,
  } = props;

  const columnsData = useAppSelector(
    (state) => state?.genericReport?.columnsData,
  );
  const disableTemplate = useAppSelector(
    (state) => state?.genericReport?.disableTemplate,
  );
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(true);
  const tableTitle = watch('tableTitle');
  const [columnObject, setColumnObject] = useState([]);
  const [columnField, setColumnField] = useState(columnsData);
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
    dispatch(setFieldData(false));
    setModal(MODAL_INITIAL_STATES);
    dispatch(setColumnsData([]));
    setValue('tableTitle', 'Report Table');
    setDraggedItemData(null);
    successSnackbar('Table Added');
  };

  useEffect(() => {
    dispatch(setColumnsData(columnField));
  }, [columnField]);

  return {
    editValue,
    setEditValue,
    setEdit,
    edit,
    handleSave,
    setColumnObject,
    tableTitle,
    columnsData,
    setColumnField,
    disableTemplate,
  };
};
