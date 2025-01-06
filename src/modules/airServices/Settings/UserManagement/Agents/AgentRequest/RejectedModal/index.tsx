import { FormProvider } from '@/components/ReactHookForm';
import { Grid } from '@mui/material';
import { rejectedModalField } from './RejectedModal.data';
import { useRejectedModal } from './useRejectedModal';
import { IAgentsProps } from '../../Agents.interface';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';

const RejectedModal = (props: IAgentsProps) => {
  const { openRejectedModal } = props;
  const {
    handleCloseModal,
    onSubmit,
    methods,
    patchRejectRequestStatus,
    handleSubmit,
  } = useRejectedModal(props);

  return (
    <>
      <CustomCommonDialog
        isPortalOpen={openRejectedModal}
        closePortal={handleCloseModal}
        dialogTitle="Rejected"
        submitButtonText="Submit"
        showSubmitLoader={patchRejectRequestStatus?.isLoading}
        disabledCancelButton={patchRejectRequestStatus?.isLoading}
        handleSubmitButton={handleSubmit?.(onSubmit)}
      >
        <FormProvider methods={methods}>
          <Grid container spacing={1}>
            {rejectedModalField?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={item?.id}>
                <item.component {...item?.componentProps} size={'small'} />
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </CustomCommonDialog>
    </>
  );
};

export default RejectedModal;
