import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import AgentLevels from './AgentLevels';
import AwardPoints from './AwardPoints';
import { Box, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants';
import { ViewDetailBackArrowIcon } from '@/assets/icons';
const LeaderBoardTabs = ['Award Points', 'Agent Levels'];
export const LeaderBoard = () => {
  const { push } = useRouter();
  const { AGENT_PERFORMANCE_MANAGEMENT_SETTINGS } = AIR_SERVICES;
  return (
    <>
      <Stack direction="row" alignItems="center" gap={1.2} pb={3.5}>
        <Box
          sx={{ width: 24, height: 24, cursor: 'pointer' }}
          onClick={() => push(AGENT_PERFORMANCE_MANAGEMENT_SETTINGS)}
        >
          <ViewDetailBackArrowIcon />
        </Box>
        <Typography
          variant="h3"
          textTransform="capitalize"
          color={'slateBlue.main'}
        >
          Leader Board
        </Typography>
      </Stack>
      <HorizontalTabs tabsDataArray={LeaderBoardTabs}>
        <AwardPoints />
        <AgentLevels />
      </HorizontalTabs>
    </>
  );
};
