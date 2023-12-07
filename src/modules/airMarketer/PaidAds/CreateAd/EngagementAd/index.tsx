import { MockUpImage } from '@/assets/images';
import { Box, Card } from '@mui/material';
import Image from 'next/image';
import { styles } from '../CreateAd.style';

const EngagementAd = () => {
  return (
    <Box sx={styles?.cardStyle}>
      <Card
        sx={{
          height: '70vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image src={MockUpImage} alt="eng-img" />
      </Card>
    </Box>
  );
};

export default EngagementAd;
