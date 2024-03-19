import { Box, Typography } from '@mui/material';
import { useSettings } from './useSettings';
import { FormProvider } from '@/components/ReactHookForm';

export const Settings = () => {
  const { settingsMethods } = useSettings();

  return (
    <Box border={'.1rem solid'} borderColor={'grey.700'} p={2} borderRadius={4}>
      <Typography variant="h4">Security Help Desk</Typography>
      <Box bgcolor={'grey.100'} borderRadius={3} p={2} mt={1}>
        <FormProvider methods={settingsMethods}></FormProvider>
      </Box>
    </Box>
  );
};
