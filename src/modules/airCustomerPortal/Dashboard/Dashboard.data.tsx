import { Announcements } from './Announcements';
import { PendingApprovals } from './PendingApprovals';
import { PopularArticles } from './PopularArticles';
import { RecentTickets } from './RecentTickets';

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
    device: 'Via Phone',
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
    device: 'Via Phone',
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
    device: 'Via Phone',
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
    device: 'Via Phone',
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
    device: 'Via Phone',
  },
];

export const recentTicketsData = [
  {
    title: '',
    ticketNumber: '# SR-8',
    ticketTitle: 'Adobe Illustrator CC',
    icon: '',
    CreatedOn: 'Created On  Mon,24 Oct  2023 , 11:28 PM',
    device: 'Via Phone',
  },
  {
    title: '',
    ticketNumber: '# SR-8',
    ticketTitle: 'Adobe Illustrator CC',
    icon: '',
    CreatedOn: 'Created On  Mon,24 Oct  2023 , 11:28 PM',
    device: 'Via Phone',
  },
  {
    title: '',
    ticketNumber: '# SR-8',
    ticketTitle: 'Adobe Illustrator CC',
    icon: '',
    CreatedOn: 'Created On  Mon,24 Oct  2023 , 11:28 PM',
    device: 'Via Phone',
  },
  {
    title: '',
    ticketNumber: '# SR-8',
    ticketTitle: 'Adobe Illustrator CC',
    icon: '',
    CreatedOn: 'Created On  Mon,24 Oct  2023 , 11:28 PM',
    device: 'Via Phone',
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

export const dashboardWidgets = [
  {
    title: dashboardWidgetsTitles?.popularArticles,
    component: PopularArticles,
    data: articlesData,
    componentProps: {
      lg: 6.5,
    },
  },
  {
    title: dashboardWidgetsTitles?.pendingApproval,
    component: PendingApprovals,
    data: pendingApprovalData,
    componentProps: {
      lg: 5.5,
    },
  },
  {
    title: dashboardWidgetsTitles?.recentTickets,
    component: RecentTickets,
    data: recentTicketsData,
    componentProps: {
      lg: 6.5,
    },
  },
  {
    title: dashboardWidgetsTitles?.announcements,
    component: Announcements,
    data: announcementsData,
    componentProps: {
      lg: 5.5,
    },
  },
];
