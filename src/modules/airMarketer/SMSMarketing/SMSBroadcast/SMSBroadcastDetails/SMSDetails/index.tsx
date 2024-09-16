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

const SMSDetails = ({
  detailsData,
  isLoading,
  recordStatus,
}: SMSDetailsProps) => {
  const { theme, filters, setFilters, updatedRecords } =
    useSMSBroadcastDetails(detailsData);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {isLoading ? (
          <SkeletonComponent numberOfSkeletons={1} />
        ) : (
          <Stack direction="row" alignItems="center" gap={1}>
            <Avatar />
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
                <MenuItem value={'read'}>Read</MenuItem>
                <MenuItem value={'replied'}>Replied</MenuItem>
                <MenuItem value={'failed'}>Failed</MenuItem>
                <MenuItem value={'Completed'}>Completed</MenuItem>
              </Select>
            </FormControl>
            <Button
              className="small"
              variant="outlined"
              color="inherit"
              endIcon={<ImportIcon />}
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
