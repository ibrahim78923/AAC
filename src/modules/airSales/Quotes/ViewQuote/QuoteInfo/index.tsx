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
          <Grid item xs={4}>
            <Box sx={styles?.quoteInfoTitle}>
              Quote No:{' '}
              <Box component="span">{`DOC-${viewQuotesData?.data?._id}`}</Box>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={styles?.quoteInfoTitle}>
              Prepared By: <Box component="span">Adil Khan</Box>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={styles?.quoteInfoTitle}>
              Valid Till:
              <Box component="span">
                {' '}
                {dayjs(viewQuotesData?.expiryDate)?.format(DATE_FORMAT?.API)}
              </Box>
            </Box>
          </Grid>
          {/* <Grid item xs={3}>
            <Box sx={styles?.quoteInfoTitle}>
              Prepared For: <Box component="span">Techcave Sample</Box>
            </Box>
          </Grid> */}
        </Grid>
      </Box>
    </>
  );
};

export default QuoteInfo;
