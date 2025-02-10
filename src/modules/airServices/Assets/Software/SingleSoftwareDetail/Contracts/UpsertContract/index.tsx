import { FormProvider, RHFDropZone } from '@/components/ReactHookForm';
import { useUpsertContract } from './useUpsertContract';
import { Box } from '@mui/material';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { uploadFileMaxSize } from '@/utils/avatarUtils';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { ACCEPT_FILE_EXTENSIONS } from '@/constants/file';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';
import { CustomGrid } from '@/components/Grids/CustomGrid';
import { HeadingFormGrid } from '@/components/Grids/HeadingFormGrid';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';
import { ActionsLoadingButton } from '@/components/Buttons/ActionsLoadingButton';

export const UpsertContract = () => {
  const {
    methods,
    handleSubmit,
    submitUpsertContractForm,
    upsertContractFormFieldsData,
    handleCancelBtn,
    postContractStatus,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useUpsertContract();

  return (
    <>
      <PageTitledHeader
        moveBack={handleCancelBtn}
        canMovedBack
        title={'Add Contract'}
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
                  />
                </Box>
              </CustomGrid>

              <CustomGrid md={4}>
                <RHFDropZone
                  name="attachFile"
                  fullWidth={true}
                  fileType={`PNG, JPG and PDF (max ${uploadFileMaxSize} MB)`}
                  accept={{
                    'image/png': ACCEPT_FILE_EXTENSIONS?.PNG,
                    'image/jpeg': ACCEPT_FILE_EXTENSIONS?.JPEG,
                    'application/pdf': ACCEPT_FILE_EXTENSIONS?.PDF,
                  }}
                />
              </CustomGrid>
            </ContainerGrid>
          </Box>

          <br />
          <ContainerGrid>
            <CustomGrid md={8}>
              <ActionsLoadingButton
                submitButtonText={GENERIC_UPSERT_FORM_CONSTANT?.SAVE}
                showSubmitLoader={postContractStatus?.isLoading}
                handleCancelButton={handleCancelBtn}
              />
            </CustomGrid>
          </ContainerGrid>
        </FormProvider>
      </ApiRequestFlow>
    </>
  );
};
