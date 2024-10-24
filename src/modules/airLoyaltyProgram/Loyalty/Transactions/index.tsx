import { PageTitledHeader } from '@/components/PageTitledHeader';
import { PermissionsTabs } from '@/components/Tabs/PermissionsTabs';
import { transactionsTabsData } from './Transactions.data';

export const Transactions = () => {
  return (
    <>
      <PageTitledHeader title={'Transactions'} />
      <PermissionsTabs tabsDataArray={transactionsTabsData} />
    </>
  );
};
