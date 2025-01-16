import { Grid, Typography } from '@mui/material';
import { useWorkflowAutomation } from './useWorkflowAutomation';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { ItemLinkCard } from '@/components/Cards/ItemLinkCard/ItemLinkCard';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';

export const WorkflowAutomation = () => {
  const { isLoading, isError, isFetching, workflowAutomationTypes, refetch } =
    useWorkflowAutomation();

  return (
    <>
      <Typography variant="h3">Workflow Automation</Typography>
      <br />
      <ApiRequestFlow
        hasError={isError}
        showSkeleton={isLoading || isFetching}
        refreshApi={refetch}
        skeletonType={SKELETON_TYPES?.BASIC_CARD}
        cardSkeletonType={
          SKELETON_TYPES?.MEDIUM_HORIZONTAL_TWO_LAYER_ROUNDED_CARD
        }
        length={2}
      >
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
      </ApiRequestFlow>
    </>
  );
};
