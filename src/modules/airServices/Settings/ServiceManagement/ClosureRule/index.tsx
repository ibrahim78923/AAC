import { Box } from '@mui/material';
import { Header } from './Header';
import { useClosureRule } from './useClosureRule';
import { FormProvider } from '@/components/ReactHookForm';
import { IncidentServicesClosureRule } from './IncidentServicesClosureRule';
import { LoadingButton } from '@mui/lab';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';

export const ClosureRule = () => {
  const {
    methods,
    closeIncidentData,
    resolveIncidentData,
    serviceCloseData,
    serviceResolveData,
    postClosureRuleProgress,
    isLoading,
    handleCancel,
    isError,
    isFetching,
    onSubmit,
    handleSubmit,
    refetch,
  } = useClosureRule();

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Header />
      <br />
      <ApiRequestFlow
        showSkeleton={isLoading || isFetching}
        hasError={isError}
        refreshApi={refetch}
      >
        <IncidentServicesClosureRule
          closeIncidentData={closeIncidentData}
          resolveIncidentData={resolveIncidentData}
          serviceCloseData={serviceCloseData}
          serviceResolveData={serviceResolveData}
        />

        <Box display={'flex'} justifyContent={'end'} gap={1} mt={1}>
          <LoadingButton
            variant="outlined"
            className="small"
            onClick={handleCancel}
            color="secondary"
            disableElevation
            disabled={postClosureRuleProgress?.isLoading}
          >
            Cancel
          </LoadingButton>
          <LoadingButton
            loading={postClosureRuleProgress?.isLoading}
            variant="contained"
            type="submit"
            className="small"
            disableElevation
          >
            Save
          </LoadingButton>
        </Box>
      </ApiRequestFlow>
    </FormProvider>
  );
};
