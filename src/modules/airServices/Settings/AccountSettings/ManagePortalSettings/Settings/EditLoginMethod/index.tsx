import CommonDrawer from '@/components/CommonDrawer';
import { Box, Tooltip, Typography } from '@mui/material';
import { PasswordPolicy } from './PasswordPolicy';
import { TwoFactorPolicy } from './TwoFactorPolicy';
import ErrorIcon from '@mui/icons-material/Error';
import { headingMessage, passwordPolicy } from './EditLoginMethod.data';
import { enqueueSnackbar } from 'notistack';

export const EditLoginMethod = (props: any) => {
  const { setIsOpenDrawer, isOpenDrawer } = props;
  const handleSubmit = () => {
    enqueueSnackbar('Apply Successfully', {
      variant: 'success',
    });
    setIsOpenDrawer(false);
  };

  return (
    <CommonDrawer
      isDrawerOpen={isOpenDrawer}
      onClose={() => setIsOpenDrawer(false)}
      title={'Air Apple Cart Login'}
      okText={'Apply'}
      isOk
      cancelText={'Cancel'}
      footer
      submitHandler={handleSubmit}
      headerIcon={
        <Tooltip title={headingMessage} arrow>
          <ErrorIcon color="primary" />
        </Tooltip>
      }
    >
      <Box mt={1}>
        <Typography variant="h5" mb={0.5}>
          Password Policy
        </Typography>
        <Typography variant="body2">{passwordPolicy}</Typography>
        <br />
        <PasswordPolicy />
        <TwoFactorPolicy />
      </Box>
    </CommonDrawer>
  );
};
