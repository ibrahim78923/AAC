import { PageTitledHeader } from '@/components/PageTitledHeader';
import { User } from '../User';

const UserManagement = () => {
  return (
    <>
      <PageTitledHeader title="User Management" />
      <User />
    </>
  );
};

export default UserManagement;
