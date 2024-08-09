import Link from 'next/link';
import {
  Box,
  Button,
  Grid,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import ReportCard from './ReportCard';
import SwitchableDatepicker from '@/components/SwitchableDatepicker';
import useLeadsReports from './useLeadsReports';
import { DownloadIcon, RefreshSharedIcon } from '@/assets/icons';
import { AIR_MARKETER } from '@/routesConstants/paths';
import { AIR_MARKETER_REPORTS_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';

const LeadaReports = () => {
  const theme = useTheme();
  const {
    dateValue,
    setDateValue,
    handleApplyDate,
    handleRefresh,
    dataGetLeadsStats,
    loagingGetStats,
    fetchingGetStats,
  } = useLeadsReports();

  const statsData = dataGetLeadsStats?.data;

  return (
    <PermissionsGuard
      permissions={[AIR_MARKETER_REPORTS_PERMISSIONS?.LEAD_CTAS]}
    >
      <Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          gap={1}
          mb={2}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Link href={AIR_MARKETER?.REPORTS}>
              <ArrowBack sx={{ mt: 1 }} />
            </Link>
            <Typography
              variant="h3"
              sx={{ color: theme?.palette?.slateBlue['main'] }}
            >
              Leads CTAs
            </Typography>
          </Box>
          <Box display="flex" flexWrap="wrap" alignItems="center" gap={1}>
            <SwitchableDatepicker
              placement="right"
              renderInput={'button'}
              dateValue={dateValue}
              setDateValue={setDateValue}
              handleDateSubmit={handleApplyDate}
              maxDate={new Date()}
            />
            <Tooltip title={'Refresh Filter'} placement="top-start" arrow>
              <Button
                className="small"
                variant="outlined"
                color="inherit"
                onClick={handleRefresh}
              >
                <RefreshSharedIcon />
              </Button>
            </Tooltip>
            <Button
              sx={{ p: 0 }}
              className="small"
              variant="outlined"
              color="inherit"
            >
              <DownloadIcon />
            </Button>
          </Box>
        </Box>

        <Box>
          <Typography
            sx={{ color: theme?.palette?.slateBlue['main'], my: 2 }}
            variant="h5"
          >
            CTA Report
          </Typography>

          <Grid container spacing={2}>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <ReportCard
                title="CTA Rate"
                value={`${statsData?.totalClickRate}%`}
                isLoading={loagingGetStats || fetchingGetStats}
              />
            </Grid>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <ReportCard
                title="CTA Clicks"
                value={statsData?.totalClickCount}
                isLoading={loagingGetStats || fetchingGetStats}
              />
            </Grid>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <ReportCard
                title="CTA Views"
                value={statsData?.totalViewCount}
                isLoading={loagingGetStats || fetchingGetStats}
              />
            </Grid>
          </Grid>
        </Box>

        <Box>
          <Typography
            sx={{ color: theme?.palette?.slateBlue['main'], my: 2 }}
            variant="h5"
          >
            Leads Forms Report
          </Typography>

          <Grid container spacing={2}>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <ReportCard
                title="Form Views"
                value={statsData?.totalViews}
                isLoading={loagingGetStats || fetchingGetStats}
              />
            </Grid>

            <Grid item lg={4} md={4} sm={6} xs={12}>
              <ReportCard
                title="Entrances"
                value={statsData?.totalEntrances}
                isLoading={loagingGetStats || fetchingGetStats}
              />
            </Grid>

            <Grid item lg={4} md={4} sm={6} xs={12}>
              <ReportCard
                title="Total Submission"
                value={statsData?.totalSubmissions}
                isLoading={loagingGetStats || fetchingGetStats}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </PermissionsGuard>
  );
};

export default LeadaReports;
