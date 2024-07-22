import { Box, Grid, Typography } from '@mui/material';
import useUpsertService from './useUpsertService';
import { FormProvider } from '@/components/ReactHookForm';
import { Attachments } from '@/components/Attachments';
import { AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import { LoadingButton } from '@mui/lab';
import { PageTitledHeader } from '@/components/PageTitledHeader';

export const UpsertService = () => {
  const {
    methods,
    handleSubmit,
    onSubmit,
    upsertServiceFormField,
    categoryId,
    postAddServiceCatalogStatus,
    filteredServices,
    handleCancelBtn,
  } = useUpsertService();

  return (
    <>
      <PageTitledHeader
        title={`General Details`}
        canMovedBack
        moveBack={() => handleCancelBtn()}
      />
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          {upsertServiceFormField?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={item?.id}>
              <item.component {...item?.componentProps} size={'small'}>
                {item?.heading ? item?.heading : null}
              </item.component>
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={2} mt={1}>
          {filteredServices?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={item?.id}>
              <item.component {...item?.componentProps} size={'small'} />
            </Grid>
          ))}
        </Grid>

        <Box display={'flex'} justifyContent={'flex-end'} gap={2} my={2}>
          <LoadingButton
            type="button"
            color="secondary"
            variant="outlined"
            onClick={() => handleCancelBtn()}
            disabled={postAddServiceCatalogStatus?.isLoading}
          >
            cancel
          </LoadingButton>
          <LoadingButton
            variant="contained"
            type="submit"
            loading={postAddServiceCatalogStatus?.isLoading}
          >
            Save
          </LoadingButton>
        </Box>
        <br />

        {!!categoryId && (
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
                recordId={categoryId}
                permissionKey={[
                  AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_PERMISSIONS?.ADD_NEW_SERVICE,
                ]}
                colSpan={{ sm: 12, lg: 12 }}
              />
            </Box>
          </>
        )}
      </FormProvider>
    </>
  );
};
