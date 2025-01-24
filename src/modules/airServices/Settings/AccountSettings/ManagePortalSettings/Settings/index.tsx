import { Box, Typography } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useSettings } from './useSettings';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { FormGrid } from '@/components/Grids/FormGrid';

export const Settings = () => {
  const { methods, settingsDataArray, showLoader, isError, refetch } =
    useSettings();

  return (
    <Box border={'.1rem solid'} borderColor={'grey.700'} p={2} borderRadius={4}>
      <ApiRequestFlow
        showSkeleton={showLoader}
        hasError={isError}
        refreshApi={refetch}
      >
        <Typography variant="h4">Security Help Desk</Typography>
        <Box bgcolor={'grey.100'} borderRadius={3} p={2} mt={1}>
          <FormProvider methods={methods}>
            <FormGrid formFieldsList={settingsDataArray} disabled />
          </FormProvider>
        </Box>
      </ApiRequestFlow>
    </Box>
  );
};
