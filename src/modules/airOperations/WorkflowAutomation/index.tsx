import { Avatar, Box, Grid, Typography } from '@mui/material';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';
import { useWorkflowAutomation } from './useWorkflowAutomation';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';

export const WorkflowAutomation = () => {
  const { isLoading, isError, isFetching, workflowAutomationTypes, router } =
    useWorkflowAutomation();

  if (isLoading || isFetching) return <SkeletonTable />;
  if (isError) return <ApiErrorState />;

  return (
    <>
      <Typography variant="h3">Workflow Automation</Typography>
      <br />
      <Grid container spacing={3}>
        {workflowAutomationTypes?.map((workflow) => (
          <PermissionsGuard
            permissions={workflow?.permission}
            key={workflow?.id}
          >
            {workflow?.hasAccount && (
              <Grid
                key={workflow?.id}
                item
                md={5}
                lg={4}
                xs={12}
                onClick={() => {
                  router?.push({
                    pathname: workflow?.link,
                  });
                }}
                sx={{ cursor: 'pointer' }}
              >
                <Box
                  display={'flex'}
                  alignItems={'center'}
                  flexWrap={'wrap'}
                  border={`1px solid `}
                  borderColor={'grey.700'}
                  borderRadius={2}
                  gap={2}
                  padding={1}
                  height={'100%'}
                >
                  <Avatar
                    variant="rounded"
                    sx={{ backgroundColor: 'primary.light' }}
                  >
                    {workflow?.avatar}
                  </Avatar>
                  <Box flex={1}>
                    <Typography variant="h5" whiteSpace={'nowrap'}>
                      {workflow?.type}
                    </Typography>
                    <Typography variant="body3" color={'grey.900'}>
                      {workflow?.purpose}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            )}
          </PermissionsGuard>
        ))}
      </Grid>
    </>
  );
};
