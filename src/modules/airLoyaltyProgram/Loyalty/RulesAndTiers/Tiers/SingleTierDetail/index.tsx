import CommonDrawer from '@/components/CommonDrawer';
import { Box, IconButton, Slider, Typography } from '@mui/material';
import { EditInputIcon } from '@/assets/icons';
import { LOYALTY_RULES_ATTRIBUTES_MAPPED } from '@/constants/api-mapped';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import NoData from '@/components/NoData';
import { useSingleTierDetail } from './useSingleTierDetail';

export const SingleTierDetail = (props: any) => {
  const { isDrawerOpen } = props;
  const { closeUpsertTier, data, isLoading, isFetching } =
    useSingleTierDetail(props);
  return (
    <CommonDrawer
      isDrawerOpen={isDrawerOpen?.isOpen}
      onClose={() => closeUpsertTier?.()}
      cancelText={'Cancel'}
      title={isDrawerOpen?.isDetail?.name}
      footer
      headerIcon={
        <IconButton>
          <EditInputIcon />
        </IconButton>
      }
    >
      {isLoading || isFetching ? (
        <SkeletonTable />
      ) : (
        <Box>
          <Box>
            <Typography variant="h6" color="common.black">
              Base tier
            </Typography>
            <Typography
              variant="body3"
              color="grey.900"
              display="flex"
              gap={1.5}
              alignItems="center"
            >
              ({data?.data?.amount} dollar equivalent to
              <Slider sx={{ width: 100 }} value={[0, 100]} disabled />
              {data?.data?.points} pts)
            </Typography>
          </Box>
          <br />
          <Box>
            <Typography variant="h5" color="common.black">
              Points calculation
            </Typography>
            <br />
            {!!data?.data?.tierRule?.length ? (
              data?.data?.tierRule?.map((item: any) => (
                <Box
                  key={item?._id}
                  display="flex"
                  justifyContent="space-between"
                  mb={1.5}
                >
                  <Typography variant="h6">
                    {LOYALTY_RULES_ATTRIBUTES_MAPPED?.[item?.attribute]}:
                  </Typography>
                  <Typography variant="body1" color="grey.900">
                    {item?.rewardType === 'FIXED_DISCOUNT'
                      ? item?.rewards + '%'
                      : item?.rewards + ' ' + 'pts'}
                  </Typography>
                </Box>
              ))
            ) : (
              <NoData height="30vh" />
            )}
          </Box>
        </Box>
      )}
    </CommonDrawer>
  );
};
