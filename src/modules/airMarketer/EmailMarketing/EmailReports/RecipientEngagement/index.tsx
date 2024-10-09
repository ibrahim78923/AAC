import { Box, CircularProgress, Typography } from '@mui/material';
import { receipentEngagementData } from './RecipientEngagement.data';
import { styles } from './RecipientEngagement.style';

const RecipientEngagement = ({ emailWidgetsData }: any) => {
  return (
    <Box sx={styles.recipientWrap}>
      {receipentEngagementData(emailWidgetsData)?.map((item: any) => (
        <Box key={item?.id}>
          <Box sx={styles?.recipientHeading}>
            <CircularProgress
              variant="determinate"
              value={item?.default ? 0 : item?.value}
              size="7rem"
              sx={{
                background: 'rgba(235,250,248,1)',
                borderRadius: '50%',
              }}
            />
            <Typography variant="subtitle1" sx={styles?.subTitle}>
              {item.default ? item?.value : `${Math?.round(item?.value)}%`}
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ textAlign: 'center' }}>
            {item?.heading}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default RecipientEngagement;
