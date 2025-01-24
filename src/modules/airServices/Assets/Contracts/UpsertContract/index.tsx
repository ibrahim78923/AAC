import { FormProvider, RHFDropZone } from '@/components/ReactHookForm';
import { useUpsertContract } from './useUpsertContract';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Attachments } from '@/components/Attachments';
import { AIR_SERVICES_ASSETS_CONTRACTS_PERMISSIONS } from '@/constants/permission-keys';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { componentMap } from '@/utils/dynamic-forms';
import { createElement } from 'react';
import { uploadFileMaxSize } from '@/utils/avatarUtils';
import { ACCEPT_FILE_EXTENSIONS } from '@/constants/file';
import { CustomGrid } from '@/components/Grids/CustomGrid';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';

export const UpsertContract = () => {
  const {
    methods,
    handleSubmit,
    submitUpsertContractForm,
    theme,
    upsertContractFormFieldsData,
    handleCancelBtn,
    postContractStatus,
    putContractStatus,
    isLoading,
    isFetching,
    isError,
    contractId,
    form,
    getDynamicFieldsStatus,
    postAttachmentStatus,
    watchForContractType,
    refetch,
  } = useUpsertContract();

  return (
    <ApiRequestFlow
      showSkeleton={isLoading || isFetching}
      hasError={isError}
      refreshApi={refetch}
    >
      <PageTitledHeader
        moveBack={() => handleCancelBtn?.()}
        canMovedBack
        title={!!contractId ? 'Edit Contract' : 'Add Contract'}
      />
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit?.(submitUpsertContractForm)}
      >
        <Box
          sx={{
            border: {
              xs: `2px solid ${theme?.palette?.custom?.off_white_three}`,
              md: 'none',
            },
            borderRadius: { xs: 3, md: 0 },
            padding: { md: 1.5, xs: 0 },
          }}
        >
          <ContainerGrid>
            <CustomGrid xs={12} md={8}>
              <Box
                sx={{
                  border: {
                    md: `2px solid ${theme?.palette?.custom?.off_white_three}`,
                    xs: 'none',
                  },
                  borderRadius: { md: 2, xs: 0 },
                  padding: { md: 1.5, xs: 0 },
                }}
              >
                <Grid container spacing={3}>
                  {upsertContractFormFieldsData?.map((item: any) => (
                    <Grid item xs={12} lg={item?.md} key={item?.id}>
                      <item.component
                        {...item?.componentProps}
                        size={'small'}
                        disabled={item?.componentProps?.disabled ?? isError}
                        contractId={contractId}
                        watchForContractType={watchForContractType}
                      >
                        {item?.heading ? item?.heading : null}
                      </item.component>
                    </Grid>
                  ))}
                  {getDynamicFieldsStatus?.isLoading ||
                  getDynamicFieldsStatus?.isFetching ? (
                    <Grid item xs={12} textAlign={'center'}>
                      <CircularProgress />
                    </Grid>
                  ) : (
                    <>
                      {!!form?.length && (
                        <Grid item xs={12}>
                          <Typography
                            variant={'h4'}
                            textTransform={'capitalize'}
                          >
                            {watchForContractType?.name} Properties
                          </Typography>
                        </Grid>
                      )}
                      {form?.map((item: any) => (
                        <Grid item xs={12} key={item?.id}>
                          {componentMap[item?.component] &&
                            createElement(componentMap[item?.component], {
                              ...item?.componentProps,
                              name: item?.componentProps?.label,
                              size: 'small',
                            })}
                        </Grid>
                      ))}
                    </>
                  )}
                </Grid>
              </Box>
            </CustomGrid>
            <CustomGrid
              xs={12}
              md={4}
              customStyles={{
                marginTop: { xs: 2, md: 0 },
                mb: 2,
              }}
            >
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
          <CustomGrid xs={12} md={8}>
            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <Box></Box>
              <Box display={'flex'} gap={2} alignItems={'center'}>
                <LoadingButton
                  className="small"
                  variant="outlined"
                  type="button"
                  color="secondary"
                  onClick={() => handleCancelBtn?.()}
                  disabled={
                    postContractStatus?.isLoading ||
                    putContractStatus?.isLoading ||
                    postAttachmentStatus?.isLoading
                  }
                >
                  Cancel
                </LoadingButton>
                <LoadingButton
                  className="small"
                  loading={
                    postContractStatus?.isLoading ||
                    putContractStatus?.isLoading ||
                    postAttachmentStatus?.isLoading
                  }
                  variant="contained"
                  type="submit"
                >
                  {!!contractId ? 'Update' : 'Save'}
                </LoadingButton>
              </Box>
            </Box>
          </CustomGrid>
        </ContainerGrid>
      </FormProvider>
    </ApiRequestFlow>
  );
};
