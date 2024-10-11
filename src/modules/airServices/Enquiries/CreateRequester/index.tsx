import { AlertModals } from '@/components/AlertModals';
import useCreateRequester from './useCreateRequester';
import { IChildModalState } from '../Enquiries.interface';

export const CreateRequester = ({ isModalOpen, onClose }: IChildModalState) => {
  const { handleCreateRequester, postRequesterStatus } = useCreateRequester({
    isModalOpen,
    onClose,
  });

  return (
    <AlertModals
      type="Create Requester"
      message="Are you sure you want to convert this user into a Requester?"
      open={isModalOpen?.createRequester}
      handleClose={() => onClose?.()}
      handleSubmitBtn={handleCreateRequester}
      loading={postRequesterStatus?.isLoading}
      disableCancelBtn={postRequesterStatus?.isLoading}
    />
  );
};
export default CreateRequester;
