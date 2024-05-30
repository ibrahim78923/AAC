import { PageTitledHeader } from '@/components/PageTitledHeader';
import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { User } from './User';

export const UserManagement = () => {
  return (
    <>
      <PageTitledHeader title="User Management" />
      <HorizontalTabs tabsDataArray={['User']}>
        <User />
      </HorizontalTabs>
    </>
  );
};
