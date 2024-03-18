import { Box, Button } from '@mui/material';
import { Header } from './Header';
import { useClosureRule } from './useClosureRule';
import { FormProvider } from '@/components/ReactHookForm';
import { IncidentServicesClosureRule } from './IncidentServicesClosureRule';
import { LoadingButton } from '@mui/lab';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';

export const ClosureRule = () => {
  const {
    closureRuleMethods,
    handleSubmitClosureRule,
    closeIncidentData,
    resolveIncidentData,
    serviceCloseData,
    serviceResolveData,
    isLoading,
    getIsLoading,
    handleCancel,
  } = useClosureRule();

  return (
    <FormProvider
      methods={closureRuleMethods}
      onSubmit={handleSubmitClosureRule}
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
        <Button variant="outlined" onClick={handleCancel} color="secondary">
          cancel
        </Button>
      </Box>
    </FormProvider>
  );
};
