import { singleContractDetailTabsDataDynamic } from './SingleContractDetailsTabs.data';
import { Skeleton } from '@mui/material';
import { PermissionsTabs } from '@/components/Tabs/PermissionsTabs';

export const SingleContractDetailsTabs = (props: any) => {
  const { apiStatus, data } = props;

  if (apiStatus?.isLoading || apiStatus?.isFetching) return <Skeleton />;

  const singleContractDetailTabsData = singleContractDetailTabsDataDynamic?.(
    data?.data?.contractType,
  );

  return (
    <PermissionsTabs
      hasNoPermissions
      tabsDataArray={singleContractDetailTabsData}
    />
  );
};
