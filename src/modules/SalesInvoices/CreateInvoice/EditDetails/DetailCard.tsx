import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import {
  clientDetails,
  cardDetails,
  invoiceDetail,
} from '@/mock/modules/SalesInvoices/index';
import { LogoSharedIcon } from '@/assets/icons';
import { useTheme } from '@mui/material/styles';
import { style } from './EditDetail.style';
import { v4 as uuidv4 } from 'uuid';

const DetailCard = () => {
  const theme = useTheme();

  return (
    <Box>
      <Box sx={style?.cardDetails} className="air-apple-card">
        <Stack
          gap={2}
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
        >
          <Stack gap="20px" direction="row">
            <Box sx={{ mt: '5px' }}>
              <LogoSharedIcon />
            </Box>
            {cardDetails.map((item: any) => (
              <Box key={uuidv4()}>
                <Typography variant="h5">{item.label}</Typography>
                {item.details?.map((val: any) => (
                  <Typography key={uuidv4()}>{val.title}</Typography>
                ))}
              </Box>
            ))}
          </Stack>
          <Box>
            {clientDetails.map((item: any) => (
              <Stack gap="5px" key={uuidv4()}>
                <Typography variant="h5">{item.label}</Typography>
                {item.details?.map((val: any) => (
                  <Typography key={uuidv4()}>{val.title}</Typography>
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
              <Typography sx={{ fontWeight: 'bold' }}>{item.title}:</Typography>
              <Typography>{item.value}</Typography>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};
export default DetailCard;
