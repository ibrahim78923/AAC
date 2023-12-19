import React from 'react';
import { Box, Button, Tooltip, Typography } from '@mui/material';
import Search from '@/components/Search';
import { v4 as uuidv4 } from 'uuid';
import UserLists from './UserLists';
import SwitchableDatepicker from '@/components/SwitchableDatepicker';
import useActivityLog from './useActivityLog';
import { RefreshTasksIcon } from '@/assets/icons';

const ActivityLogs = () => {
  const {
    search,
    setSearch,
    dateValue,
    setDateValue,
    handleDateSubmit,
    ActivityLogsData,
    handleRefresh,
  } = useActivityLog();

  return (
    <>
      <Typography variant="h3" mb={'24px'}>
        Activity Logs
      </Typography>

      <Box display={'flex'} alignItems={'center'} gap={'12px'}>
        {/* <Search size="small" sx={{ flex: 1 }} /> */}
        <Search
          label="What are you looking for?"
          searchBy={search}
          setSearchBy={setSearch}
          size="small"
          width={'100%'}
        />

        <Tooltip title={'Refresh Filter'}>
          <Button
            variant="outlined"
            color="inherit"
            className="small"
            onClick={handleRefresh}
          >
            <RefreshTasksIcon />
          </Button>
        </Tooltip>

        <SwitchableDatepicker
          dateValue={dateValue}
          setDateValue={setDateValue}
          handleDateSubmit={handleDateSubmit}
        />
      </Box>
      {ActivityLogsData.map((data: any) => (
        <Box key={uuidv4()} sx={{ overflowY: 'scroll', maxHeight: '65vh' }}>
          <Typography
            variant="body2"
            fontWeight={600}
            my={'24px'}
            textTransform={'capitalize'}
          >
            {data?.date}
          </Typography>
          {data?.userLists?.map((user: any) => (
            <UserLists key={uuidv4()} {...user} />
          ))}
        </Box>
      ))}
    </>
  );
};

export default ActivityLogs;
