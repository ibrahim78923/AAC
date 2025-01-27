import { FormProvider, RHFDropZone } from '@/components/ReactHookForm';
import { useUpsertContract } from './useUpsertContract';
import { Box, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Attachments } from '@/components/Attachments';
import { AIR_SERVICES_ASSETS_CONTRACTS_PERMISSIONS } from '@/constants/permission-keys';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { uploadFileMaxSize } from '@/utils/avatarUtils';
import { ACCEPT_FILE_EXTENSIONS } from '@/constants/file';
import { CustomGrid } from '@/components/Grids/CustomGrid';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';
import { HeadingFormGrid } from '@/components/Grids/HeadingFormGrid';
import { DynamicForm } from '@/components/DynamicForm';
import { CustomLinearProgress } from '@/components/ProgressBars/CustomLinearProgress';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';

export const UpsertContract = () => {
  const {
    methods,
    handleSubmit,
    submitUpsertContractForm,
    upsertContractFormFieldsData,
    handleCancelBtn,
    isLoading,
    isFetching,
    isError,
    contractId,
    form,
    getDynamicFieldsStatus,
    watchForContractType,
    refetch,
    apiCallInProgress,
  } = useUpsertContract();

  return (
    <>
      <PageTitledHeader
        moveBack={() => handleCancelBtn?.()}
        canMovedBack
        title={`${
          !!contractId
            ? GENERIC_UPSERT_FORM_CONSTANT?.EDIT
            : GENERIC_UPSERT_FORM_CONSTANT?.ADD
        } Contract`}
      />
      <ApiRequestFlow
        showSkeleton={isLoading || isFetching}
        hasError={isError}
        refreshApi={refetch}
      >
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit?.(submitUpsertContractForm)}
        >
          <Box
            sx={{
              border: {
                xs: `2px solid `,
                md: 'none',
              },
              borderColor: {
                xs: `custom.off_white_three`,
                md: 'none',
              },
              borderRadius: { xs: 2, md: 0 },
              padding: { md: 0, xs: 2 },
            }}
          >
            <ContainerGrid>
              <CustomGrid md={8}>
                <Box
                  sx={{
                    border: {
                      md: `2px solid `,
                      xs: 'none',
                    },
                    borderColor: {
                      md: `custom.off_white_three`,
                      xs: 'none',
                    },
                    borderRadius: { md: 2, xs: 0 },
                    padding: { md: 1.5, xs: 0 },
                  }}
                >
                  <HeadingFormGrid
                    formFieldsList={upsertContractFormFieldsData}
                  >
                    {getDynamicFieldsStatus?.isLoading ||
                    getDynamicFieldsStatus?.isFetching ? (
                      <CustomGrid>
                        <CustomLinearProgress width="100%" />
                      </CustomGrid>
                    ) : (
                      <>
                        {!!form?.length && (
                          <CustomGrid>
                            <Typography
                              variant={'h4'}
                              textTransform={'capitalize'}
                            >
                              {watchForContractType?.name} Properties
                            </Typography>
                          </CustomGrid>
                        )}
                        <DynamicForm dynamicFormFieldsList={form} />
                      </>
                    )}
                  </HeadingFormGrid>
                </Box>
              </CustomGrid>
              <CustomGrid md={4}>
                <RHFDropZone
                  name="attachFile"
                  fullWidth
                  fileType={`PNG, JPG and PDF (max ${uploadFileMaxSize} MB)`}
                  accept={{
                    'image/png': ACCEPT_FILE_EXTENSIONS?.PNG,
                    'image/jpeg': ACCEPT_FILE_EXTENSIONS?.JPEG,
                    'application/pdf': ACCEPT_FILE_EXTENSIONS?.PDF,
                  }}
                />
                {!!contractId && (
                  <>
                    <Typography
                      variant="body1"
                      fontWeight={500}
                      color="slateBlue.main"
                      my={2}
                    >
                      Attachments
                    </Typography>
                    <Box maxHeight={'20vh'}>
                      <Attachments
                        recordId={contractId}
                        permissionKey={[
                          AIR_SERVICES_ASSETS_CONTRACTS_PERMISSIONS?.ADD_CONTRACT,
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
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: 2,
                }}
              >
                <LoadingButton
                  className="small"
                  variant="outlined"
                  type="button"
                  color="secondary"
                  onClick={() => handleCancelBtn?.()}
                  disabled={apiCallInProgress}
                >
                  Cancel
                </LoadingButton>
                <LoadingButton
                  className="small"
                  loading={apiCallInProgress}
                  variant="contained"
                  type="submit"
                >
                  {!!contractId
                    ? GENERIC_UPSERT_FORM_CONSTANT?.UPDATE
                    : GENERIC_UPSERT_FORM_CONSTANT?.SAVE}
                </LoadingButton>
              </Box>
            </CustomGrid>
          </ContainerGrid>
        </FormProvider>
      </ApiRequestFlow>
    </>
  );
};
