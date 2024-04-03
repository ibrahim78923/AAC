import { Avatar, Box, Grid, Typography } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { styles } from './Quotes.style';
import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { columns } from './QuotesDrawer.data';
import TanstackTable from '@/components/Table/TanstackTable';
import { v4 as uuidv4 } from 'uuid';

const QuotesDrawer = (props: any) => {
  const { openDrawer, setOpenDrawer, quotesDetails, isLoading } = props;

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
        {isLoading ? (
          <SkeletonTable />
        ) : (
          <Box>
            {quotesDetails?.buyerCompany?.map((item: any) => {
              return (
                <Box sx={styles?.card} key={uuidv4()}>
                  <Box sx={styles?.company}>
                    <Avatar src={''} sx={styles?.avatar}>
                      OM
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={styles?.title}>
                        {item?.name}
                      </Typography>
                      <Typography variant="body3" sx={styles?.infoSubtitle}>
                        {item?.address}
                      </Typography>
                      <Typography variant="body3" sx={styles?.infoSubtitle}>
                        {item?.city} | {item?.postalCode}
                      </Typography>
                      <Typography variant="body3" sx={styles?.infoSubtitle}>
                        {item?.phone ?? 'N/A'}
                      </Typography>
                      <Typography variant="body3" sx={styles?.infoSubtitle}>
                        {item?.email ?? 'N/A'}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              );
            })}
            <Box sx={styles?.quoteInfo}>
              <Grid container spacing={'16px'}>
                <Grid item xs={12}>
                  <Box sx={styles?.quoteInfoTitle}>
                    Quote No:
                    <Box component="span">{quotesDetails?._id}</Box>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={styles?.quoteInfoTitle}>
                    Prepared By:
                    <Box component="span">{`${quotesDetails?.createdBy?.firstName} ${quotesDetails?.createdBy?.lastName}`}</Box>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={styles?.quoteInfoTitle}>
                    Valid Till:
                    <Box component="span">
                      {dayjs(quotesDetails?.expiryDate)?.format(
                        DATE_FORMAT?.UI,
                      )}
                    </Box>
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
                <TanstackTable
                  columns={columns}
                  data={quotesDetails?.products}
                />
              </Box>
            </Box>
          </Box>
        )}
      </CommonDrawer>
    </div>
  );
};

export default QuotesDrawer;
