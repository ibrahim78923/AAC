import { Box, Grid, Typography, useTheme } from '@mui/material';
import InComingCallCard from './InComingCallCard';
import {
  columns,
  inComingCallCardArr,
  outGoingCallCardArr,
} from './MyPerformance.data';
import Link from 'next/link';
import TanstackTable from '@/components/Table/TanstackTable';
import { myRecentCallData } from '@/mock/modules/airCallCenter/Dashboard';
import { ToDoList } from './toDoList';

export const MyPerformance = () => {
  const theme = useTheme();
  const columnsData = columns(theme);
  return (
    <>
      <Typography variant="h4" sx={{ marginLeft: '10px' }}>
        Incoming Calls
      </Typography>
      <InComingCallCard CallCardArr={inComingCallCardArr} />

      <Typography variant="h4" sx={{ marginTop: '20px', marginLeft: '10px' }}>
        Outgoing Calls
      </Typography>
      <InComingCallCard CallCardArr={outGoingCallCardArr} />

      <Grid container spacing={3}>
        <Grid item sm={12} md={8}>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            sx={{ margin: '15px 0' }}
          >
            <Typography variant="h4">My recent calls</Typography>

            <Link
              href="/"
              style={{
                color: theme?.palette?.primary?.main,
                fontWeight: '600',
                fontSize: '14px',
              }}
            >
              Show More
            </Link>
          </Box>

          <TanstackTable columns={columnsData} data={myRecentCallData} />
        </Grid>
        <Grid item sm={12} md={4}>
          <ToDoList />
        </Grid>
      </Grid>
    </>
  );
};
