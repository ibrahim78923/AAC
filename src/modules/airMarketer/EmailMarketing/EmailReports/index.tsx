import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Skeleton,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import PerformanceChart from './PerformanceChart';
import ActivityChart from './ActivityChart';
import { styles } from './styles';
import RecipientEngagement from './RecipientEngagement';
import {
  DocumentDownloadIcon,
  FilterrIcon,
  RefreshTasksIcon,
} from '@/assets/icons';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_MARKETER_EMAIL_MARKETING_EMAIL_REPORTS_PERMISSIONS } from '@/constants/permission-keys';
import { useGetEmailMarketingReportsQuery } from '@/services/airMarketer/emailReports';
import { useEffect, useRef, useState } from 'react';
import CommonModal from '@/components/CommonModal';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  defaultValues,
  validationSchema,
} from './EmailReportsFilters/Filters.data';
import Filters from './EmailReportsFilters';
import dayjs from 'dayjs';
import {
  API_STATUS,
  DATE_FORMAT,
  DATE_TIME_FORMAT,
  MARKETING_REPORTS_TYPES,
} from '@/constants';
import ReportsDatePicker from './datePicker';
import { htmlToPngConvert } from '@/lib/html-to-image-converter';

const getDefaultDateRange = () => {
  const currentYear = dayjs().year();
  const startOfYear = new Date(currentYear, 0, 1);
  const endOfYear = new Date(currentYear, 11, 31);
  return [startOfYear, endOfYear];
};

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

  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [filtersData, setFiltersData] = useState<any>({});

  const [datePickerVal, setDatePickerVal] = useState<any>(
    getDefaultDateRange(),
  );
  const [selectedIndex, setSelectedIndex] = useState('year');
  const filterTypeValues: any = {
    month: 'MONTHLY',
    year: 'YEARLY',
    custom: 'CUSTOM',
    today: 'TODAY',
    week: 'WEEKLY',
  };

  // Filters methods and operations ++
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });

  const { handleSubmit, reset } = methods;
  const onSubmit = async (values: any) => {
    setFiltersData({ ...filtersData, ...values });
    setIsOpenFilter(false);
  };

  useEffect(() => {
    reset({
      email: filtersData?.email ?? null,
    });
  }, [filtersData]);

  const startedDate = 0;
  const endedDate = 1;
  const handelDateSubmit = async (datePickerValPram: any) => {
    if (datePickerValPram) {
      setFiltersData({
        ...filtersData,
        toDate: datePickerValPram[startedDate],
        fromDate: datePickerValPram[endedDate],
        filterType: filterTypeValues[selectedIndex],
      });
    }
  };

  useEffect(() => {
    setFiltersData({
      ...filtersData,
      toDate: datePickerVal[0],
      fromDate: datePickerVal[1],
      filterType: 'YEARLY',
    });
  }, []);

  const { data, status } = useGetEmailMarketingReportsQuery({
    params: {
      fromEmail: filtersData?.email?.email,
      filterType: filtersData?.filterType ?? 'YEARLY',
      startDate: new Date(
        `${dayjs(filtersData?.toDate)?.format(DATE_FORMAT?.API)}`,
      ).toISOString(),
      endDate: new Date(
        `${dayjs(filtersData?.fromDate)?.format(DATE_FORMAT?.API)}`,
      ).toISOString(),
    },
  });
  const [emailWidgetsData, setEmailWidgetsData] = useState({});
  const [performanceData, setPerformanceData] = useState([]);
  const [calenderUnit, setCalenderUnit] = useState<any>('');

  useEffect(() => {
    if (data?.data) {
      setEmailWidgetsData(data?.data?.emailEngagement[0]);
      setPerformanceData(data?.data?.performance);
    }
  }, [data?.data]);

  useEffect(() => {
    if (data?.data) {
      setCalenderUnit(data?.data?.filterType);
    }
  }, [data]);

  return (
    <Box>
      <Box sx={styles?.emailReportsWrap}>
        <Typography variant="h3">Email Analytics</Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
          }}
        >
          <Button
            onClick={() => setIsOpenFilter(true)}
            className="small"
            startIcon={<FilterrIcon />}
            variant="outlined"
            color="inherit"
            sx={{
              width: { xs: '100%', sm: 'auto', md: 'auto', lg: 'auto' },
            }}
          >
            Filters
          </Button>

          <Box sx={{ marginRight: '5px' }}>
            <ReportsDatePicker
              renderInput="button"
              placement="right"
              defaultIndex="year"
              dateValue={datePickerVal}
              setDateValue={setDatePickerVal}
              setIndexValue={setSelectedIndex}
              handleDateSubmit={() => handelDateSubmit(datePickerVal)}
            />
          </Box>

          <Tooltip title={'Refresh Filter'}>
            <Button
              className="small"
              variant="outlined"
              color="inherit"
              sx={{
                width: { xs: '100%', sm: 'auto', md: 'auto', lg: 'auto' },
              }}
              onClick={() => {
                setFiltersData({});
              }}
            >
              <RefreshTasksIcon />
            </Button>
          </Tooltip>
        </Box>
      </Box>

      <Filters
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        methods={methods}
        isOpenDrawer={isOpenFilter}
        onClose={() => setIsOpenFilter(false)}
      />

      <WidgetsAndGraphs
        emailWidgetsData={emailWidgetsData}
        performanceData={performanceData}
        setIsDownloadModalOpen={setIsDownloadModalOpen}
        status={status}
        calenderUnit={calenderUnit}
        isDownload
      />

      {isDownloadModalOpen && (
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
            <WidgetsAndGraphs
              setIsDownloadModalOpen={setIsDownloadModalOpen}
              emailWidgetsData={emailWidgetsData}
              performanceData={performanceData}
            />
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
      )}
    </Box>
  );
};

const WidgetsAndGraphs = ({
  setIsDownloadModalOpen,
  isDownload,
  emailWidgetsData,
  performanceData,
  status,
  calenderUnit,
}: any) => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={styles?.recipientEngagement}
        style={{ background: theme?.palette?.common?.white }}
      >
        <Typography variant="h4">Recipient Engagement</Typography>
        {status === API_STATUS?.PENDING ? (
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
              {status === API_STATUS?.PENDING ? (
                <BoxLoading />
              ) : (
                <PerformanceChart
                  performanceData={performanceData}
                  calenderUnit={calenderUnit}
                />
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
              {status === API_STATUS?.PENDING ? (
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

export const getCategories: any = (data: any, calendarUnit: string) => {
  return data?.map((entry: any) => {
    const date = dayjs(entry?._id);

    switch (calendarUnit) {
      case MARKETING_REPORTS_TYPES?.YEARLY:
        return date?.format(DATE_TIME_FORMAT?.MMMM);
      case MARKETING_REPORTS_TYPES?.MONTHLY:
        return date?.format(DATE_TIME_FORMAT?.DDMMYYY);
      case MARKETING_REPORTS_TYPES?.WEEKLY:
        return date?.format(DATE_TIME_FORMAT?.DDDD);
      default:
        return date?.format(DATE_TIME_FORMAT?.ddddDDMMMYYY);
    }
  });
};

export default EmailReports;
