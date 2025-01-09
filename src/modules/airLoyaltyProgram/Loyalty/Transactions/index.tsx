import { PageTitledHeader } from '@/components/PageTitledHeader';
import { PermissionsTabs } from '@/components/Tabs/PermissionsTabs';
import {
  transactionSelectedTabsData,
  transactionsTabsData,
} from './Transactions.data';
import { useRouter } from 'next/router';
import { AIR_LOYALTY_PROGRAM } from '@/constants/routes';

export const Transactions = () => {
  const router = useRouter();
  return (
    <>
      <PageTitledHeader title={'Transactions'} />
      <PermissionsTabs
        tabsDataArray={transactionsTabsData}
        defaultValue={
          router?.query?.tab
            ? Object?.values(transactionSelectedTabsData)?.indexOf(
                router?.query?.tab as string,
              )
            : 0
        }
        handleTabChange={(tab: number) => {
          router?.push({
            pathname: AIR_LOYALTY_PROGRAM?.LOYALTY_TRANSACTION,
            query: { tab: transactionSelectedTabsData[tab] },
          });
        }}
      />
    </>
  );
};
