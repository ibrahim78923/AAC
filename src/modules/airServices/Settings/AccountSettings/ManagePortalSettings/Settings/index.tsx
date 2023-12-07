import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material';
import { SettingsForm } from './SettingsForm';
import { LoginMethods } from './LoginMethods';

export const Settings = () => {
  const theme = useTheme();

  return (
    <Box
      border={`.1rem solid ${theme?.palette?.grey?.[700]}`}
      p={2}
      borderRadius={4}
    >
      <Typography variant="h4">Security Help Desk</Typography>
      <Box bgcolor={theme?.palette?.grey?.[400]} borderRadius={3} p={2} mt={1}>
        <SettingsForm />
        <br />
        <LoginMethods />
      </Box>
    </Box>
  );
};
