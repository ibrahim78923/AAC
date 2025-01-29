import { Box, Button, Grid } from '@mui/material';
import { AttachFileCard } from '@/components/AttachFileCard';
import { AlertModals } from '@/components/AlertModals';
import { useAttachments } from './useAttachments';
import SkeletonForm from '../Skeletons/SkeletonForm';
import ApiErrorState from '../ApiErrorState';
import NoData from '../NoData';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { AttachmentsPropsI } from './Attachments.interface';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export const Attachments = (props: AttachmentsPropsI) => {
  const {
    permissionKey,
    size,
    colSpan,
    canAttachFile = false,
    attachFileHandler,
    children = <NoData message="No attachments found" height="100%" />,
    hasStyling = true,
    canDelete = true,
    hasNoDeletePermission = false,
  } = props;

  const {
    deleteModal,
    setDeleteModal,
    deleteAttachmentSubmit,
    deleteAttachmentStatus,
    data,
    isFetching,
    isLoading,
    isError,
  }: any = useAttachments(props);

  if (isLoading || isFetching) return <SkeletonForm />;

  if (isError) return <ApiErrorState height="100%" />;

  return (
    <>
      {!!data?.data?.length ? (
        <>
          {canAttachFile && (
            <Box mb={2} textAlign={'end'}>
              <Button
                variant="outlined"
                className="small"
                onClick={() => attachFileHandler?.()}
                startIcon={<AddCircleIcon />}
              >
                Attach Files
              </Button>
            </Box>
          )}
          <Grid container spacing={2}>
            {data?.data?.map((singleAttachment: any) => (
              <Grid
                item
                xs={12}
                sm={colSpan?.sm ?? 6}
                lg={colSpan?.lg ?? 4}
                key={singleAttachment?._id}
              >
                <AttachFileCard
                  size={size}
                  data={singleAttachment}
                  onDelete={() =>
                    setDeleteModal({ open: true, id: singleAttachment?._id })
                  }
                  permissionKey={permissionKey}
                  hasNoDeletePermission={hasNoDeletePermission}
                  hasStyling={hasStyling}
                  canDelete={canDelete}
                />
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        children
      )}
      {deleteModal?.open && (
        <AlertModals
          message={'Are you sure you want to delete attachment file?'}
          type={ALERT_MODALS_TYPE?.DELETE}
          open={deleteModal?.open}
          handleClose={() => setDeleteModal({ open: false, id: '' })}
          handleSubmitBtn={() => deleteAttachmentSubmit?.()}
          loading={deleteAttachmentStatus?.isLoading}
          disableCancelBtn={deleteAttachmentStatus?.isLoading}
        />
      )}
    </>
  );
};
