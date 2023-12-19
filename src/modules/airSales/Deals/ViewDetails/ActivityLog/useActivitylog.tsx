import { useGetActivityLogQuery } from '@/services/airSales/deals/view-details/activity-log';

const useActivitylog = () => {
  const { data } = useGetActivityLogQuery({});
  return {
    activitylogData: data?.data,
  };
};

export default useActivitylog;
