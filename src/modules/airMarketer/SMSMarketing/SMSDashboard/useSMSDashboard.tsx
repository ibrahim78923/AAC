import {
  useGetSmsBroadcatsQuery,
  useGetSmsDashboardInsightsQuery,
} from '@/services/airMarketer/SmsMarketing';
import { useGetContactsQuery } from '@/services/airSales/quotes';

const useSMSDashboard = () => {
  const { data: geSMSDasboardData, isLoading: dashboardLoading } =
    useGetSmsDashboardInsightsQuery({});
  const { data: getBroadCastData, isLoading: broadCastLoading } =
    useGetSmsBroadcatsQuery({});
  const { data: getContactData, isLoading: contactDataLoading } =
    useGetContactsQuery({});

  const dashboardCards = geSMSDasboardData?.data;
  const dashboardGraphData = dashboardCards?.statistics;
  const dashboardBroadcastData = getBroadCastData?.data?.smsbroadcasts;

  return {
    dashboardCards,
    dashboardGraphData,
    dashboardLoading,
    dashboardBroadcastData,
    broadCastLoading,
    getContactData,
    contactDataLoading,
  };
};

export default useSMSDashboard;
