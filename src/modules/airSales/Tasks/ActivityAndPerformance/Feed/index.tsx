import Search from '@/components/Search';
import {
  Box,
  CircularProgress,
  FormControl,
  LinearProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { UserDefault } from '@/assets/images';

import {
  useGetTaskFeedQuery,
  useGetTasksQuery,
} from '@/services/airSales/task';
import { PAGINATION } from '@/config';
import UserList from './UserList';
import { DATE_TIME_FORMAT } from '@/constants';
import dayjs from 'dayjs';
import { useState } from 'react';

const Feed = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTask, setSelectedTask] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedTask(event.target.value as string);
  };

  const {
    data: taskFeedData,
    isLoading,
    status,
  } = useGetTaskFeedQuery({
    params: {
      page: PAGINATION?.CURRENT_PAGE,
      limit: PAGINATION?.PAGE_LIMIT,
      module: 'TASKS_MANAGEMENT',
      search: searchTerm,
      moduleId: selectedTask,
    },
  });

  const { data: taskData } = useGetTasksQuery({
    params: {
      page: PAGINATION?.CURRENT_PAGE,
      limit: PAGINATION?.PAGE_LIMIT,
    },
  });

  return (
    <>
      {isLoading ? (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            mb={'28px'}
          >
            <Typography variant="subtitle1">Contact activity feed</Typography>
            <Box sx={{ width: '216px' }}>
              <Search
                searchBy={searchTerm}
                setSearchBy={setSearchTerm}
                label="Search By Name"
                fullWidth
                size="small"
              />
            </Box>
          </Box>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <Typography variant="body2">Select Task</Typography>
            <Select
              labelId=""
              id="demo-simple-select"
              value={selectedTask}
              onChange={handleChange}
              placeholder="Select Option"
              sx={{
                height: '40px',
              }}
            >
              {taskData?.data?.taskmanagements &&
                taskData?.data?.taskmanagements?.map((item: any) => (
                  <MenuItem value={item?._id} key={uuidv4()}>
                    {item?.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <Typography variant="subtitle1" mb={'24px'}>
            Sample activity
          </Typography>

          {status === 'pending' ? (
            <Box sx={{ mt: 2 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              {taskFeedData?.data?.activitylogs?.length ? (
                taskFeedData?.data?.activitylogs?.map((item: any) => (
                  <UserList
                    key={uuidv4()}
                    img={UserDefault}
                    name={item?.performedByName}
                    email={item?.email}
                    desc={item?.moduleName}
                    date={dayjs(item?.createdAt)?.format(DATE_TIME_FORMAT?.DMY)}
                  />
                ))
              ) : (
                <>No record found</>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Feed;
