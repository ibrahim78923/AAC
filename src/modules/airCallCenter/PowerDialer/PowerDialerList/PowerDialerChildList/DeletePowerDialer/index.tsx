import CancelIcon from '@mui/icons-material/Cancel';
import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { useDeletePowerDialer } from './useDeletePowerDialer';
export const DeletePowerDialerItem = (props: any) => {
  const {
    setOpenDeleteModal,
    openDeleteModal,
    closePowerDialerDeleteModal,
    deletePowerDialer,
  } = useDeletePowerDialer(props);
  return (
    <>
      <CancelIcon
        sx={{ color: 'error.main', cursor: 'pointer' }}
        onClick={() => setOpenDeleteModal(true)}
      />
      <AlertModals
        message={'Are you sure you want to delete this ?'}
        type={ALERT_MODALS_TYPE?.DELETE}
        open={openDeleteModal}
        loading={false}
        handleClose={closePowerDialerDeleteModal}
        handleSubmitBtn={deletePowerDialer}
      />
    </>
  );
};
