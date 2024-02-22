import { Announcements } from './Announcements';
import { Header } from './Header';
import { PendingApprovals } from './PendingApprovals';
import { PopularArticles } from './PopularArticles';
import { RecentTickets } from './RecentTickets';
import { WelcomeCard } from './WelcomeCard';

export const ticketsData = {
  newTickets: 15,
  pendingTickets: 12,
  completedTickets: 26,
  totalTickets: 5,
  doneTickets: 4,
};
export const ticketsTypeList = [
  'newTickets',
  'pendingTickets',
  'completedTickets',
];

export const articlesData = [
  'Expense Reimbursement Policy',
  'Expense Reimbursement Policy',
  'Expense Reimbursement Policy',
  'Expense Reimbursement Policy',
  'Expense Reimbursement Policy',
];

export const pendingApprovalData = [
  {
    ticketNumber: '# SR-8',
    ticketTitle: 'Adobe Illustrator CC',
    user: {
      firstName: 'Dough',
      lastName: 'Lucas',
      profileImage: '',
    },
    requestTime: '3 hours ago',
    source: 'Phone',
  },
  {
    ticketNumber: '# SR-8',
    ticketTitle: 'Adobe Illustrator CC',
    user: {
      firstName: 'Dough',
      lastName: 'Lucas',
      profileImage: '',
    },
    requestTime: '3 hours ago',
    source: 'Phone',
  },
  {
    ticketNumber: '# SR-8',
    ticketTitle: 'Adobe Illustrator CC',
    user: {
      firstName: 'Dough',
      lastName: 'Lucas',
      profileImage: '',
    },
    requestTime: '3 hours ago',
    source: 'Phone',
  },
  {
    ticketNumber: '# SR-8',
    ticketTitle: 'Adobe Illustrator CC',
    user: {
      firstName: 'Dough',
      lastName: 'Lucas',
      profileImage: '',
    },
    requestTime: '3 hours ago',
    source: 'Phone',
  },
  {
    ticketIdNumber: '# SR-8',
    ticketTitle: 'Adobe Illustrator CC',
    user: {
      firstName: 'Dough',
      lastName: 'Lucas',
      profileImage: '',
    },
    requestTime: '3 hours ago',
    source: 'Phone',
  },
];

export const recentTicketsData = [
  {
    subject: `what is in your email`,
    ticketNumber: '# SR-8',
    ticketTitle: 'Adobe Illustrator CC',
    icon: '',
    CreatedOn: 'Created On  Mon,24 Oct  2023 , 11:28 PM',
    device: 'Phone',
  },
  {
    subject: `what is in your email`,
    ticketNumber: '# SR-8',
    ticketTitle: 'Adobe Illustrator CC',
    icon: '',
    CreatedOn: 'Created On  Mon,24 Oct  2023 , 11:28 PM',
    source: 'Phone',
  },
  {
    subject: `what is in your email`,
    ticketIdNumber: '# SR-8',
    ticketTitle: 'Adobe Illustrator CC',
    icon: '',
    CreatedAt: 'Created On  Mon,24 Oct  2023 , 11:28 PM',
    source: 'Phone',
  },
  {
    subject: `what is in your email`,
    ticketNumber: '# SR-8',
    ticketTitle: 'Adobe Illustrator CC',
    icon: '',
    CreatedOn: 'Created On  Mon,24 Oct  2023 , 11:28 PM',
    source: 'Phone',
  },
];

export const announcementsData = [
  {
    title: 'We are excited to announce that..',
    user: {
      firstName: 'Dough',
      lastName: 'Lucas',
      profileImage: '',
    },
    announcementTime: '3 hours ago',
  },
  {
    title: 'We are excited to announce that..',
    user: {
      firstName: 'Dough',
      lastName: 'Lucas',
      profileImage: '',
    },
    announcementTime: '3 hours ago',
  },
  {
    title: 'We are excited to announce that..',
    user: {
      firstName: 'Dough',
      lastName: 'Lucas',
      profileImage: '',
    },
    announcementTime: '3 hours ago',
  },
  {
    title: 'We are excited to announce that..',
    user: {
      firstName: 'Dough',
      lastName: 'Lucas',
      profileImage: '',
    },
    announcementTime: '3 hours ago',
  },
];

export const dashboardWidgetsTitles = {
  popularArticles: 'Popular Articles',
  pendingApproval: 'Pending for Approval',
  recentTickets: 'Recent Tickets',
  announcements: 'Announcements',
};

export const dashboardWidgetsFunction = (handleViewMore: any) => [
  {
    component: Header,
  },
  {
    component: WelcomeCard,
    ticketsData,
    ticketsTypeList,
  },
  {
    title: dashboardWidgetsTitles?.popularArticles,
    component: PopularArticles,
    articlesData,
    handleViewMore,
    componentProps: {
      lg: 6.5,
    },
  },
  {
    title: dashboardWidgetsTitles?.pendingApproval,
    component: PendingApprovals,
    pendingApprovalData,
    handleViewMore,
    componentProps: {
      lg: 5.5,
    },
  },
  {
    title: dashboardWidgetsTitles?.recentTickets,
    component: RecentTickets,
    recentTicketsData,
    handleViewMore,
    componentProps: {
      lg: 6.5,
    },
  },
  {
    title: dashboardWidgetsTitles?.announcements,
    component: Announcements,
    announcementsData,
    handleViewMore,
    componentProps: {
      lg: 5.5,
    },
  },
];
