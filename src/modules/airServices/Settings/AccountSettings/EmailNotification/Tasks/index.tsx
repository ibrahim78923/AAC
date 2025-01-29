import { Box, Divider, Typography } from '@mui/material';
import { Fragment } from 'react';
import { taskData } from './Task.data';
import { AntSwitch } from '@/components/AntSwitch';
import useTasks from './useTasks';
import { IItemData, IItemDetail } from '../EmailNotification.interface';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';

export const Tasks = () => {
  const {
    isError,
    isLoading,
    isFetching,
    switchLoading,
    onSwitchChange,
    data,
    refetch,
  } = useTasks();

  return (
    <ApiRequestFlow
      showSkeleton={isLoading || isFetching}
      hasError={isError}
      refreshApi={refetch}
    >
      {taskData?.map((head: IItemData) => (
        <Fragment key={head?._id}>
          <Typography variant={'h5'} color={'blue.main'}>
            {head?.heading}
          </Typography>

          <Divider sx={{ my: 2, borderColor: 'custom.dark' }} />

          {head?.details?.map((item: IItemDetail) => (
            <Box
              key={item?._id}
              p={2}
              my={1}
              borderRadius={2}
              bgcolor={'custom.white_fifty'}
              display={'flex'}
              justifyContent={'space-between'}
            >
              <Typography
                color={'custom.dim_blue'}
                variant={'body1'}
                fontWeight={500}
              >
                {item?.title}
              </Typography>

              <AntSwitch
                isLoading={switchLoading[item?._id]}
                onChange={() => onSwitchChange(item?._id)}
                checked={!data?.data?.notificationsOff?.[item?._id]}
              />
            </Box>
          ))}
        </Fragment>
      ))}
    </ApiRequestFlow>
  );
};
