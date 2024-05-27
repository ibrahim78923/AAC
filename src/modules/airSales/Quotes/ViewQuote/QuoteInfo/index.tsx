import { Box, Grid } from '@mui/material';
import { styles } from './QuoteInfo.style';
import useViewQuotes from '../useViewQuote';
import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';

const QuoteInfo = () => {
  const { viewQuotesData } = useViewQuotes();
  return (
    <>
      <Box sx={styles?.quoteInfo}>
        <Grid container spacing={'16px'}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <Box sx={styles?.quoteInfoTitle}>
              Quote No:{' '}
              <Box component="span">{`DOC-${viewQuotesData?.data?._id}`}</Box>
            </Box>
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <Box sx={styles?.quoteInfoTitle}>
              Prepared By:{' '}
              <Box component="span">{`${
                viewQuotesData?.data?.createdBy?.firstName ?? 'N/A'
              } ${viewQuotesData?.data?.createdBy?.lastName ?? 'N/A'}`}</Box>
            </Box>
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <Box sx={styles?.quoteInfoTitle}>
              Valid Till:
              <Box component="span">
                {' '}
                {dayjs(viewQuotesData?.data?.expiryDate)?.format(
                  DATE_FORMAT?.API,
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default QuoteInfo;
