import { REPORT_TYPE } from '@/constants/strings';
import { useLazyUsersDropdownQuery } from '@/services/airOperations/reports/marketing-reports/upsert-marketing-reports';
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

  const usersDropdown = useLazyUsersDropdownQuery();

  const xAxesFields = {
    CAMPAIGN_OWNER: 'campaign_campaignOwner',
  };

  const getSingleFieldDropdown = () => {
    switch (xAxisData?.value) {
      case xAxesFields?.CAMPAIGN_OWNER:
        return usersDropdown;
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
