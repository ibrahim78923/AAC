import { Avatar, Box, Typography, useTheme, Grid } from '@mui/material';
import { styles } from './BuyerCompany.style';
import { generateImage } from '@/utils/avatarUtils';

const BuyerCompany = ({ viewQuotesData }: any) => {
  const theme = useTheme();
  return (
    <>
      <Box sx={styles?.card}>
        <Box sx={styles?.company}>
          <Grid
            container
            spacing={2}
            justifyContent="space-between"
            flexWrap="wrap"
            sx={{ padding: '0px 10px 0px', m: 0 }}

          >
            <Grid item xs={12} sm={6} md={4} lg={3} sx={{ p: 0, m: 0 }}>
              <Box display="flex" gap={1}>
                <Avatar
                  alt="user"
                  src={generateImage(
                    viewQuotesData?.data?.buyerCompany?.owner?.profilePicture
                      ?.url,
                  )}
                  sx={{
                    mt: 0.2,
                    width: 35,
                    height: 35,
                    background: theme?.palette?.grey[400],
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ color: theme?.palette?.custom?.dim_grey }}
                  >
                    {viewQuotesData?.data?.buyerCompany?.name
                      ?.charAt(0)
                      ?.toUpperCase()}
                  </Typography>
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={styles?.title(theme)}>
                    {viewQuotesData?.data?.buyerCompany?.name ?? 'N/A'}
                  </Typography>
                  <Typography variant="body2" sx={styles?.infoSubtitle}>
                    {viewQuotesData?.data?.buyerCompany?.owner?.phoneNumber ??
                      'N/A'}
                  </Typography>
                  <Typography variant="body2" sx={styles?.infoSubtitle}>
                    {viewQuotesData?.data?.buyerCompany?.owner?.email ?? 'N/A'}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              sx={{ p: 0, m: 0, minWidth: 'fit-content' }}
            >

              <Typography
                variant="h5"
                color={theme?.palette?.common?.white}
                sx={{ mb: 0.5 }}
              >
                Client Information
              </Typography>
              <Typography sx={styles?.buyerInfoTitle} variant="body1">
                {viewQuotesData?.data?.buyerContact?.firstName}{' '}
                {viewQuotesData?.data?.buyerContact?.lastName}
              </Typography>
              <Typography sx={styles?.buyerInfoText} variant="body2">
                {viewQuotesData?.data?.buyerContact?.phoneNumber ?? 'N/A'}
              </Typography>
              <Typography sx={styles?.buyerInfoText} variant="body2">
                {viewQuotesData?.data?.buyerContact?.email}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default BuyerCompany;
