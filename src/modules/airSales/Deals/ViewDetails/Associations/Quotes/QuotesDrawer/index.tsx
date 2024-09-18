import { Avatar, Box, Grid, Typography, useTheme } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { styles } from './Quotes.style';
import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { columns } from './QuotesDrawer.data';
import TanstackTable from '@/components/Table/TanstackTable';
import { QuotesDrawerProps } from '../../Associations-interface';
import { capitalizeFirstLetter } from '@/utils/api';

const QuotesDrawer = (props: QuotesDrawerProps) => {
  const theme = useTheme();
  const { openDrawer, setOpenDrawer, quotesDetails, isLoading } = props;

  return (
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
        <Box sx={styles?.card}>
          <Box sx={styles?.company}>
            <Avatar sx={styles?.avatar} alt="avatar-image">
              <Typography variant="body1" color={theme?.palette?.grey[600]}>
                {capitalizeFirstLetter(
                  quotesDetails?.buyerCompany?.name?.charAt(0),
                )}
              </Typography>
            </Avatar>
            <Box>
              <Typography variant="h6" sx={styles?.title}>
                {quotesDetails?.buyerCompany?.name ?? 'N/A'}
              </Typography>
              <Typography variant="body3" sx={styles?.infoSubtitle}>
                {quotesDetails?.buyerCompany?.address ?? 'N/A'}
              </Typography>
              <Typography variant="body3" sx={styles?.infoSubtitle}>
                {quotesDetails?.buyerCompany?.city ?? 'N/A'} |{' '}
                {quotesDetails?.buyerCompany?.postalCode ?? 'N/A'}
              </Typography>
              <Typography variant="body3" sx={styles?.infoSubtitle}>
                {quotesDetails?.buyerCompany?.owner.phoneNumber ?? 'N/A'}
              </Typography>
              <Typography variant="body3" sx={styles?.infoSubtitle}>
                {quotesDetails?.buyerCompany?.owner.email ?? 'N/A'}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
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
                {dayjs(quotesDetails?.expiryDate)?.format(DATE_FORMAT?.UI)}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={styles?.quoteInfoTitle}>
              Prepared For:
              <Box component="span">{quotesDetails?.activityType}</Box>
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
          <TanstackTable columns={columns} data={quotesDetails?.products} />
        </Box>
      </Box>
    </CommonDrawer>
  );
};

export default QuotesDrawer;
