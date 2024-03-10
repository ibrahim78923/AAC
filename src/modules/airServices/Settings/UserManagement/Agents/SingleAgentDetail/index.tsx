import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { Tickets } from './Tickets';
import { Tasks } from './Tasks';
import { Assets } from './Assets';
import { Software } from './Software';
import { AgentBioData } from './AgentBioData';
import { Typography } from '@mui/material';

export const SingleAgentDetail = () => {
  return (
    <>
      <AgentBioData />
      <Typography my={3} variant="h3" color="slateBlue.main">
        Associations
      </Typography>
      <HorizontalTabs
        tabsDataArray={['Tickets', 'Tasks', 'Assets', 'Software']}
      >
        <Tickets />
        <Tasks />
        <Assets />
        <Software />
      </HorizontalTabs>
    </>
  );
};
