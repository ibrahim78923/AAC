import { FormProvider, RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { useRequestApprovalForm } from './useRequestApprovalForm';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';

export const RequestApprovalForm = (props: any) => {
  const {
    openDialog,
    setOpenDialog,
    methods,
    handleSubmit,
    onSubmit,
    postRequestApprovalStatus,
    apiQueryAgents,
    productId,
  } = useRequestApprovalForm(props);

  return (
    <CustomCommonDialog
      isPortalOpen={openDialog}
      closePortal={() => setOpenDialog(false)}
      dialogTitle="Request Approval"
      showSubmitLoader={postRequestApprovalStatus?.isLoading}
      disabledCancelButton={postRequestApprovalStatus?.isLoading}
      handleSubmitButton={handleSubmit(onSubmit)}
      submitButtonText="Request"
    >
      <FormProvider methods={methods}>
        <RHFAutocompleteAsync
          name="approvers"
          size="small"
          placeholder="Select a User"
          label="Approvers"
          apiQuery={apiQueryAgents}
          getOptionLabel={(option: any) =>
            `${option?.firstName} ${option?.lastName}`
          }
          required
          externalParams={{ productId, admin: true }}
        />
      </FormProvider>
    </CustomCommonDialog>
  );
};
