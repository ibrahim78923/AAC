import { Box, Typography } from '@mui/material';
import { overviewData } from './Overview.data';
import { styles } from './Overview.style';
import { useOverview } from './useOverview';

export const Overview = () => {
  const { theme, inventoryData } = useOverview();
  return (
    <Box>
      {overviewData(inventoryData)?.map((item: any) => (
        <Box key={item?._id}>
          <Typography variant="h5" py={'.5rem'}>
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
                    <Typography variant="body2" color={theme.palette.grey[900]}>
                      {detail?.detail}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
          <Box sx={styles?.borderBox} />
        </Box>
      ))}
    </Box>
  );
};
