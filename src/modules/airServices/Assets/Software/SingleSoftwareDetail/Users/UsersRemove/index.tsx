import { AlertModals } from '@/components/AlertModals';
import { useUsersRemove } from './useUsersRemove';

const UsersRemove = (props: any) => {
  const { isPortalOpen } = props;
  const { handleUserRemove, closeModal, isLoading } = useUsersRemove(props);

  return (
    <AlertModals
      type="Deallocate Contract"
      message="Are you sure want to Remove this user?"
      open={isPortalOpen?.isOpen as boolean}
      handleClose={closeModal}
      handleSubmitBtn={handleUserRemove}
      loading={isLoading}
      disableCancelBtn={isLoading}
    />
  );
};

export default UsersRemove;
