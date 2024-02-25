import React from 'react';
import { Box } from '@mui/material';
import useAgentStatuses from './useAgentStatuses';
import { styles } from './AgentStatuses.styles';

const AgentStatuses = () => {
  const {} = useAgentStatuses();
  return <Box sx={styles?.pageHeader}>AgentStatuses</Box>;
};

export default AgentStatuses;
