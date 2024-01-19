import { Box, Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material';
import { SettingsForm } from './SettingsForm';
import { LoginMethods } from './LoginMethods';
import { useSettings } from './useSettings';
import { FormProvider } from '@/components/ReactHookForm';

export const Settings = () => {
  const theme = useTheme();
  const { settingsMethods, reset, timeOut, handleSubmitSettings } =
    useSettings();

  return (
    <Box
      border={`.1rem solid ${theme?.palette?.grey?.[700]}`}
      p={2}
      borderRadius={4}
    >
      <Typography variant="h4">Security Help Desk</Typography>
      <Box bgcolor={theme?.palette?.grey?.[100]} borderRadius={3} p={2} mt={1}>
        <FormProvider methods={settingsMethods} onSubmit={handleSubmitSettings}>
          <SettingsForm />
          <br />
          <LoginMethods timeOut={timeOut} />
          <Box display={'flex'} justifyContent={'end'} gap={1}>
            <Button
              variant="outlined"
              color={'inherit'}
              onClick={() => reset()}
            >
              cancel
            </Button>
            <Button variant="contained" type="submit">
              Save
            </Button>
          </Box>
        </FormProvider>
      </Box>
    </Box>
  );
};
