import { Grid, Typography } from '@mui/material';
import ApiErrorState from '@/components/ApiErrorState';
import { useWorkflowAutomation } from './useWorkflowAutomation';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { SkeletonCard } from '@/components/Skeletons/SkeletonCard';
import { ItemLinkCard } from '@/components/Cards/ItemLinkCard/ItemLinkCard';

export const WorkflowAutomation = () => {
  const { isLoading, isError, isFetching, workflowAutomationTypes, refetch } =
    useWorkflowAutomation();

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
              <Grid item xs={12} md={6} lg={4}>
                <ItemLinkCard
                  Icon={workflow?.avatar}
                  itemType={workflow?.type}
                  itemLink={workflow?.link}
                  itemPurpose={workflow?.purpose}
                  itemTypeFontSize="h5"
                  hasLink={workflow?.hasAccount}
                  itemPurposeFontSize="body3"
                />
              </Grid>
            </PermissionsGuard>
          ))}
        </Grid>
      )}
    </>
  );
};
