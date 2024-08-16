import { AntSwitch } from '@/components/AntSwitch';
import { Box, CircularProgress, Divider, Typography } from '@mui/material';
import { Fragment } from 'react';
import { purchaseOrdersData } from './PurchaseOrders.data';
import ApiErrorState from '@/components/ApiErrorState';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import usePurchaseOrders from './usePurchaseOrders';
import { IItemData, IItemDetail } from '../EmailNotification.interface';

export const PurchaseOrders = () => {
  const {
    isError,
    isLoading,
    isFetching,
    switchLoading,
    onSwitchChange,
    data,
  } = usePurchaseOrders();

  if (isError) return <ApiErrorState />;

  if (isLoading || isFetching) return <SkeletonTable />;

  return (
    <>
      {purchaseOrdersData?.map((head: IItemData) => (
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
