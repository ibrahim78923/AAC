import CommonDrawer from '@/components/CommonDrawer';
import { Box, IconButton, Slider, Typography } from '@mui/material';
import { EditInputIcon } from '@/assets/icons';
import { LOYALTY_RULES_ATTRIBUTES_MAPPED } from '@/constants/api-mapped';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import NoData from '@/components/NoData';
import { useSingleTierDetail } from './useSingleTierDetail';
import ApiErrorState from '@/components/ApiErrorState';
import { UpsertTier } from '../UpsertTier';
import { LOYALTY_PROGRAM_TIERS_REWARD_TYPE } from '@/constants/api';

export const SingleTierDetail = (props: any) => {
  const { isDrawerOpen } = props;
  const {
    closeUpsertTier,
    data,
    isLoading,
    isFetching,
    sliderValue,
    isError,
    isUpdateDrawer,
    setIsUpdateDrawer,
  } = useSingleTierDetail(props);
  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDrawerOpen?.isOpen}
        onClose={() => closeUpsertTier?.()}
        cancelText="Cancel"
        title={isDrawerOpen?.isDetail?.name}
        footer
        headerIcon={
          <IconButton
            onClick={() =>
              setIsUpdateDrawer?.({
                isOpen: true,
              })
            }
          >
            <EditInputIcon />
          </IconButton>
        }
      >
        {isLoading || isFetching ? (
          <SkeletonTable />
        ) : isError ? (
          <ApiErrorState />
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
                ({data?.data?.amount} pound equivalent to
                <Slider sx={{ width: 100 }} value={sliderValue} disabled />
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
                      {item?.rewardType ===
                      LOYALTY_PROGRAM_TIERS_REWARD_TYPE?.FIXED_DISCOUNT
                        ? `${item?.rewards}%`
                        : `${item?.rewards} pts`}
                    </Typography>
                  </Box>
                ))
              ) : (
                <NoData height="30vh" message="No rules added in this tier" />
              )}
            </Box>
          </Box>
        )}
      </CommonDrawer>
      {isUpdateDrawer?.isOpen && (
        <UpsertTier
          isDrawerOpen={isUpdateDrawer}
          setIsDrawerOpen={setIsUpdateDrawer}
          tierId={isDrawerOpen?.isDetail}
          closeDetailTier={closeUpsertTier}
        />
      )}
    </>
  );
};
