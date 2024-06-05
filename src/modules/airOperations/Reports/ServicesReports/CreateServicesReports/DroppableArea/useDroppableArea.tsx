import { REPORT_TYPE } from '@/constants/strings';
import { generateUniqueId } from '@/utils/dynamic-forms';
import { useTheme } from '@mui/material';

export const useDroppableArea = (props: any) => {
  const { setForm, form } = props;
  const theme: any = useTheme();

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
        },
      ]);
    } else {
      setForm([
        ...form,
        {
          id: uniqueId,
          component: chartToCopy?.component,
          title: chartToCopy?.title,
          type: REPORT_TYPE?.TEXT,
        },
      ]);
    }
  };
  return {
    handleDelete,
    handleCopy,
    theme,
  };
};
