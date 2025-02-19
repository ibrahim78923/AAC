import { Avatar, Box, Typography, useTheme, Grid } from '@mui/material';
import { styles } from './BuyerCompany.style';
import useUpdateQuote from '../../useUpdateQuote';
import { generateImage } from '@/utils/avatarUtils';
import DetailCard from '@/modules/airSales/Invoices/ViewInvoice/DetailCard';

const BuyerCompany = () => {
  const { dataGetQuoteById } = useUpdateQuote();
  const theme = useTheme();

  return (
    <>
      <Box sx={styles?.card}>
        <Box sx={styles?.company}>
          <Grid container spacing={2} justifyContent="space-between">
            <Grid item xs={12} md={2}>
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
            </Grid>
            <Grid item xs={2}>
              <Typography sx={styles?.buyerInfoTitle} variant="body1">
                {dataGetQuoteById?.data?.buyerContact?.firstName}{' '}
                {dataGetQuoteById?.data?.buyerContact?.lastName}
              </Typography>
              <Typography sx={styles?.buyerInfoText} variant="body2">
                {dataGetQuoteById?.data?.buyerContact?.phoneNumber ?? 'N/A'}
              </Typography>
              <Typography sx={styles?.buyerInfoText} variant="body2">
                {dataGetQuoteById?.data?.buyerContact?.email}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <DetailCard data={dataGetQuoteById?.data} />
      </Box>
    </>
  );
};

export default BuyerCompany;
