import { PageTitledHeader } from '@/components/PageTitledHeader';
import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { TransactionRewards } from './TransactionRewards';
import { TransactionVouchers } from './TransactionVouchers';
import { TransactionPoints } from './TransactionPoints';

export const Transactions = () => {
  const transactionsTabsData = ['Rewards', 'Vouchers', 'Points'];
  return (
    <>
      <PageTitledHeader title={'Transactions'} />
      <HorizontalTabs tabsDataArray={transactionsTabsData}>
        <TransactionRewards />
        <TransactionVouchers />
        <TransactionPoints />
      </HorizontalTabs>
    </>
  );
};
