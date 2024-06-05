import CancelIcon from '@mui/icons-material/Cancel';
import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { useDeleteCallTag } from './useDeleteCallTag';
export const DeleteCallTag = (props: any) => {
  const {
    setOpenDeleteModal,
    openDeleteModal,
    closeMessageDeleteModal,
    deleteCallTag,
  } = useDeleteCallTag(props);
  return (
    <>
      <CancelIcon
        sx={{ color: 'error.main', cursor: 'pointer' }}
        onClick={() => setOpenDeleteModal(true)}
      />
      <AlertModals
        message={'Are you sure you want to delete call tag?'}
        type={ALERT_MODALS_TYPE?.DELETE}
        open={openDeleteModal}
        loading={false}
        handleClose={closeMessageDeleteModal}
        handleSubmitBtn={deleteCallTag}
      />
    </>
  );
};
