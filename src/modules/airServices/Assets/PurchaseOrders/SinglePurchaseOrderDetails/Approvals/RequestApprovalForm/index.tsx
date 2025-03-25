import { FormProvider, RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { useRequestApprovalForm } from './useRequestApprovalForm';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';
import { Box, Typography } from '@mui/material';
import { ROLES } from '@/constants/strings';

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
          renderOption={(option: any) => (
            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'space-between'}
              width={'100%'}
            >
              <Box>
                <Typography
                  variant={'body2'}
                  color={'grey.600'}
                  fontWeight={'fontWeightSmall'}
                >
                  {option?.firstName} {option?.lastName}
                </Typography>
                {option?.role !== ROLES?.ORG_REQUESTER && (
                  <Typography variant={'body4'} color={'grey.900'}>
                    {option?.timezone}
                  </Typography>
                )}
              </Box>
            </Box>
          )}
        />
      </FormProvider>
    </CustomCommonDialog>
  );
};
