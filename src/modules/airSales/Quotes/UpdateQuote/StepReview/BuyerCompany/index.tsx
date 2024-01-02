import { Box, Avatar, Typography } from '@mui/material';
import { styles } from './BuyerCompany.style';
import { AvatarCompanyImage } from '@/assets/images';

const BuyerCompany = () => {
  return (
    <>
      <Box sx={styles?.card}>
        <Box sx={styles?.company}>
          <Avatar src={AvatarCompanyImage?.src} sx={styles?.avatar}>
            OM
          </Avatar>
          <Box>
            <Typography variant="h6" sx={styles?.title}>
              One Care Media
            </Typography>
            <Typography variant="body3" sx={styles?.infoSubtitle}>
              123 Street Address
            </Typography>
            <Typography variant="body3" sx={styles?.infoSubtitle}>
              City | State | Zip Code
            </Typography>
            <Typography variant="body3" sx={styles?.infoSubtitle}>
              Phone No
            </Typography>
            <Typography variant="body3" sx={styles?.infoSubtitle}>
              Company Email
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default BuyerCompany;
