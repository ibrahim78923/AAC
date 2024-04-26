import {
  transactionsColumns,
  transactionsData,
} from './DashboardTransaction.data';

const useDashboardTransaction = () => {
  const contentHeight = 310;

  return {
    transactionsColumns,
    transactionsData,
    contentHeight,
  };
};

export default useDashboardTransaction;
