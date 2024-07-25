import { CONTACTS_CONSTANTS } from '@/constants/strings';
import {
  useGetSmsBroadcatsQuery,
  useGetSmsDashboardInsightsQuery,
} from '@/services/airMarketer/SmsMarketing';
import { useGetContactsListQuery } from '@/services/common-APIs';

const useSMSDashboard = () => {
  const { data: geSMSDasboardData, isLoading: dashboardLoading } =
    useGetSmsDashboardInsightsQuery({});
  const { data: getBroadCastData, isLoading: broadCastLoading } =
    useGetSmsBroadcatsQuery({});
  const { data: getContactData, isLoading: contactDataLoading } =
    useGetContactsListQuery({ numberType: CONTACTS_CONSTANTS?.PHONE_NUMBER });

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
