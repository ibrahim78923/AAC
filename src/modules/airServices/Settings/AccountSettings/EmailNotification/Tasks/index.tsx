import { Box, CircularProgress, Divider, Typography } from '@mui/material';
import { Fragment } from 'react';
import { taskData } from './Task.data';
import { AntSwitch } from '@/components/AntSwitch';
import useTasks from './useTasks';
import ApiErrorState from '@/components/ApiErrorState';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';

export const Tasks = () => {
  const {
    isError,
    isLoading,
    isFetching,
    switchLoading,
    onSwitchChange,
    data,
  } = useTasks();

  if (isError) return <ApiErrorState />;

  if (isLoading || isFetching) return <SkeletonTable />;

  return (
    <>
      {taskData?.map((head: any) => (
        <Fragment key={head?._id}>
          <Typography variant={'h5'} color={'blue.main'}>
            {head?.heading}
          </Typography>

          <Divider sx={{ my: 2, borderColor: 'custom.dark' }} />

          {head?.details?.map((item: any) => (
            <Box
              key={item?._id}
              p={2}
              my={1}
              borderRadius={2}
              bgcolor={'custom.white_fifty'}
              display={'flex'}
              justifyContent={'space-between'}
            >
              {item.value}
              <Typography
                color={'custom.dim_blue'}
                variant={'body1'}
                fontWeight={500}
              >
                {item?.title}
              </Typography>

              {switchLoading[item?._id] ? (
                <CircularProgress size={20} />
              ) : (
                <AntSwitch
                  onChange={() => onSwitchChange(item?._id)}
                  checked={!data?.data?.notificationsOff?.[item?._id]}
                />
              )}
            </Box>
          ))}
        </Fragment>
      ))}
    </>
  );
};
