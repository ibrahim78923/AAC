import { Announcements } from './Announcements';
import { PendingApprovals } from './PendingApprovals';
import { PopularArticles } from './PopularArticles';
import { RecentTickets } from './RecentTickets';
import { WelcomeCard } from './WelcomeCard';

export const dashboardWidgetsDynamic = () => [
  {
    _id: 2,
    component: WelcomeCard,
  },
  {
    _id: 3,
    component: PopularArticles,
    lg: 6.5,
    componentProps: {},
  },
  {
    _id: 4,
    component: PendingApprovals,
    lg: 5.5,
    componentProps: {},
  },
  {
    _id: 5,
    component: RecentTickets,
    lg: 6.5,

    componentProps: {},
  },
  {
    _id: 6,
    component: Announcements,
    lg: 5.5,
    componentProps: {},
  },
];
