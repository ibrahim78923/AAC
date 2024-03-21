import { Box, Grid } from '@mui/material';
import { styles } from './QuoteInfo.style';
import useUpdateQuote from '../../useUpdateQuote';
import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';

const QuoteInfo = () => {
  const { dataGetQuoteById } = useUpdateQuote();

  return (
    <>
      <Box sx={styles?.quoteInfo}>
        <Grid container spacing={'16px'}>
          <Grid item xs={4}>
            <Box sx={styles?.quoteInfoTitle}>
              Quote No:{' '}
              <Box component="span">{dataGetQuoteById?.data?._id ?? 'N/A'}</Box>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={styles?.quoteInfoTitle}>
              Prepared By:{' '}
              <Box component="span">{`${
                dataGetQuoteById?.data?.createdBy?.firstName ?? 'N/A'
              } ${dataGetQuoteById?.data?.createdBy?.lastName ?? 'N/A'}`}</Box>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={styles?.quoteInfoTitle}>
              Valid Till:{' '}
              <Box component="span">
                {dayjs(dataGetQuoteById?.expiryDate)?.format(
                  DATE_FORMAT?.API,
                ) ?? 'N/A'}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default QuoteInfo;
