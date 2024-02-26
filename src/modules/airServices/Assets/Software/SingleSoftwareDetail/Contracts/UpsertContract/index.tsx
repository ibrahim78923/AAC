import { FormProvider, RHFDropZone } from '@/components/ReactHookForm';
import { useUpsertContract } from './useUpsertContract';
import { Box, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export const UpsertContract = () => {
  const {
    upsertContractFormMethods,
    handleSubmit,
    submitUpsertContractForm,
    theme,
    upsertContractFormFieldsData,
    handleCancelBtn,
    postContractStatus,
  } = useUpsertContract();

  return (
    <>
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
            <Grid container spacing={4}>
              {upsertContractFormFieldsData?.map((item: any) => (
                <Grid item xs={12} lg={item?.md} key={item?.id}>
                  <item.component {...item?.componentProps} size={'small'}>
                    {item?.heading ? item?.heading : null}
                  </item.component>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} md={0.5}></Grid>
          <Grid item xs={12} md={4} mt={{ xs: 1, md: 0 }} mb={1}>
            <RHFDropZone
              name="attachFile"
              fullWidth={true}
              fileType={'PNG or JPG  (max 2.44 MB)'}
              maxSize={1024 * 1024 * 2.44}
              accept={{
                'image/*': ['.png', '.jpg'],
              }}
            />
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
                  disabled={postContractStatus?.isLoading}
                >
                  Cancel
                </LoadingButton>
                <LoadingButton
                  loading={postContractStatus?.isLoading}
                  variant="contained"
                  type="submit"
                >
                  Save
                </LoadingButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
};
