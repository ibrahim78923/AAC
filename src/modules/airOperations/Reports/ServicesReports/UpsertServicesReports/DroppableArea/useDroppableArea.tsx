import { REPORT_TYPE } from '@/constants/strings';
import { generateUniqueId } from '@/utils/dynamic-forms';
import { useTheme } from '@mui/material';
import { useState } from 'react';

export const useDroppableArea = (props: any) => {
  const { setForm, form } = props;
  const theme: any = useTheme();

  const [calendarFilter, setCalendarFilter] = useState();
  const handleDelete = (id: string) => {
    setForm(form?.filter((item: any) => item?.id !== id));
  };

  const handleCopy = (id: string) => {
    const chartToCopy = form?.find((item: any) => item?.id === id);
    const uniqueId = generateUniqueId();

    if (chartToCopy?.type === REPORT_TYPE?.CHART) {
      setForm([
        ...form,
        {
          id: uniqueId,
          component: chartToCopy?.component,
          title: chartToCopy?.title,
          type: REPORT_TYPE?.CHART,
          xAxes: chartToCopy?.xAxes,
          yAxes: chartToCopy?.yAxes,
          subFilter: chartToCopy?.subFilter,
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
    } else if (chartToCopy?.type === REPORT_TYPE?.COUNTER) {
      setForm([
        ...form,
        {
          id: uniqueId,
          title: chartToCopy?.title,
          ticketCount: chartToCopy?.ticketCount,
          templateType: chartToCopy?.templateType,
          type: REPORT_TYPE?.COUNTER,
        },
      ]);
    } else {
      setForm([
        ...form,
        {
          id: uniqueId,
          component: chartToCopy?.component,
          title: chartToCopy?.title,
          type: REPORT_TYPE?.TABLE,
        },
      ]);
    }
  };
  return {
    handleDelete,
    handleCopy,
    theme,
    setCalendarFilter,
    calendarFilter,
  };
};
