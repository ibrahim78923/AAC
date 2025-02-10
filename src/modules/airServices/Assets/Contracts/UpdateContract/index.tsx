import { Typography, Box } from '@mui/material';
import { FormProvider, RHFDropZone } from '@/components/ReactHookForm';
import { useUpdateContract } from './useUpdateContract';
import { Attachments } from '@/components/Attachments';
import { AIR_SERVICES_ASSETS_CONTRACTS_PERMISSIONS } from '@/constants/permission-keys';
import { uploadFileMaxSize } from '@/utils/avatarUtils';
import { ACCEPT_FILE_EXTENSIONS } from '@/constants/file';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { CustomGrid } from '@/components/Grids/CustomGrid';
import { HeadingFormGrid } from '@/components/Grids/HeadingFormGrid';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';
import { ActionsLoadingButton } from '@/components/Buttons/ActionsLoadingButton';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';

export const UpdateContract = () => {
  const {
    methods,
    handleSubmit,
    submitUpdateContractForm,
    theme,
    handleCancelBtn,
    updateContractFormFields,
    contractId,
    showLoader,
    apiCallInProgress,
    isError,
    refetch,
    actionRenewExtend,
  } = useUpdateContract();

  return (
    <ApiRequestFlow
      showSkeleton={showLoader}
      hasError={isError}
      refreshApi={refetch}
    >
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit?.(submitUpdateContractForm)}
      >
        <Box
          sx={{
            border: {
              xs: `2px solid ${theme?.palette?.custom?.off_white_three}`,
              md: 'none',
            },
            borderRadius: { xs: 3, md: 0 },
            padding: { md: 0, xs: 2 },
          }}
        >
          <ContainerGrid>
            <CustomGrid md={8}>
              <Box
                sx={{
                  border: {
                    md: `2px solid ${theme?.palette?.custom?.off_white_three}`,
                    xs: 'none',
                  },
                  borderRadius: { md: 2, xs: 0 },
                  padding: { md: 1.5, xs: 0 },
                  minHeight: { md: '70vh' },
                }}
              >
                <PageTitledHeader
                  title={`${actionRenewExtend} Contract`}
                  canMovedBack
                  isTitleCapital
                  moveBack={handleCancelBtn}
                />
                <HeadingFormGrid formFieldsList={updateContractFormFields} />
              </Box>
            </CustomGrid>
            <CustomGrid md={4}>
              <RHFDropZone
                name="attachment"
                fullWidth={true}
                fileType={`PNG, JPG and PDF (max ${uploadFileMaxSize} MB)`}
                accept={{
                  'image/png': ACCEPT_FILE_EXTENSIONS?.PNG,
                  'image/jpeg': ACCEPT_FILE_EXTENSIONS?.JPEG,
                  'application/pdf': ACCEPT_FILE_EXTENSIONS?.PDF,
                }}
              />
              <br />
              {!!contractId && (
                <>
                  <Typography
                    variant="body1"
                    fontWeight={500}
                    color="slateBlue.main"
                    mb={2}
                  >
                    Attachments
                  </Typography>
                  <Box>
                    <Attachments
                      recordId={contractId}
                      permissionKey={[
                        AIR_SERVICES_ASSETS_CONTRACTS_PERMISSIONS?.VIEW_TASK_DETAILS,
                      ]}
                      colSpan={{ sm: 12, lg: 12 }}
                    />
                  </Box>
                </>
              )}
            </CustomGrid>
          </ContainerGrid>
        </Box>

        <br />
        <ContainerGrid>
          <CustomGrid md={8}>
            <ActionsLoadingButton
              submitButtonText={actionRenewExtend}
              showSubmitLoader={apiCallInProgress}
              handleCancelButton={handleCancelBtn}
            />
          </CustomGrid>
        </ContainerGrid>
      </FormProvider>
    </ApiRequestFlow>
  );
};
