import { API_STATUS } from '@/constants';
import { useGetWhatsAppDashboardInsightsQuery } from '@/services/airMarketer/whatsapp-marketing';
import dayjs from 'dayjs';
import { useState } from 'react';

const useDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { data: getWhatsappDashboardData, status: getWhatsappDashboardStatus } =
    useGetWhatsAppDashboardInsightsQuery({
      params: {
        year: dayjs(selectedDate)?.format('YYYY'),
      },
    });

  return {
    getWhatsappDashboardData,
    getWhatsappDashboardLoading:
      getWhatsappDashboardStatus === API_STATUS?.PENDING ? true : false,
    selectedDate,
    setSelectedDate,
  };
};

export default useDashboard;
