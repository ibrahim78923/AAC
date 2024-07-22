import { REPORT_TYPE } from '@/constants/strings';
import { successSnackbar } from '@/utils/api';
import { generateUniqueId } from '@/utils/dynamic-forms';
import { useState } from 'react';
import { useLazyDealsDropdownQuery } from '@/services/airOperations/reports/sales-reports/upsert-sales-reports';
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
    chartType,
    subFilter,
    setDraggedItemData,
    xAxisType,
    draggedItemData,
  } = props;
  const [edit, setEdit] = useState(true);
  const [editValue, setEditValue] = useState();
  const xAxesTypeIds = xAxisType?.map((item: any) => item?._id);

  const handleSave = () => {
    const uniqueId = generateUniqueId();
    setForm([
      ...form,
      {
        id: uniqueId,
        title: chartTitle,
        reportType: REPORT_TYPE?.CHART,
        type: chartType,
        templateType: draggedItemData ? draggedItemData?.type : false,
        metric: metricType,
        xAxis: xAxisData,
        xAxisType: xAxisData?.ref ? xAxesTypeIds : null,
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

  const dealsDropdown = useLazyDealsDropdownQuery();

  const xAxesFields = {
    DEALS_PIPELINE_ID: 'deals_dealPipelineId',
  };

  const getSingleFieldDropdown = () => {
    switch (xAxisData?.value) {
      case xAxesFields?.DEALS_PIPELINE_ID:
        return dealsDropdown;
      default:
        return [];
    }
  };
  const singleFieldDropdown = getSingleFieldDropdown();

  return {
    handleSave,
    edit,
    setEdit,
    editValue,
    setEditValue,
    singleFieldDropdown,
  };
};
