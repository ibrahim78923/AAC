import { Box, Typography, useTheme } from '@mui/material';
import { assetsReceiveData } from './AssetsReceived.data';
import { v4 as uuidv4 } from 'uuid';
import { styles } from '../AssetsReceived.style';

export const AssetsReceivedDetail = () => {
  const theme = useTheme();
  return (
    <>
      <Box mb={3}>
        <Typography variant="h4">Logitech M705 Wireless Mouse</Typography>
        <Typography
          variant="body2"
          sx={{ color: theme.palette.custom.main, fontWeight: 500 }}
        >
          Assets which are received and added to inventory are shown here
        </Typography>
      </Box>
      {assetsReceiveData.map((item) => (
        <Box key={uuidv4()} sx={styles.assetsCard}>
          <Box sx={styles.cardDetail}>
            <Typography variant="body2" fontWeight={600} sx={styles.cardText}>
              {item?.asset}
            </Typography>
            <Box sx={styles.cardLine(theme)}></Box>
          </Box>
          <Box sx={styles.cardDetail}>
            <Typography variant="body3" sx={styles.cardText}>
              {item?.type}
            </Typography>
            <Box sx={styles.cardLine(theme)}></Box>
          </Box>
          <Typography variant="body3" sx={styles.cardText}>
            Location:- {item?.location}
          </Typography>
        </Box>
      ))}
    </>
  );
};
