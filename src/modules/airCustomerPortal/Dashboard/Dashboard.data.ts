import { Announcements } from './Announcements';
import { Header } from './Header';
import { PendingApprovals } from './PendingApprovals';
import { PopularArticles } from './PopularArticles';
import { RecentTickets } from './RecentTickets';
import { WelcomeCard } from './WelcomeCard';

export const dashboardWidgetsFunction = () => [
  {
    _id: 1,
    component: Header,
  },
  {
    _id: 2,
    component: WelcomeCard,
  },
  {
    _id: 3,
    component: PopularArticles,
    componentProps: {
      lg: 6.5,
    },
  },
  {
    _id: 4,
    component: PendingApprovals,
    componentProps: {
      lg: 5.5,
    },
  },
  {
    component: RecentTickets,
    componentProps: {
      lg: 6.5,
    },
  },
  {
    component: Announcements,
    componentProps: {
      lg: 5.5,
    },
  },
];
