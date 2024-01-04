import { Box, Grid } from '@mui/material';
import { styles } from './QuoteInfo.style';

const QuoteInfo = () => {
  return (
    <>
      <Box sx={styles?.quoteInfo}>
        <Grid container spacing={'16px'}>
          <Grid item xs={3}>
            <Box sx={styles?.quoteInfoTitle}>
              Quote No: <Box component="span">Doc-3</Box>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={styles?.quoteInfoTitle}>
              Prepared By: <Box component="span">Adil Khan</Box>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={styles?.quoteInfoTitle}>
              Valid Till: <Box component="span">April 9,2023</Box>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={styles?.quoteInfoTitle}>
              Prepared For: <Box component="span">Techcave Sample</Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default QuoteInfo;
