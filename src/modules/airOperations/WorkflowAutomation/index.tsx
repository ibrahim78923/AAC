import { Avatar, Box, Grid, Typography } from '@mui/material';
import ApiErrorState from '@/components/ApiErrorState';
import { useWorkflowAutomation } from './useWorkflowAutomation';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { SkeletonCard } from '@/components/Skeletons/SkeletonCard';

export const WorkflowAutomation = () => {
  const {
    isLoading,
    isError,
    isFetching,
    workflowAutomationTypes,
    router,
    refetch,
  } = useWorkflowAutomation();
  if (isError) return;
  return (
    <>
      <Typography variant="h3">Workflow Automation</Typography>
      <br />
      {isFetching || isLoading ? (
        <SkeletonCard
          isCircular={'rounded'}
          circularSkeletonSize={{ width: 70, height: 50 }}
          outerPadding={{ x: 1, y: 2 }}
          hasThirdSkeleton={false}
          length={2}
        />
      ) : isError ? (
        <ApiErrorState canRefresh refresh={() => refetch?.()} />
      ) : (
        <Grid container spacing={3}>
          {workflowAutomationTypes?.map((workflow) => (
            <PermissionsGuard
              permissions={workflow?.permission}
              key={workflow?.id}
            >
              <Grid
                key={workflow?.id}
                item
                md={5}
                lg={4}
                xs={12}
                onClick={() => {
                  if (!workflow?.hasAccount) return;
                  router?.push({
                    pathname: workflow?.link,
                  });
                }}
                sx={{
                  cursor: !workflow?.hasAccount ? 'not-allowed' : 'pointer',
                }}
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
                  bgcolor={!workflow?.hasAccount ? 'grey.200' : 'common.white'}
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
            </PermissionsGuard>
          ))}
        </Grid>
      )}
    </>
  );
};
