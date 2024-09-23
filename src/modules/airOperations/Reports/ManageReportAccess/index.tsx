import { FormProvider } from '@/components/ReactHookForm';
import { Grid } from '@mui/material';
import { useManageReportAccess } from './useManageReportAccess';
import { ReactHookFormFieldsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';

export const ManageReportAccess = () => {
  const {
    methods,
    handleSubmit,
    submitMangeAccessForm,
    closeModal,
    manageReportAccessFromFields,
    manageReportAccessStatus,
    isPortalOpen,
  }: any = useManageReportAccess();

  return (
    <CustomCommonDialog
      isPortalOpen={isPortalOpen?.isOpen}
      closePortal={closeModal}
      dialogTitle="Manage Access"
      submitButtonText="Apply"
      showSubmitLoader={manageReportAccessStatus?.isLoading}
      disabledCancelButton={manageReportAccessStatus?.isLoading}
      handleSubmitButton={handleSubmit(submitMangeAccessForm)}
    >
      <FormProvider methods={methods}>
        <Grid container spacing={2}>
          {manageReportAccessFromFields?.map((item: ReactHookFormFieldsI) => (
            <Grid item xs={12} key={item?.id}>
              <item.component {...item?.componentProps} size={'small'} />
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </CustomCommonDialog>
  );
};
