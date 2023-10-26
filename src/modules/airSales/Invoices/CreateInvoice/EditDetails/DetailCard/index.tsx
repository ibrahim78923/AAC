import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import {
  clientDetails,
  cardDetails,
  invoiceDetail,
} from '@/mock/modules/airSales/SalesInvoices';
import { LogoSharedIcon } from '@/assets/icons';
import { useTheme } from '@mui/material/styles';
import { style } from '../EditDetail.style';
import { v4 as uuidv4 } from 'uuid';

const DetailCard = () => {
  const theme = useTheme();

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
            {cardDetails.map((item: any) => (
              <Stack spacing="5px" key={uuidv4()}>
                <Typography variant="h5">{item.label}</Typography>
                {item.details?.map((val: any) => (
                  <Typography key={uuidv4()} variant="body1">
                    {val.title}
                  </Typography>
                ))}
              </Stack>
            ))}
          </Stack>
          <Box>
            {clientDetails.map((item: any) => (
              <Stack gap="5px" key={uuidv4()}>
                <Typography variant="h5">{item.label}</Typography>
                {item.details?.map((val: any) => (
                  <Typography key={uuidv4()} variant="body1">
                    {val.title}
                  </Typography>
                ))}
              </Stack>
            ))}
          </Box>
        </Stack>
      </Box>
      <Box
        className="invoice-detail"
        sx={{ marginTop: '20px', p: '10px', bgcolor: theme.palette?.grey[100] }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
        >
          {invoiceDetail?.map((item) => (
            <Stack direction="row" gap="3px" key={uuidv4()}>
              <Typography variant="body2" fontWeight={500}>
                {item.title}:
              </Typography>
              <Typography variant="body2">{item.value}</Typography>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};
export default DetailCard;
