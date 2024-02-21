import { Stack, Typography } from '@mui/material';
import WorkFlowCard from './WorkFlowCards';
import WorkFlowTable from './WorkFlowTable';

const CallWorkFlow = () => {
  return (
    <Stack gap={2}>
      <Typography variant="h3" fontWeight={600}>
        Call Workflows
      </Typography>
      <WorkFlowCard />
      <WorkFlowTable />
    </Stack>
  );
};

export default CallWorkFlow;
