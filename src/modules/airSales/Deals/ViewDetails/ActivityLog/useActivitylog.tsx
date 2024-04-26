import { useGetActivityLogQuery } from '@/services/airSales/deals/view-details/activity-log';

const useActivitylog = () => {
  const { data, isLoading } = useGetActivityLogQuery({});
  return {
    activitylogData: data?.data,
    isLoading,
  };
};

export default useActivitylog;
