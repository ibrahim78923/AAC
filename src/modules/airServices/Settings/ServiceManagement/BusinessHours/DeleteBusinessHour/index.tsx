import { MenuItem } from '@mui/material';
import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { useDeleteBusinessHour } from './useDeleteBusinessHour';
export const DeleteBusinessHour = (props: any) => {
  const {
    setOpenBusinessHour,
    openBusinessHour,
    closeBusinessHourDeleteModal,
    deleteBusinessHour,
    isLoading,
  } = useDeleteBusinessHour(props);
  return (
    <>
      <MenuItem sx={{ pr: 5 }} onClick={() => setOpenBusinessHour(true)}>
        Delete
      </MenuItem>
      <AlertModals
        message={'Are you sure you want to delete this Business Hour?'}
        type={ALERT_MODALS_TYPE?.DELETE}
        open={openBusinessHour}
        handleClose={closeBusinessHourDeleteModal}
        handleSubmitBtn={deleteBusinessHour}
        loading={isLoading}
      />
    </>
  );
};
