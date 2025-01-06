import { Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import useChangeStatus from './useChangeStatus';
import { changeStatusData } from './ChangeStatus.data';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';

export const ChangeStatus = (props: any) => {
  const { openStatus } = props;

  const {
    methods,
    handleSubmit,
    onSubmit,
    patchServiceCatalogTriggerStatus,
    handleClose,
  } = useChangeStatus(props);

  return (
    <CustomCommonDialog
      isPortalOpen={openStatus}
      onClose={handleClose}
      dialogTitle={'Change Status'}
      closePortal={handleClose}
      handleCancelButton={handleClose}
      disabledCancelButton={patchServiceCatalogTriggerStatus?.isLoading}
      handleSubmitButton={handleSubmit(onSubmit)}
      showSubmitLoader={patchServiceCatalogTriggerStatus?.isLoading}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {changeStatusData?.map((item: any) => (
            <Grid item xs={12} key={item?.id}>
              <item.component {...item?.componentProps} size={'small'} />
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </CustomCommonDialog>
  );
};
