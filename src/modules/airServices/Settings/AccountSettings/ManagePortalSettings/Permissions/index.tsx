import { Box, Grid, Tooltip, Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import {
  FormProvider,
  RHFCheckbox,
  RHFRadioGroup,
} from '@/components/ReactHookForm';
import { permissionData } from './Permissions.data';
import { LoadingButton } from '@mui/lab';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { usePermissions } from './usePermissions';

export const Permissions = () => {
  const {
    methods,
    handleSubmit,
    onSubmit,
    checkApiErrorOrLoading,
    patchCustomerPortalPermissionsStatus,
  } = usePermissions();

  return (
    <Box border={'.1rem solid'} borderColor={'grey.700'} p={2} borderRadius={4}>
      <PageTitledHeader title="Permissions" />
      {checkApiErrorOrLoading() ?? (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {permissionData?.map((item: any) => (
              <Grid item xs={12} key={item?.id}>
                <Box borderBottom={1} borderColor={'grey.700'}>
                  {item?.mainHeading && (
                    <Typography {...item?.mainHeadingProp}>
                      {item?.mainHeading}
                    </Typography>
                  )}
                  <Typography {...item?.headingProp}>
                    {item?.heading}
                  </Typography>
                  <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'}>
                    <RHFRadioGroup {...item?.componentProps} />
                    {item?.checkboxProps && (
                      <RHFCheckbox {...item?.checkboxProps} />
                    )}
                    {item?.tooltipProps && (
                      <Tooltip {...item?.tooltipProps}>
                        <ErrorIcon color="primary" fontSize="small" />
                      </Tooltip>
                    )}
                  </Box>
                </Box>
              </Grid>
            ))}

            <Grid item xs={12}>
              <Box display={'flex'} justifyContent={'flex-end'} gap={2}>
                <LoadingButton
                  variant={'outlined'}
                  color={'secondary'}
                  className="small"
                  disabled={patchCustomerPortalPermissionsStatus?.isLoading}
                >
                  Cancel
                </LoadingButton>
                <LoadingButton
                  type={'submit'}
                  variant={'contained'}
                  className="small"
                  loading={patchCustomerPortalPermissionsStatus?.isLoading}
                >
                  Save
                </LoadingButton>
              </Box>
            </Grid>
          </Grid>
        </FormProvider>
      )}
    </Box>
  );
};
