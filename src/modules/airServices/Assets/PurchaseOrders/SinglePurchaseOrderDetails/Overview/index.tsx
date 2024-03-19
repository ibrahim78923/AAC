import { Box, Skeleton, Typography } from '@mui/material';
import { overviewData } from './Overview.data';
import { styles } from './Overview.style';
import { overviewTableColumns } from './Overview.data';
import OverviewModel from './OverviewModal';
import OverviewBilling from './OverviewBilling';
import TanstackTable from '@/components/Table/TanstackTable';
import { useOverview } from './useOverview';
export const Overview = () => {
  const {
    openOverviewModal,
    setOpenOverviewModal,
    theme,
    purchaseOrderData,
    purchaseOrderDetailData,
    orderStatus,
    itemName,
    handleDownload,
    uniqueNumber,
    isLoading,
    isFetching,
  } = useOverview();
  if (isLoading || isFetching) return <Skeleton />;
  return (
    <Box>
      {overviewData(purchaseOrderData)?.map((item: any) => (
        <Box key={item?._id}>
          <Typography variant="h5" py={'0.625rem'}>
            {item?.heading}
          </Typography>
          <Box sx={styles?.mainContainerBox}>
            {item?.detailsData?.map((detail: any) => (
              <Box key={item?._id}>
                <Box sx={styles?.childContainerBox}>
                  <Box width={{ sm: '20%', xs: '8.75rem' }}>
                    <Typography variant="body2" fontWeight={500}>
                      {detail?.name}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="body2"
                      color={theme?.palette?.grey?.[900]}
                    >
                      {detail?.detail}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      ))}
      <Box mt={'1rem'}>
        <Typography variant="h5" py={'0.625rem'}>
          Items Details
        </Typography>
        <TanstackTable
          data={purchaseOrderDetailData}
          columns={overviewTableColumns(
            setOpenOverviewModal,
            purchaseOrderDetailData,
            itemName,
            theme,
            orderStatus,
          )}
        />
      </Box>
      <Box m={'1rem 3rem 0 0'}>
        <OverviewBilling
          purchaseOrderDetailData={purchaseOrderDetailData}
          purchaseOrderData={purchaseOrderData}
        />
      </Box>
      <Box>
        <OverviewModel
          openOverviewModal={openOverviewModal}
          setOpenOverviewModal={setOpenOverviewModal}
          purchaseOrderDetailData={purchaseOrderDetailData}
          purchaseOrderData={purchaseOrderData}
          theme={theme}
          orderStatus={orderStatus}
          handleDownload={handleDownload}
          uniqueNumber={uniqueNumber}
          itemName={itemName}
        />
      </Box>
    </Box>
  );
};
