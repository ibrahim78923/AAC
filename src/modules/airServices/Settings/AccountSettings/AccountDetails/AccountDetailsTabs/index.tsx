import { getAccountDetailsTabsData } from './AccountDetailsTabs.data';
import {
  IProfileDetail,
  IPropsAccountDetails,
} from '../AccountDetails.interface';
import { PermissionsTabs } from '@/components/Tabs/PermissionsTabs';

export const AccountDetailsTabs = (props: IPropsAccountDetails) => {
  const { profileDetail } = props;

  const accountDetailsTabsData = getAccountDetailsTabsData(
    profileDetail as IProfileDetail,
  );

  return <PermissionsTabs tabsDataArray={accountDetailsTabsData} />;
};
