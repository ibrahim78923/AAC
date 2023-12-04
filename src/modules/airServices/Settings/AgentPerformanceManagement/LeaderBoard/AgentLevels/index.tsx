import { Grid, Typography } from '@mui/material';
import React from 'react';
import AgentLevelCard from './AgentLevelCard';
import { AgentLevelCardData } from './AgentLevelCard/AgentLevelCard.data';

const AgentLevels = () => {
  return (
    <>
      <Typography fontWeight={600} pb={1.2}>
        Agent Levels
      </Typography>
      <Typography variant="subtitle2" fontWeight={500} color="custom.main">
        Set points to be achieved by an agent to reach a level
      </Typography>
      <Grid container gap={1.6} xs={12} md={8} xl={3} mt={2.4}>
        {AgentLevelCardData?.map?.((card) => (
          <Grid item xs={12} key={card?.points}>
            <AgentLevelCard {...card} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default AgentLevels;
