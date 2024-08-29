import { REPORT_TYPE } from '@/constants/strings';
import { useGetActivityLogQuery } from '@/services/airSales/deals/view-details/activity-log';

const useActivitylog = (selectedRecId: any) => {
  const activityParams = {
    module: REPORT_TYPE.DEALS,
    moduleId: selectedRecId,
  };

  const { data, isLoading } = useGetActivityLogQuery({
    params: activityParams,
  });
  return {
    activitylogData: data?.data,
    isLoading,
  };
};

export default useActivitylog;
