import Search from '@/components/Search';
import {
  Box,
  FormControl,
  LinearProgress,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { UserDefault } from '@/assets/images';

import {
  useGetTaskFeedQuery,
  useGetTasksQuery,
} from '@/services/airSales/task';
import { PAGINATION } from '@/config';
import { getSession } from '@/utils';
import UserList from './UserList';

const Feed = () => {
  const { user }: { accessToken: string; refreshToken: string; user: any } =
    getSession();

  const { data: taskFeedData, isLoading } = useGetTaskFeedQuery({
    params: {
      companyId: user?.organization?._id ? user?.organization?._id : '',
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
            <Search size="small" width={'216px'} placeholder="Search" />
          </Box>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <Typography variant="body2">Select Task</Typography>
            <Select labelId="" id="demo-simple-select">
              {taskData?.data?.taskmanagements &&
                taskData?.data?.taskmanagements?.map((item: any) => (
                  <MenuItem value={item?.id} key={uuidv4()}>
                    {item?.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <Typography variant="subtitle1" mb={'24px'}>
            Sample activity
          </Typography>
          {taskFeedData?.data?.length ? (
            taskFeedData?.data?.map((item: any) => (
              <UserList
                key={uuidv4()}
                img={UserDefault}
                name={item?.user?.firstName + ' ' + item?.user?.lastName}
                email={item?.user?.email}
                desc={item?.name}
                date={item?.date}
              />
            ))
          ) : (
            <>No record found</>
          )}
        </>
      )}
    </>
  );
};

export default Feed;
