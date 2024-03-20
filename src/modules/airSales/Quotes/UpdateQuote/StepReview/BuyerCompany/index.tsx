import { Box, Avatar, Typography } from '@mui/material';
import { styles } from './BuyerCompany.style';
import { AvatarCompanyImage } from '@/assets/images';
import useUpdateQuote from '../../useUpdateQuote';

const BuyerCompany = () => {
  const { dataGetQuoteById } = useUpdateQuote();

  return (
    <>
      <Box sx={styles?.card}>
        <Box sx={styles?.company}>
          <Avatar src={AvatarCompanyImage?.src} sx={styles?.avatar}>
            OM
          </Avatar>
          <Box>
            <Typography variant="h6" sx={styles?.title}>
              {dataGetQuoteById?.data?.name}
            </Typography>
            <Typography variant="body3" sx={styles?.infoSubtitle}>
              {dataGetQuoteById?.data?.deal[0]?.companies[0]?.address}
            </Typography>
            <Typography variant="body3" sx={styles?.infoSubtitle}>
              City | State | Zip Code
              {` ${dataGetQuoteById?.data?.deal[0]?.companies[0]?.city} | ${dataGetQuoteById?.data?.deal[0]?.companies[0]}`}
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
