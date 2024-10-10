import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Skeleton,
  Typography,
  useTheme,
} from '@mui/material';
import PerformanceChart from './PerformanceChart';
import ActivityChart from './ActivityChart';
import { styles } from './styles';
import RecipientEngagement from './RecipientEngagement';
import { DocumentDownloadIcon } from '@/assets/icons';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_MARKETER_EMAIL_MARKETING_EMAIL_REPORTS_PERMISSIONS } from '@/constants/permission-keys';
import { useGetEmailMarketingReportsQuery } from '@/services/airMarketer/emailReports';
import { useRef, useState } from 'react';
import CommonModal from '@/components/CommonModal';
import { htmlToPngConvert } from '@/utils/file';

const EmailReports = () => {
  const theme = useTheme();
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const chartRef = useRef<HTMLDivElement>(null);

  const handlePrint = async () => {
    setIsLoading(true);
    try {
      await htmlToPngConvert(chartRef, 'white', 'Email Analytics');
    } finally {
      setIsLoading(false);
      setIsDownloadModalOpen(false);
    }
  };

  return (
    <Box>
      <Box sx={styles?.emailReportsWrap}>
        <Typography variant="h3">Email Analytics</Typography>
      </Box>

      <WidgetsAndGraphs
        setIsDownloadModalOpen={setIsDownloadModalOpen}
        isDownload
      />

      <CommonModal
        open={isDownloadModalOpen}
        handleClose={() => setIsDownloadModalOpen(false)}
        handleCancel={() => setIsDownloadModalOpen(false)}
        title="Email Analytics"
        footer={false}
        cancelIcon={false}
        width={'85vw'}
        background={theme?.palette?.primary?.light}
      >
        <Box ref={chartRef}>
          <WidgetsAndGraphs setIsDownloadModalOpen={setIsDownloadModalOpen} />
        </Box>

        {isLoading ? (
          <Box
            sx={{
              position: 'absolute',
              top: '25px',
              right: '25px',
            }}
          >
            <CircularProgress size={25} />
          </Box>
        ) : (
          <IconButton
            sx={{
              position: 'absolute',
              top: '2px',
              right: '10px',
            }}
            onClick={() => {
              setIsLoading(true);
              handlePrint();
            }}
          >
            <DocumentDownloadIcon width={'55'} />
          </IconButton>
        )}
      </CommonModal>
    </Box>
  );
};

const WidgetsAndGraphs = ({ setIsDownloadModalOpen, isDownload }: any) => {
  const theme = useTheme();

  const { data, isLoading } = useGetEmailMarketingReportsQuery({ params: {} });
  const emailWidgetsData = data?.data?.emailEngagement[0];
  const performanceData = data?.data?.performance;

  return (
    <>
      <Box
        sx={styles?.recipientEngagement}
        style={{ background: theme?.palette?.common?.white }}
      >
        <Typography variant="h4">Recipient Engagement</Typography>
        {isLoading ? (
          <WidgetsLoading />
        ) : (
          <RecipientEngagement emailWidgetsData={emailWidgetsData} />
        )}
      </Box>
      <Box>
        <Box sx={{ ...styles?.emailReportsWrap, my: 2 }}>
          <Typography variant="h4">Email Chart</Typography>
          <PermissionsGuard
            permissions={[
              AIR_MARKETER_EMAIL_MARKETING_EMAIL_REPORTS_PERMISSIONS.DOWNLOAD_REPORTS,
            ]}
          >
            {isDownload && (
              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                onClick={() => setIsDownloadModalOpen(true)}
              >
                <DocumentDownloadIcon />
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 400, color: '#38CAB5' }}
                >
                  Download Reports
                </Typography>
              </Box>
            )}
          </PermissionsGuard>
        </Box>
        <Grid container spacing={2}>
          <Grid item md={8} xs={12}>
            <Box
              sx={styles?.performaceWrap}
              style={{ background: theme?.palette?.common?.white }}
            >
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                Performance
              </Typography>
              {isLoading ? (
                <BoxLoading />
              ) : (
                <PerformanceChart performanceData={performanceData} />
              )}
            </Box>
          </Grid>
          <Grid item md={4} xs={12}>
            <Box
              sx={styles?.performaceWrap}
              style={{ background: theme?.palette?.common?.white }}
            >
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                Activity
              </Typography>
              {isLoading ? (
                <BoxLoading />
              ) : (
                <ActivityChart emailWidgetsData={emailWidgetsData} />
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

const WidgetsLoading = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '20px',
        flexWrap: 'wrap',
      }}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8]?.map((item) => (
        <Box key={item}>
          <Skeleton variant="circular" width={120} height={120} />
          <center>
            <Skeleton
              variant="rounded"
              width={100}
              height={20}
              sx={{ mt: 1 }}
            />
          </center>
        </Box>
      ))}
    </Box>
  );
};
const BoxLoading = () => {
  return (
    <Skeleton
      variant="rounded"
      sx={{ width: '100%', height: '300px', mt: 2 }}
    />
  );
};

export default EmailReports;
