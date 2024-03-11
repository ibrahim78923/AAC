import { Box, Grid, Typography } from '@mui/material';
import AgentLevelCard from './AgentLevelCard';
import { agentLevelCardData } from './AgentLevel.data';
import { FormProvider } from '@/components/ReactHookForm';
import { useAgentLevelsPoints } from './useAgentLevelsPoints';
import { LoadingButton } from '@mui/lab';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';

const AgentLevels = () => {
  const {
    agentLevelsPointsMethod,
    handleSubmit,
    isLoading,
    isFetching,
    addAgentLevelsPointsStatus,
  } = useAgentLevelsPoints();

  if (isLoading || isFetching) return <SkeletonForm />;

  return (
    <PermissionsGuard
      permissions={[
        AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT_PERMISSIONS?.VIEW_AND_MANAGE_AGENT_LEVELS_POINTS,
      ]}
    >
      <br />
      <FormProvider
        methods={agentLevelsPointsMethod}
        onSubmit={agentLevelsPointsMethod?.handleSubmit?.(handleSubmit)}
      >
        <Typography fontWeight={600} pb={1.2}>
          Agent Levels
        </Typography>
        <Typography variant="subtitle2" fontWeight={500} color="custom.main">
          Set points to be achieved by an agent to reach a level
        </Typography>
        <Grid item container xs={12} md={10} lg={7} mt={2.4} spacing={2}>
          {agentLevelCardData?.map?.((card) => (
            <Grid item xs={12} key={card?.points}>
              <AgentLevelCard {...card} />
            </Grid>
          ))}
        </Grid>
        <Grid
          item
          container
          xs={12}
          md={8}
          xl={4}
          mt={2.4}
          sx={{ justifyContent: { sm: 'flex-end' } }}
        >
          <Box display={'flex'} gap={2} alignItems={'center'} flexWrap={'wrap'}>
            <LoadingButton
              disabled={addAgentLevelsPointsStatus?.isLoading}
              type="button"
              variant="outlined"
              color="inherit"
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              loading={addAgentLevelsPointsStatus?.isLoading}
              disableElevation
              type="submit"
              variant="contained"
            >
              Save
            </LoadingButton>
          </Box>
        </Grid>
      </FormProvider>
    </PermissionsGuard>
  );
};

export default AgentLevels;
