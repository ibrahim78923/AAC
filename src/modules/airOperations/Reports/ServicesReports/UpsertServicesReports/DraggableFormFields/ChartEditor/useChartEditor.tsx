import { CHARTS, REPORT_TYPE } from '@/constants/strings';
import { successSnackbar } from '@/utils/api';
import { generateUniqueId } from '@/utils/dynamic-forms';
import { useState } from 'react';
import {
  inventoryMetrics,
  ticketsMetrics,
  purchaseOrderMetrics,
  contractsMetrics,
  softwareMetrics,
} from './ChartEditor.data';
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
    setChartMetricType,
    xAxisType,
  } = props;
  const [edit, setEdit] = useState(true);
  const [editValue, setEditValue] = useState();

  const getDropdownOptions = () => {
    switch (metricType) {
      case REPORT_TYPE?.INVENTORIES:
        return inventoryMetrics(setChartMetricType);
      case REPORT_TYPE?.TICKETS:
        return ticketsMetrics(setChartMetricType);
      case REPORT_TYPE?.SOFTWARE:
        return softwareMetrics(setChartMetricType);
      case REPORT_TYPE?.CONTRACTS:
        return contractsMetrics(setChartMetricType);
      case REPORT_TYPE?.PURCHASE_ORDER:
        return purchaseOrderMetrics(setChartMetricType);
      default:
        return [];
    }
  };
  const dropdownOptions = getDropdownOptions();

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
        xAxis:
          chartType === (CHARTS?.BAR_CHART || CHARTS?.HORIZONTAL_BAR_CHART)
            ? xAxisData?.name
            : null,
        yAxis:
          chartType === (CHARTS?.BAR_CHART || CHARTS?.HORIZONTAL_BAR_CHART)
            ? yAxisData
            : null,
        xAxisType:
          chartType === (CHARTS?.BAR_CHART || CHARTS?.HORIZONTAL_BAR_CHART)
            ? xAxisType
            : null,
        chartMetric:
          chartType != (CHARTS?.BAR_CHART || CHARTS?.HORIZONTAL_BAR_CHART)
            ? chartMetricType
            : null,
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
    dropdownOptions,
  };
};
