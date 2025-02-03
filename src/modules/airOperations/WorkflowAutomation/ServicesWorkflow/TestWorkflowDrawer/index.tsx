import CommonDrawer from '@/components/CommonDrawer';
import { Box, Typography } from '@mui/material';
import { workflowColumns } from './TestWorkflowDrawer.data';
import { TestWorkflowDrawerProps } from './TestWorkflowDrawer.interface';
import TanstackTable from '@/components/Table/TanstackTable';
import { useTestWorkflowDrawer } from './useTestWorkflowDrawer';

export const TestWorkflowDrawer = (props: TestWorkflowDrawerProps) => {
  const {
    setPage,
    setLimit,
    titleData,
    isWorkflowDrawer,
    setIsWorkflowDrawer,
    testWorkflowStatus,
    handleTestWorkflow,
    watch,
  } = useTestWorkflowDrawer(props);

  return (
    <CommonDrawer
      isDrawerOpen={isWorkflowDrawer}
      onClose={() => setIsWorkflowDrawer(false)}
      title="Test Result For Workflow"
      footer
      isCancel
      cancelText="Close"
      isOk={false}
    >
      <Box
        sx={{
          border: '1px solid',
          p: 1,
          borderRadius: 2,
          borderColor: 'grey.700',
        }}
      >
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Typography variant="h4" color="secondary.main">
            Testing
          </Typography>
        </Box>
        <Typography component="li" variant="body2">
          Since this is a test, no actions will be executed
        </Typography>
      </Box>
      <TanstackTable
        columns={workflowColumns(watch)}
        data={testWorkflowStatus?.data?.data?.[titleData]}
        errorProps={{ canRefresh: true, refresh: handleTestWorkflow }}
        totalRecords={testWorkflowStatus?.data?.data?.meta?.total}
        currentPage={testWorkflowStatus?.data?.data?.meta?.page}
        pageLimit={testWorkflowStatus?.data?.data?.meta?.limit}
        count={testWorkflowStatus?.data?.data?.meta?.pages}
        onPageChange={(page: number) => setPage(page)}
        isSuccess={testWorkflowStatus?.isSuccess}
        isError={testWorkflowStatus?.isError}
        setPageLimit={setLimit}
        setPage={setPage}
        isLoading={testWorkflowStatus?.isLoading}
        noDataTableText="No action will execute since conditions are not met"
        isPagination
      />
    </CommonDrawer>
  );
};
