import CommonDrawer from '@/components/CommonDrawer';
import { Box, Typography } from '@mui/material';
import { PasswordPolicy } from './PasswordPolicy';
import { TwoFactorPolicy } from './TwoFactorPolicy';

export const EditLoginMethod = (props: any) => {
  const { setIsOpenDrawer, isOpenDrawer } = props;

  return (
    <CommonDrawer
      isDrawerOpen={isOpenDrawer}
      onClose={() => setIsOpenDrawer(false)}
      title={'Air Apple Cart Login'}
      okText={'Apply'}
      isOk
      cancelText={'Cancel'}
      footer
      submitHandler={() => setIsOpenDrawer(false)}
    >
      <Box mt={1}>
        <Typography variant="h5" mb={0.5}>
          Password Policy
        </Typography>
        <Typography variant="body2">
          Define your password policy for your organization and encourage your
          agents and admins to set stronger passwords. Choose either a pre-set
          level or create a custom level to suit your need.
        </Typography>
        <br />
        <PasswordPolicy />

        <TwoFactorPolicy />
      </Box>
    </CommonDrawer>
  );
};
