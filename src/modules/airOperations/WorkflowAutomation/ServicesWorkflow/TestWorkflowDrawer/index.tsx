import CommonDrawer from '@/components/CommonDrawer';
import { Box, Grid, Typography } from '@mui/material';
import { workflowColumns } from './TestWorkflowDrawer.data';
import { TestWorkflowDrawerProps } from './TestWorkflowDrawer.interface';
import TanstackTable from '@/components/Table/TanstackTable';
import { useTestWorkflowDrawer } from './useTestWorkflowDrawer';

export const TestWorkflowDrawer = (props: TestWorkflowDrawerProps) => {
  const {
    setPage,
    setLimit,
    palette,
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
      <Grid container gap={2}>
        <Grid
          item
          border={`1px solid ${palette?.grey?.[700]}`}
          p={1}
          borderRadius={2}
          xs={12}
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
        </Grid>
        <Grid item xs={12}>
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
        </Grid>
      </Grid>
    </CommonDrawer>
  );
};
