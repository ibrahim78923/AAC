import { CHARTS, REPORT_TYPE } from '@/constants/strings';
import { successSnackbar } from '@/utils/api';
import { generateUniqueId } from '@/utils/dynamic-forms';
import { useState } from 'react';
import {
  LeadsCTAsMatrics,
  emailMarketingMatrics,
  adCampaignsMetrics,
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
  } = props;
  const [edit, setEdit] = useState(true);
  const [editValue, setEditValue] = useState();
  const MARKETING_REPORT_METRICS = {
    LEAD_CTAS: 'Leads CTAs',
    EMAIL_MARKETING: 'Email Marketing',
    ADS_CAMPAIGNS: "Ad's Campaigns",
  };

  const getDropdownOptions = () => {
    switch (metricType) {
      case MARKETING_REPORT_METRICS?.LEAD_CTAS:
        return LeadsCTAsMatrics(setChartMetricType);
      case MARKETING_REPORT_METRICS?.EMAIL_MARKETING:
        return emailMarketingMatrics(setChartMetricType);
      case MARKETING_REPORT_METRICS?.ADS_CAMPAIGNS:
        return adCampaignsMetrics(setChartMetricType);
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
    dropdownOptions,
  };
};
