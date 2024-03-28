import { Box, Avatar, Typography } from '@mui/material';
import { styles } from './BuyerCompany.style';
import { AvatarCompanyImage } from '@/assets/images';
import useUpdateQuote from '../../useUpdateQuote';
// import { getSession } from '@/utils';

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
              {dataGetQuoteById?.data?.name ?? 'N/A'}
            </Typography>
            <Typography variant="body3" sx={styles?.infoSubtitle}>
              {dataGetQuoteById?.data?.deal[0]?.companies[0]?.address ?? 'N/A'}
            </Typography>
            <Typography variant="body3" sx={styles?.infoSubtitle}>
              {` ${dataGetQuoteById?.data?.deal[0]?.companies[0]?.city} | ${dataGetQuoteById?.data?.deal[0]?.companies[0]?.postalCode}`}
            </Typography>
            <Typography variant="body3" sx={styles?.infoSubtitle}>
              {dataGetQuoteById?.data?.deal[0]?.companies[0]?.owner
                ?.phoneNumber ?? 'N/A'}
            </Typography>
            <Typography variant="body3" sx={styles?.infoSubtitle}>
              {dataGetQuoteById?.data?.deal[0]?.companies[0]?.owner?.email ??
                'N/A'}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default BuyerCompany;
