import { Box, Button } from '@mui/material';
import { Header } from './Header';
import { useClosureRule } from './useClosureRule';
import { FormProvider } from '@/components/ReactHookForm';
import { IncidentServicesClosureRule } from './IncidentServicesClosureRule';
import { LoadingButton } from '@mui/lab';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';

export const ClosureRule = () => {
  const {
    closureRuleMethods,
    handleSubmitClosureRule,
    closeIncidentData,
    resolveIncidentData,
    serviceCloseData,
    serviceResolveData,
    postClosureRuleProgress,
    isLoading,
    handleCancel,
    isError,
    isFetching,
  } = useClosureRule();
  if (isLoading || isFetching) return <SkeletonTable />;
  if (isError) return <ApiErrorState />;

  return (
    <FormProvider
      methods={closureRuleMethods}
      onSubmit={handleSubmitClosureRule}
    >
      <Header />
      <br />
      <IncidentServicesClosureRule
        closeIncidentData={closeIncidentData}
        resolveIncidentData={resolveIncidentData}
        serviceCloseData={serviceCloseData}
        serviceResolveData={serviceResolveData}
      />
      <Box display={'flex'} justifyContent={'end'} gap={1} mt={1}>
        <LoadingButton
          disabled={postClosureRuleProgress?.isLoading}
          variant="contained"
          type="submit"
        >
          Save
        </LoadingButton>
        <Button variant="outlined" onClick={handleCancel} color="secondary">
          Cancel
        </Button>
      </Box>
    </FormProvider>
  );
};
