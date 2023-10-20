import { Box, Typography, useTheme } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { overViewData } from './Overview.data';
import { styles } from './Overview.style';
export const Overview = () => {
  const theme = useTheme();

  return (
    <div>
      {overViewData?.map((item) => (
        <div key={uuidv4()}>
          <Typography variant="h5" sx={{ py: '10px' }}>
            {item?.heading}
          </Typography>
          <Box sx={styles.mainContainerBox}>
            {item?.DetailsData?.map((detail) => (
              <div key={uuidv4()}>
                <Box sx={styles.chlidContainerBox}>
                  <Box sx={{ width: { sm: '20%', xs: '140px' } }}>
                    <Typography variant="body2" fontWeight={500}>
                      {detail?.name}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.grey[900] }}
                    >
                      {detail?.detail}
                    </Typography>
                  </Box>
                </Box>
              </div>
            ))}
          </Box>
          <Box sx={styles.borderBox} />
        </div>
      ))}
    </div>
  );
};
