import { PageTitledHeader } from '@/components/PageTitledHeader';
import { PermissionsTabs } from '@/components/Tabs/PermissionsTabs';
import { NextRouter, useRouter } from 'next/router';
import { catalogApprovalsTabsDataDynamic } from './Approvals.data';
import { AIR_CUSTOMER_PORTAL } from '@/constants/routes';

const Approvals = () => {
  const router: NextRouter = useRouter();
  const catalogApprovalsTabsData = catalogApprovalsTabsDataDynamic?.();

  return (
    <>
      <PageTitledHeader
        title="Approvals"
        canMovedBack
        moveBack={() => {
          router?.push({
            pathname: AIR_CUSTOMER_PORTAL?.CUSTOMER_PORTAL_DASHBOARD,
            query: { ...router?.query },
          });
        }}
      />
      <PermissionsTabs spacing={0.3} tabsDataArray={catalogApprovalsTabsData} />
    </>
  );
};

export default Approvals;
