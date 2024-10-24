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
