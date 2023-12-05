import { Box, Divider, Grid, Tooltip, Typography } from '@mui/material';
import {
  twoFactorPolicyDataArray,
  twoFactorPolicyActionDropdown,
  tooltipMessage,
} from './TwoFactorPolicy.data';
import { FormProvider } from '@/components/ReactHookForm';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { useTwoFactorPolicy } from './useTwoFactorPolicy';
import ErrorIcon from '@mui/icons-material/Error';

export const TwoFactorPolicy = () => {
  const { methods, disable, defaultDisable } = useTwoFactorPolicy();

  return (
    <>
      <Divider />
      <Box display={'flex'} alignItems={'center'} gap={1} mt={1.5}>
        <Typography variant="h5">2FA Policy</Typography>
        <Tooltip title={tooltipMessage} arrow>
          <ErrorIcon color="primary" />
        </Tooltip>
      </Box>
      <Box mt={1} display={'flex'}>
        <FormProvider methods={methods}>
          <Grid container spacing={2}>
            {twoFactorPolicyDataArray?.map((item: any) => (
              <Grid item xs={12} key={item?.id}>
                <item.component {...item?.componentProps} />
              </Grid>
            ))}
          </Grid>
        </FormProvider>
        <SingleDropdownButton
          dropdownOptions={twoFactorPolicyActionDropdown}
          disabled={disable || defaultDisable}
        />
      </Box>
    </>
  );
};
