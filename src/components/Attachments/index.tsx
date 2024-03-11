import { Grid } from '@mui/material';
import { AttachFileCard } from '@/components/AttachFileCard';
import { AlertModals } from '@/components/AlertModals';
import { useAttachments } from './useAttachments';
import SkeletonForm from '../Skeletons/SkeletonForm';
import ApiErrorState from '../ApiErrorState';
import NoData from '../NoData';

export const Attachments = (props: any) => {
  const { permissionKey } = props;
  const {
    deleteModal,
    setDeleteModal,
    deleteAttachmentSubmit,
    deleteAttachmentStatus,
    data,
    isFetching,
    isLoading,
    isError,
  } = useAttachments(props);

  if (isLoading || isFetching) return <SkeletonForm />;

  if (isError) return <ApiErrorState height="100%" />;

  return (
    <>
      <Grid container spacing={2}>
        {!!data?.data?.length ? (
          data?.data?.map((singleAttachment: any) => (
            <Grid item xs={12} sm={6} lg={4} key={singleAttachment?._id}>
              <AttachFileCard
                data={singleAttachment}
                onDelete={() =>
                  setDeleteModal({ open: true, id: singleAttachment?._id })
                }
                permissionKey={permissionKey}
              />
            </Grid>
          ))
        ) : (
          <NoData message="No attachments found" height="100%" />
        )}
        <AlertModals
          message={'Are you sure you want to delete?'}
          type={'delete'}
          open={deleteModal?.open}
          handleClose={() => setDeleteModal({ open: false, id: '' })}
          handleSubmitBtn={() => deleteAttachmentSubmit?.()}
          loading={deleteAttachmentStatus?.isLoading}
          disableCancelBtn={deleteAttachmentStatus?.isLoading}
        />
      </Grid>
    </>
  );
};
