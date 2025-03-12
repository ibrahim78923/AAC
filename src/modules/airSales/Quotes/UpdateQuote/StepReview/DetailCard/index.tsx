import { Box, Stack, Typography } from '@mui/material';
import { LogoSharedIcon } from '@/assets/icons';
import { useTheme } from '@mui/material/styles';
import { style } from './DetailCard.style';
import useUpdateQuote from '../../useUpdateQuote';

const DetailCard = () => {
  const theme = useTheme();
  const { dataGetQuoteById } = useUpdateQuote();

  const data = dataGetQuoteById?.data;

  return (
    <Box>
      <Box sx={style?.cardDetails} className="air-apple-card">
        <Stack
          gap={2}
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
        >
          <Stack gap="20px" direction={{ xs: 'column', sm: 'row' }}>
            <Box sx={{ mt: '5px' }}>
              <LogoSharedIcon />
            </Box>
            <Stack spacing="5px">
              <Typography variant="h5">{data?.buyerCompany?.name}</Typography>
              <Typography variant="body3">
                {data?.buyerCompany?.phone ??
                  data?.buyerCompany?.owner?.phoneNumber}
              </Typography>
              <Typography variant="body3">
                {data?.buyerCompany?.owner?.email ?? 'N/A'}
              </Typography>
            </Stack>
          </Stack>
          <Box>
            <Stack spacing="5px">
              <Typography variant="h5">Client Information</Typography>
              <Typography variant="body3">
                {data?.buyerContact?.firstName
                  ? `${data?.buyerContact?.firstName} ${data?.buyerContact?.lastName}`
                  : 'N/A'}
              </Typography>
              <Typography variant="body3">
                {data?.buyerContact?.phoneNumber ?? 'N/A'}
              </Typography>
              <Typography variant="body3">
                {data?.buyerContact?.email ?? 'N/A'}
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Box>
      <Box
        className="invoice-detail"
        sx={{
          marginTop: '20px',
          p: '10px',
          bgcolor: theme?.palette?.grey[100],
        }}
      ></Box>
    </Box>
  );
};
export default DetailCard;
