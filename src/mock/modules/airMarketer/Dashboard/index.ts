import {
  FormsTableDataI,
  SignupDataI,
  TotalMarketingEmailI,
} from './Dashboard.interface';

export const dashboardCardData: SignupDataI[] = [
  {
    id: 1,
    title: 'Marketing',
    path: '/authentication/personal_signup',
    description:
      'Start with a dashboard of 9 reports that focus on your website performance. Also performance and contact activity.',
  },
];
export const TotalMarketingEmail: TotalMarketingEmailI[] = [
  {
    id: 1,
    email: 'Testing',
    sent: 100,
    clickThroughRate: 50,
    deliverRate: 52,
    opened: 30,
  },

  {
    id: 2,
    email: 'Testing',
    sent: 100,
    clickThroughRate: 150,
    deliverRate: 52,
    opened: 30,
  },
  {
    id: 3,
    email: 'Testing',
    sent: 100,
    clickThroughRate: 250,
    deliverRate: 52,
    opened: 30,
  },
  {
    id: 4,
    email: 'Testing',
    sent: 100,
    clickThroughRate: 250,
    deliverRate: 52,
    opened: 30,
  },
];

export const FormsTableData: FormsTableDataI[] = [
  {
    id: 1,
    name: 'Test Landing Page',
    status: 100,
    pageViews: 50,
    submissions: 52,
    type: 'Blog Comment',
  },

  {
    id: 2,
    name: 'Test Landing Page',
    status: 100,
    pageViews: 50,
    submissions: 52,
    type: 'Blog Comment',
  },
  {
    id: 3,
    name: 'Test Landing Page',
    status: 100,
    pageViews: 50,
    submissions: 52,
    type: 'Blog Comment',
  },
  {
    id: 4,
    name: 'Test Landing Page',
    status: 100,
    pageViews: 50,
    submissions: 52,
    type: 'Blog Comment',
  },
];

export const smsMarketingMockData = {
  delivered: 120,
  sent: 150,
  read: 100,
  failed: 30,
  undelivered: 20,
  replied: 15,
  statistics: [
    {
      month: 1,
      delivered: 10,
      sent: 15,
      failed: 3,
      undelivered: 2,
      replied: 1,
    },
    { month: 2, delivered: 8, sent: 12, failed: 2, undelivered: 1, replied: 0 },
    {
      month: 3,
      delivered: 12,
      sent: 18,
      failed: 4,
      undelivered: 3,
      replied: 2,
    },
    {
      month: 4,
      delivered: 15,
      sent: 20,
      failed: 5,
      undelivered: 2,
      replied: 3,
    },
    {
      month: 5,
      delivered: 10,
      sent: 15,
      failed: 2,
      undelivered: 1,
      replied: 1,
    },
    {
      month: 6,
      delivered: 12,
      sent: 18,
      failed: 3,
      undelivered: 2,
      replied: 2,
    },
    {
      month: 7,
      delivered: 14,
      sent: 22,
      failed: 2,
      undelivered: 3,
      replied: 4,
    },
    {
      month: 8,
      delivered: 18,
      sent: 25,
      failed: 3,
      undelivered: 4,
      replied: 3,
    },
    {
      month: 9,
      delivered: 10,
      sent: 15,
      failed: 5,
      undelivered: 2,
      replied: 1,
    },
    {
      month: 10,
      delivered: 8,
      sent: 12,
      failed: 4,
      undelivered: 2,
      replied: 0,
    },
    {
      month: 11,
      delivered: 15,
      sent: 18,
      failed: 2,
      undelivered: 1,
      replied: 3,
    },
    {
      month: 12,
      delivered: 18,
      sent: 20,
      failed: 2,
      undelivered: 1,
      replied: 4,
    },
  ],
};

export const whatsappMarketingMockData = {
  delivered: 100,
  sent: 120,
  read: 400,
  failed: 90,
  undelivered: 60,
  statistics: [
    { month: 1, delivered: 10, sent: 15, failed: 5, undelivered: 3, read: 20 },
    { month: 2, delivered: 8, sent: 12, failed: 4, undelivered: 2, read: 18 },
    { month: 3, delivered: 12, sent: 18, failed: 6, undelivered: 4, read: 25 },
    { month: 4, delivered: 15, sent: 20, failed: 5, undelivered: 3, read: 30 },
    { month: 5, delivered: 10, sent: 14, failed: 6, undelivered: 2, read: 22 },
    { month: 6, delivered: 12, sent: 18, failed: 8, undelivered: 4, read: 35 },
    { month: 7, delivered: 14, sent: 22, failed: 7, undelivered: 3, read: 40 },
    { month: 8, delivered: 18, sent: 25, failed: 6, undelivered: 5, read: 45 },
    { month: 9, delivered: 10, sent: 15, failed: 10, undelivered: 6, read: 38 },
    { month: 10, delivered: 12, sent: 18, failed: 9, undelivered: 5, read: 50 },
    { month: 11, delivered: 8, sent: 12, failed: 6, undelivered: 4, read: 32 },
    { month: 12, delivered: 11, sent: 15, failed: 8, undelivered: 5, read: 35 },
  ],
};
