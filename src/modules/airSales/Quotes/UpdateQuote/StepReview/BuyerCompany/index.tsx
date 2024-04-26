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
            {dataGetQuoteById?.data?.buyerCompany?.map((item: any) => (
              <>
                <Typography variant="h6" sx={styles?.title}>
                  {item?.name ?? 'N/A'}
                </Typography>
                <Typography variant="body3" sx={styles?.infoSubtitle}>
                  {item?.address ?? 'N/A'}
                </Typography>

                <Typography variant="body3" sx={styles?.infoSubtitle}>
                  {` ${item?.city} | ${item?.postalCode}`}
                </Typography>
                <Typography variant="body3" sx={styles?.infoSubtitle}>
                  {item?.phoneNumber ?? 'N/A'}
                </Typography>
                <Typography variant="body3" sx={styles?.infoSubtitle}>
                  {item?.email ?? 'N/A'}
                </Typography>
              </>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default BuyerCompany;
