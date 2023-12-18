import React from 'react';
import { Box, Button, InputAdornment, Typography } from '@mui/material';
import Search from '@/components/Search';
import { ActivityLogsData } from '@/mock/modules/orgAdmin/ActivityLogs';
import { v4 as uuidv4 } from 'uuid';
import UserLists from './UserLists';
import { ActivityLogCalenderIcon } from '@/assets/icons';
import SearchSharedIcon from '@/assets/icons/shared/search-shared';

const ActivityLogs = () => {
  return (
    <>
      <Typography variant="h3" mb={'24px'}>
        Activity Logs
      </Typography>
      <Box display={'flex'} alignItems={'center'} gap={'24px'} mb={'24px'}>
        <Search
          size="small"
          sx={{ flex: 1 }}
          placeholder="What are you looking for"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchSharedIcon />
              </InputAdornment>
            ),
          }}
        />
        <Box>
          <Button variant="outlined" color="inherit">
            <ActivityLogCalenderIcon /> &nbsp; Date
          </Button>
        </Box>
      </Box>
      {ActivityLogsData.map((data) => (
        <Box key={uuidv4()}>
          <Typography
            variant="body2"
            fontWeight={600}
            my={'24px'}
            textTransform={'capitalize'}
          >
            {data?.date}
          </Typography>
          {data?.userLists?.map((user) => (
            <UserLists key={uuidv4()} {...user} />
          ))}
        </Box>
      ))}
    </>
  );
};

export default ActivityLogs;
