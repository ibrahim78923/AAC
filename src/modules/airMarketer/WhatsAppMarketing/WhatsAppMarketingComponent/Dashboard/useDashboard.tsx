import { useGetWhatsAppDashboardInsightsQuery } from '@/services/airMarketer/whatsapp-marketing';

const useDashboard = () => {
  const {
    data: getWhatsappDashboardData,
    isLoading: getWhatsappDashboardLoading,
  } = useGetWhatsAppDashboardInsightsQuery({});

  return {
    getWhatsappDashboardData,
    getWhatsappDashboardLoading,
  };
};

export default useDashboard;
