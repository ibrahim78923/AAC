import { Box, Button } from '@mui/material';
import { Header } from './Header';
import { useClosureRole } from './useClosureRole';
import { FormProvider } from '@/components/ReactHookForm';
import { IncidentServicesClosureRule } from './IncidentServicesClosureRule';
import { LoadingButton } from '@mui/lab';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';

export const ClosureRole = () => {
  const {
    closureRoleMethods,
    handleSubmitClosureRole,
    reset,
    closeIncidentData,
    resolveIncidentData,
    serviceCloseData,
    serviceResolveData,
    isLoading,
    getIsLoading,
  } = useClosureRole();

  return (
    <FormProvider
      methods={closureRoleMethods}
      onSubmit={handleSubmitClosureRole}
    >
      <Header />
      <br />
      {getIsLoading ? (
        <SkeletonTable />
      ) : (
        <IncidentServicesClosureRule
          closeIncidentData={closeIncidentData}
          resolveIncidentData={resolveIncidentData}
          serviceCloseData={serviceCloseData}
          serviceResolveData={serviceResolveData}
        />
      )}
      <Box display={'flex'} justifyContent={'end'} gap={1} mt={1}>
        <LoadingButton disabled={isLoading} variant="contained" type="submit">
          Save
        </LoadingButton>
        <Button variant="outlined" onClick={() => reset()} color="secondary">
          cancel
        </Button>
      </Box>
    </FormProvider>
  );
};
