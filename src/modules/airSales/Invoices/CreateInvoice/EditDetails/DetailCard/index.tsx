import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { LogoSharedIcon } from '@/assets/icons';
import { useTheme } from '@mui/material/styles';
import { style } from '../EditDetail.style';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '../../../../../../constants/index';
import { isNullOrEmpty } from '@/utils';

const DetailCard = ({ data }: any) => {
  const theme = useTheme();

  const calculateDueDate = (invoiceDate: any) => {
    return dayjs(invoiceDate)
      ?.add(15, 'day')
      ?.format(DATE_FORMAT?.UI);
  };

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
              <Typography variant="h5">Air Apple Car</Typography>
              <Typography variant="body3">
                {isNullOrEmpty(data)
                  ? '----'
                  : data?.deal[0]?.companies[0]?.address}
              </Typography>
              <Typography variant="body3">
                {isNullOrEmpty(data)
                  ? '----'
                  : data?.deal[0]?.companies[0]?.city}
              </Typography>
              <Typography variant="body3">
                {isNullOrEmpty(data)
                  ? '----'
                  : data?.deal[0]?.companies[0]?.domain}
              </Typography>
            </Stack>
          </Stack>
          <Box>
            <Stack spacing="5px">
              <Typography variant="h5">Client Information</Typography>
              <Typography variant="body3">
                {isNullOrEmpty(data)
                  ? '----'
                  : data?.deal[0]?.companies[0]?.address}
              </Typography>
              <Typography variant="body3">
                {isNullOrEmpty(data)
                  ? '----'
                  : data?.deal[0]?.companies[0]?.city}
              </Typography>
              <Typography variant="body3">
                {isNullOrEmpty(data)
                  ? '----'
                  : data?.deal[0]?.companies[0]?.domain}
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
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
        >
          <Stack direction="row" gap="3px" key={uuidv4()}>
            <Typography variant="body2" fontWeight={500}>
              Invoice No:
            </Typography>
            <Typography variant="body2">
              {isNullOrEmpty(data) ? '----' : data?.invoiceNo}
            </Typography>
          </Stack>
          <Stack direction="row" gap="3px" key={uuidv4()}>
            <Typography variant="body2" fontWeight={500}>
              Invoice Date:
            </Typography>
            <Typography variant="body2">
              {isNullOrEmpty(data)
                ? '----'
                : dayjs(data?.createdAt).format(DATE_FORMAT?.UI)}
            </Typography>
          </Stack>
          <Stack direction="row" gap="3px" key={uuidv4()}>
            <Typography variant="body2" fontWeight={500}>
              Due Date:
            </Typography>
            <Typography variant="body2">
              {isNullOrEmpty(data)
                ? '----'
                : calculateDueDate(data?.expiryDate)}
            </Typography>
          </Stack>
          <Stack direction="row" gap="3px" key={uuidv4()}>
            <Typography variant="body2" fontWeight={500}>
              Prepared By:
            </Typography>
            <Typography variant="body2">
              {isNullOrEmpty(data) ? '----' : data?.name}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};
export default DetailCard;
