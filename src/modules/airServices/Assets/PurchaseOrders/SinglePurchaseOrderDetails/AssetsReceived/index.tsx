import { Box, Typography } from '@mui/material';
import CustomPagination from '@/components/CustomPagination';
import { useAssetsReceived } from './useAssetsReceived';
import { styles } from './AssetsReceived.style';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';
import { CustomLinearProgress } from '@/components/ProgressBars/CustomLinearProgress';

export const AssetsReceived = () => {
  const {
    assetsReceivedData,
    assetsReceivedMeta,
    page,
    setPage,
    limit,
    setLimit,
    isError,
    isLoading,
    isFetching,
    theme,
    MIN_META,
    purchaseOrderIdData,
    purchaseFetching,
    purchaseLoading,
    handleAssetsReceived,
  } = useAssetsReceived();

  return (
    <>
      {purchaseLoading || purchaseFetching ? (
        <>
          <CustomLinearProgress width="100%" />
          <br />
        </>
      ) : (
        <Typography variant={'h4'} textTransform={'capitalize'}>
          {purchaseOrderIdData?.data?.orderName ?? '---'}
        </Typography>
      )}
      <Typography
        variant={'body2'}
        color={theme?.palette?.custom?.main}
        fontWeight={500}
      >
        Assets which are received and added to inventory are shown here
      </Typography>
      <br />
      <ApiRequestFlow
        showSkeleton={isLoading || isFetching}
        hasError={isError}
        refreshApi={handleAssetsReceived}
        hasNoData={!!!assetsReceivedData?.length}
        skeletonType={SKELETON_TYPES?.BASIC_CARD}
        cardSkeletonType={
          SKELETON_TYPES?.SMALL_HORIZONTAL_TWO_LAYER_CIRCULAR_CARD
        }
        noDataMessage="Received items have not been added to inventory yet"
      >
        {assetsReceivedData?.map((item: any) => (
          <Box key={item?._id} sx={styles?.assetsCard(theme)}>
            <Box sx={styles?.cardDetail}>
              <Typography
                variant={'body2'}
                fontWeight={600}
                textTransform={'uppercase'}
                sx={styles?.cardText}
              >
                #ASSET-{item?._id?.slice(-3)?.toUpperCase()}
              </Typography>
              <Box sx={styles?.cardLine(theme)} />
            </Box>
            <Box sx={styles?.cardDetail}>
              <Typography
                variant="body3"
                sx={styles?.cardText}
                textTransform={'capitalize'}
              >
                {item?.assetName}
              </Typography>
            </Box>
            <Box sx={styles?.cardLine(theme)} />
            <Typography
              variant="body3"
              sx={styles?.cardText}
              textTransform={'capitalize'}
            >
              Location:- {item?.locationName ?? '---'}
            </Typography>
          </Box>
        ))}
      </ApiRequestFlow>

      {assetsReceivedMeta && assetsReceivedMeta?.total > MIN_META && (
        <CustomPagination
          currentPage={page}
          count={assetsReceivedMeta?.pages}
          pageLimit={limit}
          totalRecords={assetsReceivedMeta?.total}
          onPageChange={(page: any) => setPage(page)}
          setPage={setPage}
          setPageLimit={setLimit}
        />
      )}
    </>
  );
};
