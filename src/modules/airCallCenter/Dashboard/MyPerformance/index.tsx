import { Box, Grid, Typography, useTheme } from '@mui/material';
import InComingCallCard from './InComingCallCard';
import {
  columns,
  inComingCallCardArr,
  outGoingCallCardArr,
  statusDropDown,
} from './MyPerformance.data';
import Link from 'next/link';
import TanstackTable from '@/components/Table/TanstackTable';
import { myRecentCallData } from '@/mock/modules/airCallCenter/Dashboard';
import { SingleDropdownButton } from '@/components/Buttons/SingleDropdownButton';
import { useState } from 'react';
import { ToDoList } from './toDoList';

export const MyPerformance = () => {
  const theme = useTheme();
  const columnsData = columns(theme);
  const [buttonName, setButtonName] = useState('Today');
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4" color="grey.800">
          Incoming Calls
        </Typography>
        <SingleDropdownButton
          dropdownOptions={statusDropDown(setButtonName)}
          dropdownName={buttonName}
          sx={{
            color: `custom.main`,
            height: 40,
            border: `1.5px solid ${theme?.palette?.custom?.border_grayish_blue}`,
          }}
        />
      </Box>
      <InComingCallCard CallCardArr={inComingCallCardArr} />

      <Typography variant="h4" sx={{ marginTop: '20px' }} color="grey.800">
        Outgoing Calls
      </Typography>
      <InComingCallCard CallCardArr={outGoingCallCardArr} />

      <Grid container spacing={3} mt={1}>
        <Grid item sm={12} md={8}>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            sx={{ margin: '15px 0' }}
          >
            <Typography variant="h4" color="grey.800">
              My recent calls
            </Typography>

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
          <Box
            sx={{
              height: 370,
              overflow: 'auto',
            }}
          >
            <TanstackTable columns={columnsData} data={myRecentCallData} />
          </Box>
        </Grid>
        <Grid item sm={12} md={4}>
          <ToDoList />
        </Grid>
      </Grid>
    </>
  );
};
