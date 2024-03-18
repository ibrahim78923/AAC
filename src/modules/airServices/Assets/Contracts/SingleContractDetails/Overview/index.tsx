import { Box, Skeleton, Typography } from '@mui/material';
import { overviewData } from './Overview.data';
import { styles } from './Overview.style';
import { useOverview } from './useOverview';
export const Overview = () => {
  const {
    theme,
    contractData,
    contractItemData,
    approverName,
    isLoading,
    isFetching,
  } = useOverview();
  if (isLoading || isFetching) return <Skeleton />;
  return (
    <div>
      {overviewData({ contractData, contractItemData, approverName })?.map(
        (item: any) => (
          <div key={item?.id}>
            <Typography variant="h5" sx={{ py: '10px' }}>
              {item?.heading}
            </Typography>
            <Box sx={styles?.mainContainerBox}>
              {item?.detailsData?.map((detail: any) => (
                <div key={item?.id}>
                  <Box sx={styles?.childContainerBox}>
                    <Box sx={{ width: { sm: '20%', xs: '140px' } }}>
                      <Typography variant="body2" fontWeight={500}>
                        {detail?.name}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{ color: theme?.palette?.grey?.[900] }}
                      >
                        {detail?.detail}
                      </Typography>
                    </Box>
                  </Box>
                </div>
              ))}
            </Box>
            <Box sx={styles?.borderBox} />
          </div>
        ),
      )}
    </div>
  );
};
