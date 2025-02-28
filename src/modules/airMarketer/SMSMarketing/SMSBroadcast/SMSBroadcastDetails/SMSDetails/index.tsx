import {
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import Search from '@/components/Search';
import SMSDetailsTable from './SMSDetailsTable';
import ImportIcon from '@/assets/icons/shared/import-icon';
import SkeletonComponent from '@/components/CardSkeletons';
import useSMSBroadcastDetails from '../useSMSBroadcastDetails';
import { SMSDetailsProps } from '@/modules/airMarketer/SMSMarketing/SMSBroadcast/SMSBroadcast-interface';
import StatusCards from '../../../SMSDashboard/StatusCards';
import { STATUS_CONTANTS } from '@/constants/strings';
import { capitalizeFirstLetter } from '@/utils/api';
import { enqueueSnackbar } from 'notistack';

const SMSDetails = ({
  detailsData,
  isLoading,
  recordStatus,
}: SMSDetailsProps) => {
  const { theme, filters, setFilters, updatedRecords } =
    useSMSBroadcastDetails(detailsData);

  const exportToCSV: any = () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(
      currentDate.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}-${currentDate
      .getDate()
      .toString()
      .padStart(2, '0')}_${currentDate
      .getHours()
      .toString()
      .padStart(2, '0')}-${currentDate
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;

    const fileName = `Sms_Marketing_Data_${formattedDate}.csv`;

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [
        'First Name,Last Name,Phone Number,Status',
        ...detailsData?.recipients?.map(
          (val: any) =>
            `${val?.firstName},${val?.lastName},="${val?.phoneNumber}",${
              val?.status || 'N/A'
            }`,
        ),
      ].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    enqueueSnackbar('File Exported Successfully', { variant: 'success' });
  };

  return (
    <Grid container spacing={2} mt={1}>
      <Grid item xs={12}>
        {isLoading ? (
          <SkeletonComponent numberOfSkeletons={1} />
        ) : (
          <>
            <Stack direction="row" alignItems="center" gap={1} mb={2}>
              <Avatar sx={{ color: theme?.palette?.grey[600] }}>
                {capitalizeFirstLetter(detailsData?.campaign?.title?.charAt(0))}
              </Avatar>
              <Box>
                <Typography
                  variant="body2"
                  fontWeight={700}
                  sx={{
                    color: theme?.palette?.custom?.text_slate_blue,
                    fontSize: '15px',
                  }}
                >
                  {detailsData?.campaign?.title ?? 'N/A'}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '13px' }}>
                  Just Now
                </Typography>
              </Box>
            </Stack>
            {detailsData?.status !== STATUS_CONTANTS?.DRAFT &&
              detailsData?.status !== STATUS_CONTANTS?.SCHEDULED && (
                <StatusCards
                  analytics={detailsData?.statisticsData}
                  isDashboard={false}
                  isLoading={isLoading}
                />
              )}
          </>
        )}
      </Grid>
      <Grid item xs={12} lg={5}>
        {isLoading ? (
          <Skeleton height={250} />
        ) : (
          <Box
            sx={{
              width: '100%',
              height: '203px',
              padding: '16px',
              border: `1px solid ${theme?.palette?.custom?.off_white_three}`,
              borderRadius: '8px',
            }}
          >
            <Typography
              dangerouslySetInnerHTML={{
                __html: detailsData?.detail,
              }}
            />
          </Box>
        )}
      </Grid>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" my={2}>
          <Search
            size="small"
            placeholder="Search Here"
            onChange={(e: any) => {
              setFilters({ ...filters, search: e?.target?.value });
            }}
          />
          <Box sx={{ gap: 1, display: 'flex' }}>
            <FormControl size="small">
              <Select
                sx={{ height: '36px' }}
                value={filters?.status}
                defaultValue="All"
                onChange={(e: any) => {
                  setFilters({ ...filters, status: e?.target?.value });
                }}
              >
                <MenuItem value={'All'}>All</MenuItem>
                <MenuItem value={'sent'}>Sent</MenuItem>
                <MenuItem value={'delivered'}>Delivered</MenuItem>
                <MenuItem value={'undelivered'}>Undelivered</MenuItem>
                <MenuItem value={'failed'}>Failed</MenuItem>
                <MenuItem value={'Completed'}>Completed</MenuItem>
              </Select>
            </FormControl>
            <Button
              className="small"
              variant="outlined"
              color="inherit"
              endIcon={<ImportIcon />}
              onClick={() => exportToCSV()}
            >
              Export
            </Button>
          </Box>
        </Stack>
        <SMSDetailsTable
          recipientsData={updatedRecords}
          loading={isLoading}
          recordStatus={recordStatus}
        />
      </Grid>
    </Grid>
  );
};

export default SMSDetails;
