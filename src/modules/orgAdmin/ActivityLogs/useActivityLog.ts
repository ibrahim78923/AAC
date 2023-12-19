import { DATE_FORMAT } from '@/constants';
import { useGetActivityLogQuery } from '@/services/orgAdmin/activity-log';
import dayjs from 'dayjs';
import { useState } from 'react';

const useActivityLog = () => {
  const [search, setSearch] = useState();
  const [dateValue, setDateValue] = useState<any>([new Date(), new Date()]);
  const [filterValues, setFilterValues] = useState({});
  const searchParam = { search: search };

  const handleDateSubmit = () => {
    const filterPayloadValues = {
      startDate: dayjs(dateValue[0])?.format(DATE_FORMAT?.API),
      endDate: dayjs(dateValue[1])?.format(DATE_FORMAT?.API),
    };

    setFilterValues(filterPayloadValues);
  };

  const handleRefresh = async () => {
    setFilterValues('');
  };

  const { data, isLoading } = useGetActivityLogQuery({
    params: { ...filterValues, ...searchParam },
  });
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

  return {
    search,
    setSearch,
    dateValue,
    setDateValue,
    handleDateSubmit,
    ActivityLogsData,
    handleRefresh,
    isLoading,
  };
};

export default useActivityLog;
