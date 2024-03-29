import { Box, Avatar, Typography } from '@mui/material';
import { styles } from './BuyerCompany.style';
import { AvatarCompanyImage } from '@/assets/images';
import useViewQuotes from '../useViewQuote';

const BuyerCompany = () => {
  const { viewQuotesData } = useViewQuotes();

  return (
    <>
      <Box sx={styles?.card}>
        <Box sx={styles?.company}>
          <Avatar src={AvatarCompanyImage?.src} sx={styles?.avatar}>
            OM
          </Avatar>
          <Box>
            <Typography variant="h6" sx={styles?.title}>
              {viewQuotesData?.data?.name}
            </Typography>
            <Typography variant="body3" sx={styles?.infoSubtitle}>
              {viewQuotesData?.data?.deal[0]?.companies[0]?.address}
            </Typography>
            <Typography variant="body3" sx={styles?.infoSubtitle}>
              {` ${viewQuotesData?.data?.deal[0]?.companies[0]?.city} | ${viewQuotesData?.data?.deal[0]?.companies[0]?.postalCode}`}
            </Typography>
            <Typography variant="body3" sx={styles?.infoSubtitle}>
              {viewQuotesData?.data?.deal[0]?.companies[0]?.owner?.phoneNumber}
            </Typography>
            <Typography variant="body3" sx={styles?.infoSubtitle}>
              {viewQuotesData?.data?.deal[0]?.companies[0]?.owner?.email}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default BuyerCompany;
