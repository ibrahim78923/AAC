import { TransactionPoints } from './TransactionPoints';
import { TransactionRewards } from './TransactionRewards';
import { TransactionVouchers } from './TransactionVouchers';

export const transactionsTabsData = [
  {
    _id: 1,
    id: 'rewards',
    name: 'Rewards',
    componentProps: {},
    hasNoPermissions: true,
    tabPermissions: [],
    component: TransactionRewards,
  },
  {
    _id: 2,
    id: 'vouchers',
    name: 'Vouchers',
    componentProps: {},
    hasNoPermissions: true,
    tabPermissions: [],
    component: TransactionVouchers,
  },
  {
    _id: 3,
    id: 'points',
    name: 'Points',
    componentProps: {},
    hasNoPermissions: true,
    tabPermissions: [],
    component: TransactionPoints,
  },
];

export const transactionSelectedTabsData: { [key: number]: string } = {
  0: 'rewards',
  1: 'vouchers',
  2: 'points',
};
