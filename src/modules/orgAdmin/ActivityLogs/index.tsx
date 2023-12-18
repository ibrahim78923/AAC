import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import Search from '@/components/Search';
// import { ActivityLogsData } from '@/mock/modules/orgAdmin/ActivityLogs';
import { v4 as uuidv4 } from 'uuid';
import UserLists from './UserLists';
import { useGetActivityLogQuery } from '@/services/orgAdmin/activity-log';

const ActivityLogs = () => {
  // const [filterValues, setFilterValues] = useState({});
  // const [searchByInvoices, setSearchByInvoices] = useState('');

  // const searchParam = { seacrh: searchByInvoices };
  // const { data } = useGetActivityLogQuery({
  //   params: { ...filterValues, ...searchParam },
  // });
  const { data } = useGetActivityLogQuery({});
  const ActivityLogsData: any = [];

  // Iterate through the raw data
  data?.data?.activitylogs?.forEach((log: any) => {
    // Parse date from ISO format
    const logDate = new Date(log.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    // Check if the log with the same date already exists in ActivityLogsData
    const existingLog = ActivityLogsData.find(
      (item: any) => item.date === logDate,
    );

    if (existingLog) {
      // Log with the same date exists, add the new user data to the existing log
      existingLog.userLists.push({
        id: log?._id,
        performedByName: log?.performedByName,
        moduleName: log?.moduleName,
        performedBy: log?.performedBy,
        moduleId: log?.moduleId,
        message: 'Placeholder message?',
        userImg: 'ExampleKababCaseImg',
        label: log.activityType,
        time: new Date(log.createdAt).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
        }),
      });
    } else {
      // Log with the same date does not exist, create a new log entry
      ActivityLogsData.push({
        id: ActivityLogsData?.length + 1,
        date: logDate,
        userLists: [
          {
            id: log?._id,
            performedByName: log?.performedByName,
            moduleName: log?.moduleName,
            performedBy: log?.performedBy,
            moduleId: log?.moduleId,
            message: 'Placeholder message?',
            userImg: 'ExampleKababCaseImg',
            label: log.activityType,
            time: new Date(log.createdAt).toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
            }),
          },
        ],
      });
    }
  });

  return (
    <>
      <Typography variant="h3" mb={'24px'}>
        Activity Logs
      </Typography>
      <Box display={'flex'} alignItems={'center'} gap={'24px'}>
        <Search size="small" sx={{ flex: 1 }} />
        <Button variant="outlined">Date</Button>
      </Box>
      {ActivityLogsData.map((data: any) => (
        <Box key={uuidv4()} sx={{ overflowY: 'scroll', height: '65vh' }}>
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
