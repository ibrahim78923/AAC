import { Box, Typography } from '@mui/material';
import CustomPagination from '@/components/CustomPagination';
import ApiErrorState from '@/components/ApiErrorState';
import NoData from '@/components/NoData';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { useAssetsReceived } from './useAssetsReceived';
import { styles } from './AssetsReceived.style';

export const AssetsReceived = () => {
  const {
    assetsReceivedData,
    assetsReceivedMeta,
    page,
    setPage,
    limit,
    setLimit,
    isError,
    isSuccess,
    isLoading,
    isFetching,
    theme,
    MIN_META,
    purchaseOrderIdData,
    purchaseFetching,
    purchaseLoading,
  } = useAssetsReceived();

  return (
    <>
      {purchaseFetching || purchaseLoading ? (
        <SkeletonTable />
      ) : (
        purchaseOrderIdData?.data?.orderName && (
          <>
            <Box mb={2}>
              <Typography variant={'h4'} textTransform={'capitalize'}>
                {purchaseOrderIdData?.data?.orderName}
              </Typography>
              <Typography
                variant={'body2'}
                color={theme?.palette?.custom?.main}
                fontWeight={500}
              >
                Assets which are received and added to inventory are shown here
              </Typography>
            </Box>
            {isError ? (
              <ApiErrorState />
            ) : isSuccess &&
              (!assetsReceivedData || !assetsReceivedData?.length) ? (
              <NoData message="Received items have not been added to inventory yet" />
            ) : isLoading || isFetching ? (
              <SkeletonTable />
            ) : (
              assetsReceivedData?.map((item: any) => (
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
              ))
            )}
          </>
        )
      )}

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
