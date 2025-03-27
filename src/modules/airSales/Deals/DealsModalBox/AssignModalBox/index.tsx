import { Grid, Skeleton } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { RestoreModalData } from './RestoreAssign.data';
import useRestoreAssign from './useRestoreAssign';
import { AssignModalBoxProps } from '../DealsModalBox-interface';
import CommonModal from '@/components/CommonModal';

const AssignModalBox = ({
  open,
  onClose,
  seletedId,
  setSelectedRows,
}: AssignModalBoxProps) => {
  const { handleSubmit, onSubmit, methods, loadingUpdateOwner, isLoading } =
    useRestoreAssign(seletedId, onClose, setSelectedRows);

  return (
    <CommonModal
      title="Assign"
      open={open}
      handleClose={onClose}
      handleCancel={onClose}
      handleSubmit={handleSubmit(onSubmit)}
      okText="Update"
      cancelText="Cancel"
      footer
      isLoading={loadingUpdateOwner}
    >
      {' '}
      <FormProvider methods={methods}>
        <Grid container spacing={2}>
          {RestoreModalData()?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={item?.componentProps?.name}>
              {isLoading ? (
                <>
                  <Skeleton />
                  <Skeleton />
                </>
              ) : (
                <item.component {...item.componentProps} size={'small'} />
              )}
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </CommonModal>
  );
};

export default AssignModalBox;
