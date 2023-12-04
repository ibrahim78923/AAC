import { MockUpImage } from '@/assets/images';
import { Card } from '@mui/material';
import Image from 'next/image';

const EngagementAd = () => {
  return (
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
  );
};

export default EngagementAd;
