import { Box, DialogActions, Grid, Tooltip, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import ErrorIcon from '@mui/icons-material/Error';
import {
  FormProvider,
  RHFCheckbox,
  RHFRadioGroup,
} from '@/components/ReactHookForm';
import { permissionData } from './Permissions.data';
import { usePermissions } from './usePermissions';

export const Permissions = () => {
  const { permissionsMethod, handleSubmitPermissions, reset, palette } =
    usePermissions();
  return (
    <Box>
      <Typography variant="h3" color="blue.main">
        Permissions
      </Typography>
      <br />
      <FormProvider
        methods={permissionsMethod}
        onSubmit={handleSubmitPermissions}
      >
        <Grid container spacing={2}>
          {permissionData?.map((item: any) => (
            <Grid
              item
              xs={12}
              key={item?.id}
              pb={2}
              borderBottom={`1px solid ${palette?.grey?.[700]}`}
            >
              {item?.mainHeading && (
                <Typography {...item?.mainHeadingProp}>
                  {item?.mainHeading}
                </Typography>
              )}
              <Typography {...item?.headingProp}>{item?.heading}</Typography>
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
            </Grid>
          ))}
        </Grid>
        <br />
        <DialogActions>
          <LoadingButton
            variant="outlined"
            color="secondary"
            onClick={() => reset()}
          >
            cancel
          </LoadingButton>
          <LoadingButton variant="contained" type="submit">
            Save
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Box>
  );
};
