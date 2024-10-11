import { PageTitledHeader } from '@/components/PageTitledHeader';
import { FormProvider } from '@/components/ReactHookForm';
import { useUpsertServices } from './useUpsertServices';
import { Box, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export default function UpsertServices() {
  const {
    handleCancelBtn,
    methods,
    handleSubmit,
    onSubmit,
    upsertServiceData,
    postAddServiceCatalogStatus,
  } = useUpsertServices();

  return (
    <>
      <PageTitledHeader
        title={`General Details`}
        canMovedBack
        moveBack={() => handleCancelBtn()}
      />
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          {upsertServiceData?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={item?.id}>
              <item.component {...item?.componentProps} size={'small'}>
                {item?.heading ? item?.heading : null}
              </item.component>
            </Grid>
          ))}

          <Grid item xs={12}>
            <Box display={'flex'} justifyContent={'flex-end'} gap={2}>
              <LoadingButton
                color={'inherit'}
                variant={'outlined'}
                className={'small'}
                onClick={() => handleCancelBtn()}
                disabled={postAddServiceCatalogStatus?.isLoading}
              >
                Cancel
              </LoadingButton>
              <LoadingButton
                variant={'contained'}
                type={'submit'}
                className={'small'}
                loading={postAddServiceCatalogStatus?.isLoading}
              >
                Save
              </LoadingButton>
            </Box>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}
