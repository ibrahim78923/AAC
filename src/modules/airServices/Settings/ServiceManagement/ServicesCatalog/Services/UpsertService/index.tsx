import { Box, Grid, Typography } from '@mui/material';

import useUpsertService from './useUpsertService';

import { FormProvider } from '@/components/ReactHookForm';
import { Attachments } from '@/components/Attachments';
import { AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AIR_SERVICES } from '@/constants';
import { LoadingButton } from '@mui/lab';

export const UpsertService = () => {
  const {
    methods,
    handleSubmit,
    onSubmit,
    upsertServiceFormField,
    categoryId,
    router,

    postAddServiceCatalogStatus,
    filteredServices,
  } = useUpsertService();

  return (
    <>
      <Box
        display={'flex'}
        alignItems={'center'}
        flexWrap={'wrap'}
        gap={1}
        sx={{ cursor: 'pointer' }}
      >
        <ArrowBackIcon
          onClick={() => router.push(AIR_SERVICES?.SERVICE_CATALOG)}
        />
        <Typography variant="h4">General Details</Typography>
      </Box>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3} mt={2}>
          {upsertServiceFormField?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={item?.id}>
              {item?.componentProps?.heading && (
                <Typography mt={4}>{item?.componentProps?.heading}</Typography>
              )}
              <item.component {...item?.componentProps} size={'small'} />
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

        <Grid container spacing={4} mt={2}>
          <Box
            display={'flex'}
            alignItems={'end'}
            justifyContent={'end'}
            flexDirection={'row'}
            bottom={'1rem'}
            right={'2rem'}
            marginLeft={'auto'}
          >
            <LoadingButton
              sx={{ marginRight: '1rem' }}
              type="button"
              color="secondary"
              variant="outlined"
              onClick={() => methods?.reset()}
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
        </Grid>
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
