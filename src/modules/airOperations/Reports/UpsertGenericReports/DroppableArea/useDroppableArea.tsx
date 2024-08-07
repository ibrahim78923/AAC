import { REPORT_TYPE } from '@/constants/strings';
import { successSnackbar } from '@/utils/api';
import { generateUniqueId } from '@/utils/dynamic-forms';
import { useTheme, Theme } from '@mui/material';
import { useState } from 'react';
import { DroppableAreaI } from './DroppableArea.interface';

export const useDroppableArea = (props: DroppableAreaI) => {
  const { setForm, form } = props;
  const theme: Theme = useTheme();

  const [calendarFilter, setCalendarFilter] = useState();
  const handleDelete = (id: string) => {
    setForm(form?.filter((item: any) => item?.id !== id));
    const deletedRecord = form?.find((item: any) => item?.id === id);
    successSnackbar(`Delete ${deletedRecord?.title} Successfully`);
  };

  const handleCopy = (id: string) => {
    const chartToCopy = form?.find((item: any) => item?.id === id);
    const uniqueId = generateUniqueId();

    if (chartToCopy?.reportType === REPORT_TYPE?.CHART) {
      setForm([
        ...form,
        {
          id: uniqueId,
          component: chartToCopy?.component,
          title: chartToCopy?.title,
          type: chartToCopy?.type,
          templateType: chartToCopy?.templateType,
          xAxis: chartToCopy?.xAxis,
          subFilter: chartToCopy?.subFilter,
          reportType: REPORT_TYPE?.CHART,
          metric: chartToCopy?.metric,
          xAxisType: chartToCopy?.xAxisType,
        },
      ]);
    } else if (chartToCopy?.type === REPORT_TYPE?.TEXT) {
      setForm([
        ...form,
        {
          id: uniqueId,
          component: chartToCopy?.component,
          title: chartToCopy?.title,
          type: REPORT_TYPE?.TEXT,
        },
      ]);
    } else if (chartToCopy?.reportType === REPORT_TYPE?.COUNTER) {
      setForm([
        ...form,
        {
          id: uniqueId,
          title: chartToCopy?.title,
          ticketCount: chartToCopy?.ticketCount,
          templateType: chartToCopy?.templateType,
          reportType: REPORT_TYPE?.COUNTER,
          type: chartToCopy?.type,
        },
      ]);
    } else if (chartToCopy?.type === REPORT_TYPE?.TABLE) {
      setForm([
        ...form,
        {
          id: uniqueId,
          component: chartToCopy?.component,
          title: chartToCopy?.title,
          type: REPORT_TYPE?.TABLE,
          columnObject: chartToCopy?.columnObject,
          templateType: chartToCopy?.templateType,
        },
      ]);
    }
    successSnackbar(`Duplicate ${chartToCopy?.title} Added`);
  };

  return {
    handleDelete,
    handleCopy,
    theme,
    setCalendarFilter,
    calendarFilter,
  };
};
