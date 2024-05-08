import { Avatar, Box, Typography, useTheme } from '@mui/material';
import { styles } from './BuyerCompany.style';
// import { AvatarCompanyImage } from '@/assets/images';
import useUpdateQuote from '../../useUpdateQuote';
import { generateImage } from '@/utils/avatarUtils';
// import { getSession } from '@/utils';

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
                    src={generateImage(item?.owner?.profilePicture?.url)}
                    sx={{
                      color: theme?.palette?.grey[600],
                      fontWeight: 500,
                    }}
                  >
                    {`${item?.firstName?.charAt(0)}${item?.lastName?.charAt(
                      0,
                    )}`}
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
