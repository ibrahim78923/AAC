import { Grid, Typography, Box } from '@mui/material';
import { FormProvider, RHFDropZone } from '@/components/ReactHookForm';
import { useUpdateContract } from './useUpdateContract';
import { LoadingButton } from '@mui/lab';
import { ViewDetailBackArrowIcon } from '@/assets/icons';
import { AIR_SERVICES } from '@/constants';
import { Attachments } from '@/components/Attachments';
import { AIR_SERVICES_ASSETS_CONTRACTS_PERMISSIONS } from '@/constants/permission-keys';

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
            minHeight={{ md: '40rem' }}
            border={{
              md: `2px solid ${theme?.palette?.custom?.off_white_three}`,
              xs: 'none',
            }}
            borderRadius={{ md: 2, xs: 0 }}
            padding={{ md: 1.5, xs: 0 }}
          >
            <Box
              sx={{
                mb: '1rem',
              }}
            >
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Box
                  onClick={() => router?.push(AIR_SERVICES?.ASSETS_CONTRACTS)}
                  sx={{ cursor: 'pointer' }}
                >
                  <ViewDetailBackArrowIcon />
                </Box>
                <Typography variant="h5" textTransform={'capitalize'}>
                  {`${router?.query?.action} Contract`}
                </Typography>
              </Box>
            </Box>
            <Grid container spacing={4}>
              {updateContractFormFields?.map((item: any) => (
                <Grid item xs={12} lg={item?.md} key={item?.id}>
                  <item.component {...item?.componentProps} size={'small'}>
                    {item?.componentProps?.select
                      ? item?.componentProps?.options?.map((option: any) => (
                          <option key={item?.id} value={option?.value}>
                            {option?.label}
                          </option>
                        ))
                      : item?.heading
                      ? item?.heading
                      : null}
                  </item.component>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} md={0.5}></Grid>
          <Grid item xs={12} md={4} mt={{ xs: 1, md: 0 }} mb={1}>
            <RHFDropZone name="attachment" fullWidth={true} />
            <br />
            {!!contractId && (
              <>
                <Typography
                  variant="body1"
                  fontWeight={500}
                  color="slateBlue.main"
                  mb={2}
                >
                  {' '}
                  Attachments{' '}
                </Typography>
                <Box maxHeight={'20vh'}>
                  <Attachments
                    recordId={contractId}
                    permissionKey={[
                      AIR_SERVICES_ASSETS_CONTRACTS_PERMISSIONS?.VIEW_TASK_DETAILS,
                    ]}
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
                  variant="outlined"
                  type="button"
                  color="secondary"
                  onClick={() => handleCancelBtn?.()}
                  disabled={patchAddToContractStatus?.isLoading}
                >
                  Cancel
                </LoadingButton>

                <LoadingButton
                  variant="contained"
                  type="submit"
                  loading={patchAddToContractStatus?.isLoading}
                >
                  {`${router?.query?.action}`}
                </LoadingButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
};
