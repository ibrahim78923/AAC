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
            {viewQuotesData?.data?.buyerCompany?.map(
              (
                item: any, // change reqiure by BE Side
              ) => (
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
              ),
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default BuyerCompany;
