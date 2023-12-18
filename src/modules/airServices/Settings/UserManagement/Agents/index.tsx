import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { Box, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Agent from './Agent';
import AgentRequest from './AgentRequest';
import { AIR_SERVICES } from '@/constants';
import { useRouter } from 'next/router';

export const agentsDataArray = ['Agent', 'Agents Request'];

const Agents = () => {
  const router = useRouter();
  return (
    <>
      <Box display={'flex'} alignItems={'center'} gap={1} mb={2}>
        <IconButton sx={{ cursor: 'pointer' }}>
          <ArrowBackIcon
            onClick={() =>
              router?.push({ pathname: AIR_SERVICES?.USER_MANAGEMENT })
            }
          />
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
