import dayjs from 'dayjs';
import { useGetActivityLogQuery } from '@/services/airServices/tickets/single-ticket-details/activities';
import { useTheme } from '@mui/material';

export const useActivity = () => {
  const theme = useTheme();
  const { data } = useGetActivityLogQuery(null);

  const activitiesData =
    data?.data?.activitylogs?.map((activity: any) => ({
      createdBy: activity?.performedByName || '---',
      createdByOne:
        `${activity?.activityType} ${activity?.moduleName}` || '---',
      timeOne:
        (activity?.createdAt &&
          dayjs(activity?.createdAt)?.format('ddd, D MMM, YYYY h:mm A')) ||
        '---',
      timeTwo: activity?.activityType || '---',
    })) || [];

  return {
    activitiesData,
    theme,
  };
};
