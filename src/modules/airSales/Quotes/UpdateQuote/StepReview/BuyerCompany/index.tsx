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
              {dataGetQuoteById?.data?.name}
            </Typography>
            <Typography variant="body3" sx={styles?.infoSubtitle}>
              {/* {`${getUserData?.user?.address?.flatNumber ?? ''} ${
                getUserData?.user?.address?.buildingName ?? ''
              } ${getUserData?.user?.address?.buildingNumber ?? ''}` ?? ''} */}
            </Typography>
            <Typography variant="body3" sx={styles?.infoSubtitle}>
              {/* {`${getUserData?.user?.address?.city ?? ''} | ${
                getUserData?.user?.address?.streetName ?? ''
              } | ${getUserData?.user?.postCode ?? ''}`} */}
            </Typography>
            <Typography variant="body3" sx={styles?.infoSubtitle}>
              {dataGetQuoteById?.data?.createdBy?.phoneNumber ?? 'N/A'}
            </Typography>
            <Typography variant="body3" sx={styles?.infoSubtitle}>
              {dataGetQuoteById?.data?.createdBy?.email ?? 'N/A'}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default BuyerCompany;
