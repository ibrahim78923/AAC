import { CHARTS, REPORT_TYPE } from '@/constants/strings';
import { successSnackbar } from '@/utils/api';
import { generateUniqueId } from '@/utils/dynamic-forms';
import { useState } from 'react';

export const useChartEditor = (props: any) => {
  const {
    setFieldData,
    setModal,
    setValue,
    chartTitle,
    form,
    setForm,
    metricType,
    xAxisData,
    yAxisData,
    chartMetricType,
    chartType,
    subFilter,
    setDraggedItemData,
  } = props;
  const [edit, setEdit] = useState(true);
  const [editValue, setEditValue] = useState();

  const handleSave = () => {
    const uniqueId = generateUniqueId();
    setForm([
      ...form,
      {
        id: uniqueId,
        component: chartType,
        title: chartTitle,
        type: REPORT_TYPE?.CHART,
        metric: metricType,
        xAxis: chartType === CHARTS?.BAR_CHART ? xAxisData : null,
        yAxis: chartType === CHARTS?.BAR_CHART ? yAxisData : null,
        chartMetric: chartType != CHARTS?.BAR_CHART ? chartMetricType : null,
        subFilter: subFilter,
      },
    ]);
    setFieldData(false);
    setModal({
      chart: false,
      text: false,
      table: false,
      counter: false,
    });
    setValue('chartType', '');
    setValue('chartTitle', 'Report Chart');
    setValue('subFilter', false);
    setDraggedItemData(null);
    successSnackbar('Chart Added');
  };

  return {
    handleSave,
    edit,
    setEdit,
    editValue,
    setEditValue,
  };
};
