import { AIR_CUSTOMER_PORTAL } from '@/constants';
import { useRouter } from 'next/router';
import { nonRegisterDashboardwidgets } from './NonRegisterDashboard.data';

export const useNonRegisterDashboard = () => {
  const { KNOWLEDGE_BASE } = AIR_CUSTOMER_PORTAL;
  const { push } = useRouter();

  const handleViewMore = () => {
    return push(KNOWLEDGE_BASE);
  };

  const dashboardWidgets = nonRegisterDashboardwidgets(handleViewMore);

  return { dashboardWidgets };
};
