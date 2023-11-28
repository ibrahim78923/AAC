import { Header } from './Header';
import { PopularArticles } from './PopularArticles';

export const articlesData = [
  'Expense Reimbursement Policy',
  'Expense Reimbursement Policy',
  'Expense Reimbursement Policy',
  'Expense Reimbursement Policy',
  'Expense Reimbursement Policy',
  'Expense Reimbursement Policy',
  'Expense Reimbursement Policy',
  'Expense Reimbursement Policy',
];

export const nonRegisterDashboardwidgets = (handleViewMore: any) => [
  {
    component: Header,
  },
  {
    component: PopularArticles,
    title: 'Popular Articles',
    articlesData,
    handleViewMore,
    componentProps: {
      lg: 12,
    },
  },
];
