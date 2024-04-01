import { Avatar, Box, Grid, Typography } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { styles } from './Quotes.style';

const QuotesDrawer = (props: any) => {
  const { openDrawer, setOpenDrawer } = props;

  return (
    <div>
      <CommonDrawer
        isDrawerOpen={openDrawer}
        onClose={() => setOpenDrawer('')}
        title={'View Quote'}
        okText={''}
        isOk={true}
        footer={false}
      >
        <Box>
          <Box sx={styles?.card}>
            <Box sx={styles?.company}>
              <Avatar src={''} sx={styles?.avatar}>
                OM
              </Avatar>
              <Box>
                <Typography variant="h6" sx={styles?.title}>
                  name
                </Typography>
                <Typography variant="body3" sx={styles?.infoSubtitle}>
                  address
                </Typography>
                <Typography variant="body3" sx={styles?.infoSubtitle}>
                  city and postal code
                </Typography>
                <Typography variant="body3" sx={styles?.infoSubtitle}>
                  phone
                </Typography>
                <Typography variant="body3" sx={styles?.infoSubtitle}>
                  email
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={styles?.quoteInfo}>
            <Grid container spacing={'16px'}>
              <Grid item xs={4}>
                <Box sx={styles?.quoteInfoTitle}>
                  Quote No:
                  <Box component="span">DOC</Box>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={styles?.quoteInfoTitle}>
                  Prepared By:
                  <Box component="span">prepared by</Box>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={styles?.quoteInfoTitle}>
                  Valid Till:
                  <Box component="span">date</Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box sx={styles?.card}>This quote is created for pc products.</Box>
          <Box sx={styles?.wrapper}>
            <Typography variant="h5" sx={styles?.heading}>
              Products & Services
            </Typography>

            <Box sx={styles?.tableWrapper}>
              {/* <TanstackTable columns={columns} data={data} /> */}
            </Box>
          </Box>
        </Box>
      </CommonDrawer>
    </div>
  );
};

export default QuotesDrawer;
