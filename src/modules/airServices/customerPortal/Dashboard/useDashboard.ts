import { CUSTOMER_PORTAL } from '@/constants';
import { useRouter } from 'next/router';
import { dashboardWidgetsTitles } from './Dashboard.data';

export const useDashboard = () => {
  const { TICKETS, KNOWLEDGE_BASE } = CUSTOMER_PORTAL;
  const { push } = useRouter();

  const handleViewMore = (widget: string) => {
    switch (widget) {
      case dashboardWidgetsTitles?.popularArticles: {
        return push(KNOWLEDGE_BASE);
      }
      case dashboardWidgetsTitles?.pendingApproval: {
        return;
      }
      case dashboardWidgetsTitles?.recentTickets: {
        return push(TICKETS);
      }
      default:
        return push(KNOWLEDGE_BASE);
    }
  };
  return { handleViewMore };
};
