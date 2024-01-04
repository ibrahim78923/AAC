import { Button, Grid, Typography } from '@mui/material';
import AgentLevelCard from './AgentLevelCard';
import { AgentLevelCardData } from './AgentLevel.data';
import { FormProvider } from '@/components/ReactHookForm';
import { useAgentLevelsPoints } from './useAgentLevelsPoints';
import { useEffect } from 'react';

const AgentLevels = () => {
  const {
    agentLevelsPointsMethod,
    handleSubmit,
    agentLevelsPoints,
    handleSetValues,
  } = useAgentLevelsPoints();

  useEffect(() => {
    handleSetValues();
  }, [agentLevelsPoints]);

  return (
    <>
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
        <Grid container gap={1.6} xs={12} md={8} xl={4} mt={2.4}>
          {AgentLevelCardData?.map?.((card) => (
            <Grid item xs={12} key={card?.points}>
              <AgentLevelCard {...card} />
            </Grid>
          ))}
        </Grid>
        <Grid
          container
          xs={12}
          md={8}
          xl={4}
          mt={2.4}
          sx={{ justifyContent: 'flex-end' }}
        >
          <Button type="submit" variant="contained">
            Save
          </Button>
        </Grid>
      </FormProvider>
    </>
  );
};

export default AgentLevels;
