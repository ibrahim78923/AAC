import React from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Tooltip,
  Typography,
} from '@mui/material';
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
    isLoading,
  } = useActivityLog();

  return (
    <>
      <Typography variant="h3" mb={'24px'}>
        Activity Logs
      </Typography>

      <Box display={'flex'} alignItems={'center'} gap={'12px'}>
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
          renderInput="button"
          placement="right"
        />
      </Box>
      {isLoading && (
        <Box sx={{ textAlign: 'center', marginTop: '100px' }}>
          {' '}
          <CircularProgress />
        </Box>
      )}
      {ActivityLogsData?.length === 0 && !isLoading && (
        <Typography
          variant="h6"
          sx={{ textAlign: 'center', marginTop: '20px', color: 'red' }}
        >
          No Data{' '}
        </Typography>
      )}
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
