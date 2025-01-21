import { Typography, Box } from '@mui/material';
import { FormProvider, RHFDropZone } from '@/components/ReactHookForm';
import { useUpdateContract } from './useUpdateContract';
import { LoadingButton } from '@mui/lab';
import { Attachments } from '@/components/Attachments';
import { AIR_SERVICES_ASSETS_CONTRACTS_PERMISSIONS } from '@/constants/permission-keys';
import { AIR_SERVICES } from '@/constants/routes';
import { uploadFileMaxSize } from '@/utils/avatarUtils';
import { ACCEPT_FILE_EXTENSIONS } from '@/constants/file';
import { FormGrid } from '@/components/Grids/FormGrid';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { CustomGrid } from '@/components/Grids/CustomGrid';

export const UpdateContract = () => {
  const {
    methods,
    handleSubmit,
    submitUpdateContractForm,
    router,
    theme,
    handleCancelBtn,
    updateContractFormFields,
    contractId,
    patchAddToContractStatus,
  } = useUpdateContract();

  return (
    <>
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
            padding: { md: 0, xs: 1.5 },
          }}
        >
          <CustomGrid isContainer>
            <CustomGrid xs={12} md={8}>
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
                  title={`${router?.query?.action} Contract`}
                  canMovedBack
                  isTitleCapital
                  moveBack={() => router?.push(AIR_SERVICES?.ASSETS_CONTRACTS)}
                />
                <FormGrid
                  formFieldsList={updateContractFormFields}
                  hasHeading
                />
              </Box>
            </CustomGrid>
            <CustomGrid xs={12} md={4}>
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
                  <Box maxHeight={'20vh'}>
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
          </CustomGrid>
        </Box>

        <br />
        <CustomGrid isContainer>
          <CustomGrid xs={12} md={8}>
            <Box
              display={'flex'}
              gap={2}
              alignItems={'center'}
              justifyContent={'flex-end'}
            >
              <LoadingButton
                className="small"
                variant="outlined"
                type="button"
                color="secondary"
                onClick={() => handleCancelBtn?.()}
                disabled={patchAddToContractStatus?.isLoading}
              >
                Cancel
              </LoadingButton>
              <LoadingButton
                className="small"
                variant="contained"
                type="submit"
                loading={patchAddToContractStatus?.isLoading}
              >
                {`${router?.query?.action}`}
              </LoadingButton>
            </Box>
          </CustomGrid>
        </CustomGrid>
      </FormProvider>
    </>
  );
};
