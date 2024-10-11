import { PageTitledHeader } from '@/components/PageTitledHeader';
import { User } from '../User';

export const UserManagement = () => {
  return (
    <>
      <PageTitledHeader title="User Management" />
      <User />
    </>
  );
};
