import CancelIcon from '@mui/icons-material/Cancel';
import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { useDeleteMessage } from './useDeleteMessage';
export const DeleteMessage = (props: any) => {
  const {
    setOpenDeleteModal,
    openDeleteModal,
    closeMessageDeleteModal,
    deleteMessage,
  } = useDeleteMessage(props);
  return (
    <>
      <CancelIcon
        sx={{ color: 'error.main', cursor: 'pointer' }}
        onClick={() => setOpenDeleteModal(true)}
      />
      <AlertModals
        message={'Are you sure you want to delete the record?'}
        type={ALERT_MODALS_TYPE?.DELETE}
        open={openDeleteModal}
        loading={false}
        handleClose={closeMessageDeleteModal}
        handleSubmitBtn={deleteMessage}
      />
    </>
  );
};
