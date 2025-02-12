import { Avatar, Box, Typography, useTheme } from '@mui/material';
import { styles } from './BuyerCompany.style';
import useViewQuotes from '../useViewQuote';
import { generateImage } from '@/utils/avatarUtils';
import { capitalizeFirstLetter } from '@/utils/api';

const BuyerCompany = () => {
  const { viewQuotesData } = useViewQuotes();
  const theme = useTheme();

  return (
    <>
      <Box sx={styles?.card}>
        <Box sx={styles?.company}>
          <Box>
            <Avatar
              alt="user"
              src={generateImage(
                viewQuotesData?.data?.buyerCompany?.owner?.profilePicture?.url,
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
                {capitalizeFirstLetter(
                  viewQuotesData?.data?.buyerCompany?.owner?.firstName?.charAt(
                    0,
                  ),
                )}
                {capitalizeFirstLetter(
                  viewQuotesData?.data?.buyerCompany?.owner?.lastName?.charAt(
                    0,
                  ),
                )}
              </Typography>
            </Avatar>
            <Typography variant="h6" sx={styles?.title}>
              {viewQuotesData?.data?.buyerCompany?.owner?.firstName
                ? `${viewQuotesData?.data?.buyerCompany?.owner?.firstName} ${viewQuotesData?.data?.buyerCompany?.owner?.lastName}`
                : 'N/A'}
            </Typography>
            <Typography variant="body3" sx={styles?.infoSubtitle}>
              {viewQuotesData?.data?.buyerCompany?.owner?.address ?? 'N/A'}
            </Typography>
            <Typography variant="body3" sx={styles?.infoSubtitle}>
              {viewQuotesData?.data?.buyerCompany?.owner?.phoneNumber ?? 'N/A'}
            </Typography>
            <Typography variant="body3" sx={styles?.infoSubtitle}>
              {viewQuotesData?.data?.buyerCompany?.owner?.email ?? 'N/A'}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default BuyerCompany;
