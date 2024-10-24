import { FormProvider, RHFDropZone } from '@/components/ReactHookForm';
import { useUpsertContract } from './useUpsertContract';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import { Attachments } from '@/components/Attachments';
import { AIR_SERVICES_ASSETS_CONTRACTS_PERMISSIONS } from '@/constants/permission-keys';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import ApiErrorState from '@/components/ApiErrorState';
import { componentMap } from '@/utils/dynamic-forms';
import { createElement } from 'react';

export const UpsertContract = () => {
  const {
    upsertContractFormMethods,
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
  } = useUpsertContract();

  if (isLoading || isFetching) return <SkeletonForm />;

  if (getDynamicFieldsStatus?.isError) return <ApiErrorState />;

  return (
    <>
      <PageTitledHeader
        moveBack={() => handleCancelBtn?.()}
        canMovedBack
        title={!!contractId ? 'Edit Contract' : 'Add Contract'}
      />
      <FormProvider
        methods={upsertContractFormMethods}
        onSubmit={handleSubmit?.(submitUpsertContractForm)}
      >
        <Grid
          container
          border={{
            xs: `2px solid ${theme?.palette?.custom?.off_white_three}`,
            md: 'none',
          }}
          borderRadius={{ xs: 3, md: 0 }}
          padding={{ xs: 1.5, md: 0 }}
        >
          <Grid
            item
            xs={12}
            md={7.5}
            border={{
              md: `2px solid ${theme?.palette?.custom?.off_white_three}`,
              xs: 'none',
            }}
            borderRadius={{ md: 2, xs: 0 }}
            padding={{ md: 1.5, xs: 0 }}
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
                      <Typography variant={'h4'} textTransform={'capitalize'}>
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
          </Grid>
          <Grid item xs={12} md={0.5}></Grid>
          <Grid item xs={12} md={4} mt={{ xs: 2, md: 0 }} mb={2}>
            <RHFDropZone name="attachFile" fullWidth={true} />
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
          </Grid>
        </Grid>
        <br />
        <Grid container>
          <Grid item xs={12} md={7.5}>
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
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
};
