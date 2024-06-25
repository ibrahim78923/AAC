import { Avatar, Box, Typography, useTheme } from '@mui/material';
import { styles } from './BuyerCompany.style';
import useUpdateQuote from '../../useUpdateQuote';
import { generateImage } from '@/utils/avatarUtils';

const BuyerCompany = () => {
  const { dataGetQuoteById } = useUpdateQuote();
  const theme = useTheme();

  return (
    <>
      <Box sx={styles?.card}>
        <Box sx={styles?.company}>
          <Box>
            <Avatar
              alt="user"
              src={generateImage(
                dataGetQuoteById?.data?.buyerCompany?.owner?.profilePicture
                  ?.url,
              )}
              sx={{
                width: 35,
                height: 35,
                background: theme?.palette?.grey[400],
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: theme?.palette?.custom?.dim_grey,
                }}
              >
                {dataGetQuoteById?.data?.buyerCompany?.name?.charAt(0)}
                {dataGetQuoteById?.data?.buyerCompany?.name?.charAt(
                  dataGetQuoteById?.data?.buyerCompany?.name?.length - 1,
                )}
              </Typography>
            </Avatar>
            <Typography variant="h6" sx={styles?.title}>
              {dataGetQuoteById?.data?.buyerCompany?.name ?? 'N/A'}
            </Typography>
            <Typography variant="body3" sx={styles?.infoSubtitle}>
              {dataGetQuoteById?.data?.buyerCompany?.address ?? 'N/A'}
            </Typography>

            <Typography variant="body3" sx={styles?.infoSubtitle}>
              {` ${dataGetQuoteById?.data?.buyerCompany?.city ?? 'N/A'} | ${
                dataGetQuoteById?.data?.buyerCompany?.postalCode ?? 'N/A'
              }`}
            </Typography>
            <Typography variant="body3" sx={styles?.infoSubtitle}>
              {dataGetQuoteById?.data?.buyerCompany?.phone ?? 'N/A'}
            </Typography>
            <Typography variant="body3" sx={styles?.infoSubtitle}>
              {dataGetQuoteById?.data?.buyerCompany?.owner?.email ?? 'N/A'}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default BuyerCompany;
