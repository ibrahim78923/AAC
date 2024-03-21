import { Box, Grid, Tooltip, Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import {
  FormProvider,
  RHFCheckbox,
  RHFRadioGroup,
} from '@/components/ReactHookForm';
import { permissionData } from './Permissions.data';
import { usePermissions } from './usePermissions';

export const Permissions = () => {
  const { permissionsMethod, palette } = usePermissions();

  return (
    <>
      <Typography variant={'h3'} color={'blue.main'} mb={2}>
        Permissions
      </Typography>

      <FormProvider methods={permissionsMethod}>
        <Grid container spacing={2}>
          {permissionData?.map((item: any) => (
            <Grid
              item
              xs={12}
              key={item?.id}
              borderBottom={`1px solid ${palette?.grey?.[700]}`}
            >
              {item?.mainHeading && (
                <Typography {...item?.mainHeadingProp}>
                  {item?.mainHeading}
                </Typography>
              )}
              <Typography {...item?.headingProp}>{item?.heading}</Typography>
              <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'}>
                <RHFRadioGroup {...item?.componentProps} disabled />
                {item?.checkboxProps && (
                  <RHFCheckbox {...item?.checkboxProps} disabled />
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
      </FormProvider>
    </>
  );
};
