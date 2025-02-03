import { AlertModals } from '@/components/AlertModals';
import { useDeallocateContract } from './useDeallocateContract';

export const DeallocateContract = (props: any) => {
  const { isPortalOpen } = props;
  const { handleUserDeallocation, closeModal, isLoading } =
    useDeallocateContract(props);

  return (
    <AlertModals
      type="Deallocate Contract"
      message="Are you sure want to Deallocate Contract for this user?"
      open={isPortalOpen?.isOpen as boolean}
      handleClose={closeModal}
      handleSubmitBtn={handleUserDeallocation}
      loading={isLoading}
      disableCancelBtn={isLoading}
    />
  );
};
