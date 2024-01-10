import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import {
  clientDetails,
  cardDetails,
} from '@/mock/modules/airSales/SalesInvoices';
import { LogoSharedIcon } from '@/assets/icons';
import { useTheme } from '@mui/material/styles';
import { style } from '../EditDetail.style';
import { v4 as uuidv4 } from 'uuid';
import ChooseQuotes from '../../ChooseQuotes';
import useDetailCard from './useDetailCard';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '../../../../../../constants/index';

const DetailCard = () => {
  const theme = useTheme();
  const { user } = useDetailCard();

  const calculateDueDate = (invoiceDate: any) => {
    return dayjs(invoiceDate)
      ?.add(15, 'day')
      ?.format(DATE_FORMAT?.UI);
  };

  return (
    <Box>
      <ChooseQuotes />
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
            {cardDetails?.map((item: any) => (
              <Stack spacing="5px" key={uuidv4()}>
                <Typography variant="h5">{item?.label}</Typography>
                {item?.details?.map((val: any) => (
                  <Typography key={uuidv4()} variant="body3">
                    {val?.title}
                  </Typography>
                ))}
              </Stack>
            ))}
          </Stack>
          <Box>
            {clientDetails?.map((item: any) => (
              <Stack gap="5px" key={uuidv4()}>
                <Typography variant="h5">{item?.label}</Typography>
                {item?.details?.map((val: any) => (
                  <Typography key={uuidv4()} variant="body3">
                    {val?.title}
                  </Typography>
                ))}
              </Stack>
            ))}
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
            <Typography variant="body2">---</Typography>
          </Stack>
          <Stack direction="row" gap="3px" key={uuidv4()}>
            <Typography variant="body2" fontWeight={500}>
              Invoice Date:
            </Typography>
            <Typography variant="body2">
              {dayjs(user?.createdAt).format(DATE_FORMAT?.UI)}
            </Typography>
          </Stack>
          <Stack direction="row" gap="3px" key={uuidv4()}>
            <Typography variant="body2" fontWeight={500}>
              Due Date:
            </Typography>
            <Typography variant="body2">
              {calculateDueDate(user?.createdAt)}
            </Typography>
          </Stack>
          <Stack direction="row" gap="3px" key={uuidv4()}>
            <Typography variant="body2" fontWeight={500}>
              Prepared By:
            </Typography>
            <Typography variant="body2">
              {user?.firstName} {user?.lastName}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};
export default DetailCard;
