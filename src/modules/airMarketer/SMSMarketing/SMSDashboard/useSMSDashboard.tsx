import { API_STATUS } from '@/constants';
import { CONTACTS_CONSTANTS } from '@/constants/strings';
import {
  useGetSmsBroadcatsQuery,
  useGetSmsDashboardInsightsQuery,
} from '@/services/airMarketer/SmsMarketing';
import { useGetContactsListQuery } from '@/services/common-APIs';
import dayjs from 'dayjs';
import { useState } from 'react';

const useSMSDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { data: geSMSDasboardData, status: dashboardLoading } =
    useGetSmsDashboardInsightsQuery({
      params: {
        year: dayjs(selectedDate)?.format('YYYY'),
      },
    });
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
    dashboardLoading: dashboardLoading === API_STATUS?.PENDING ? true : false,
    dashboardBroadcastData,
    broadCastLoading,
    getContactData,
    contactDataLoading,
    selectedDate,
    setSelectedDate,
  };
};

export default useSMSDashboard;
