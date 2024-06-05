import { REPORT_TYPE } from '@/constants/strings';
import { generateUniqueId } from '@/utils/dynamic-forms';
import { useState } from 'react';

export const useChartEditor = (props: any) => {
  const {
    chartComponent,
    setFieldData,
    setModal,
    setValue,
    chartTitle,
    form,
    setForm,
  } = props;
  const [edit, setEdit] = useState(true);
  const [editValue, setEditValue] = useState();

  const handleSave = () => {
    const uniqueId = generateUniqueId();
    setForm([
      ...form,
      {
        id: uniqueId,
        component: chartComponent,
        title: chartTitle,
        type: REPORT_TYPE?.CHART,
      },
    ]);
    setFieldData(false);
    setModal({
      chart: false,
      interactiveFilter: false,
      text: false,
      table: false,
    });
    setValue('chartType', '');
    setValue('chartTitle', 'Report Chart');
  };

  const handleCancel = () => {
    setFieldData(false);
    setModal({
      chart: false,
      interactiveFilter: false,
      text: false,
      table: false,
    });
    setValue('chartType', '');
    setValue('chartTitle', 'Report Chart');
  };

  return {
    handleSave,
    edit,
    setEdit,
    editValue,
    setEditValue,
    handleCancel,
  };
};
