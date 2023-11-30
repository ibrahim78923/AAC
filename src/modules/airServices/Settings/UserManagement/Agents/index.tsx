import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { Box, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Agent from './Agent';
import AgentRequest from './AgentRequest';

export const agentsDataArray = ['Agent', 'Agents Request'];

const Agents = () => {
  return (
    <>
      <Box display={'flex'} alignItems={'center'} gap={1} mb={2}>
        <IconButton sx={{ cursor: 'pointer' }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h3">Agents</Typography>
      </Box>
      <HorizontalTabs tabsDataArray={agentsDataArray}>
        <Agent />
        <AgentRequest />
      </HorizontalTabs>
    </>
  );
};

export default Agents;
