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
            {dataGetQuoteById?.data?.buyerCompany?.map((item: any) => {
              return (
                <>
                  <Avatar
                    alt="user"
                    src={generateImage(item?.owner?.profilePicture?.url)}
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
                      {item?.name?.charAt(0)}
                      {item?.name?.charAt(item?.name?.length - 1)}
                    </Typography>
                  </Avatar>
                  <Typography variant="h6" sx={styles?.title}>
                    {item?.name ?? 'N/A'}
                  </Typography>
                  <Typography variant="body3" sx={styles?.infoSubtitle}>
                    {item?.address ?? 'N/A'}
                  </Typography>

                  <Typography variant="body3" sx={styles?.infoSubtitle}>
                    {` ${item?.city ?? 'N/A'} | ${item?.postalCode ?? 'N/A'}`}
                  </Typography>
                  <Typography variant="body3" sx={styles?.infoSubtitle}>
                    {item?.phone ?? 'N/A'}
                  </Typography>
                  <Typography variant="body3" sx={styles?.infoSubtitle}>
                    {item?.owner?.email ?? 'N/A'}
                  </Typography>
                </>
              );
            })}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default BuyerCompany;
