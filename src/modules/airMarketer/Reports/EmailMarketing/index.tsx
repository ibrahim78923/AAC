import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Skeleton,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { EmailCardsData } from './UserReports.data';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import LinearProgress from '@mui/material/LinearProgress';
import { DownloadIcon, RefreshTasksIcon } from '@/assets/icons';
import { AIR_MARKETER } from '@/routesConstants/paths';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_MARKETER_REPORTS_PERMISSIONS } from '@/constants/permission-keys';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { useGetEmailMarketingReportsQuery } from '@/services/airMarketer/emailReports';
import { API_STATUS, DATE_FORMAT, MARKETING_REPORTS_TYPES } from '@/constants';
import ReportsDatePicker from '../../EmailMarketing/EmailReports/datePicker';
import ReportsGraph from './ReportsGraph';
import EmailOverviewGraph from './EmailOverviewGraph';
import { calculatePercentage } from '@/utils';
import { htmlToPngConvert } from '@/utils/file';

const getDefaultDateRange = () => {
  const currentYear = dayjs().year(); // Get current year
  const startOfYear = new Date(currentYear, 0, 1); // January 1st
  const endOfYear = new Date(currentYear, 11, 31); // December 31st
  return [startOfYear, endOfYear]; // Return start and end dates
};

const EmailMarketing = () => {
  const theme = useTheme();

  const [filtersData, setFiltersData] = useState<any>({});

  const [datePickerVal, setDatePickerVal] = useState<any>(
    getDefaultDateRange(),
  );
  const [selectedIndex, setSelectedIndex] = useState('year');
  const filterTypeValues: any = {
    month: MARKETING_REPORTS_TYPES?.MONTHLY,
    year: MARKETING_REPORTS_TYPES?.YEARLY,
    custom: MARKETING_REPORTS_TYPES?.CUSTOM,
    today: MARKETING_REPORTS_TYPES?.TODAY,
    week: MARKETING_REPORTS_TYPES?.WEEKLY,
  };

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
  const [emailWidgetsData, setEmailWidgetsData] = useState<any>({});
  const [performanceData, setPerformanceData] = useState<any>([]);
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

  const [isLoading, setIsLoading] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  const handlePrint = async () => {
    setIsLoading(true);
    try {
      await htmlToPngConvert(chartRef, 'white', 'Email Analytics');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PermissionsGuard
      permissions={[AIR_MARKETER_REPORTS_PERMISSIONS?.EMAIL_MARKETING]}
    >
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
            Email Marketing
          </Typography>
        </Box>
        <Box
          display="flex"
          flexWrap="wrap"
          alignItems="center"
          fontSize="16px"
          fontWeight={500}
          gap={1}
        >
          <ReportsDatePicker
            renderInput="button"
            placement="right"
            defaultIndex="year"
            dateValue={datePickerVal}
            setDateValue={setDatePickerVal}
            setIndexValue={setSelectedIndex}
            handleDateSubmit={() => handelDateSubmit(datePickerVal)}
          />
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
          <Button
            sx={{ p: 0 }}
            className="small"
            variant="outlined"
            color="inherit"
            onClick={handlePrint}
          >
            {isLoading ? <CircularProgress size={20} /> : <DownloadIcon />}
          </Button>
        </Box>
      </Box>

      <Box ref={chartRef}>
        {status === API_STATUS?.PENDING ? (
          <Grid container item spacing={3} sx={{ mb: 2 }}>
            {[1, 2, 3, 4]?.map(() => (
              <Grid key={uuidv4()} item lg={3} md={4} sm={6} xs={12}>
                <Skeleton
                  variant="rounded"
                  sx={{ width: '100%', height: '105px' }}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container item spacing={3}>
            {EmailCardsData(emailWidgetsData)?.map((item: any) => (
              <Grid item lg={3} md={4} sm={6} xs={12} key={uuidv4()}>
                <Card
                  sx={{
                    border: `1px solid ${theme?.palette?.custom?.hawkes_blue}`,
                    mb: 2,
                    height: 100,
                  }}
                >
                  <CardContent
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 16,
                        color: theme?.palette?.custom?.steel_blue_alpha,
                        fontWeight: 500,
                      }}
                      gutterBottom
                    >
                      {item?.reportView}
                    </Typography>
                    <Typography
                      sx={{
                        mb: 1.5,
                        fontSize: 24,
                        color: theme?.palette?.custom?.turquoise_Blue,
                        fontWeight: 600,
                      }}
                    >
                      {item?.Values}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {status === API_STATUS?.PENDING ? (
          <Grid container spacing={3} sx={{ mb: 2 }}>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <Skeleton
                variant="rounded"
                sx={{ width: '100%', height: '216px' }}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <Skeleton
                variant="rounded"
                sx={{ width: '100%', height: '216px' }}
              />
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={3}>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <MarketingDataRates
                title={'Open Rate'}
                percentage={calculatePercentage(
                  emailWidgetsData?.open ?? 0,
                  emailWidgetsData?.total,
                ).toFixed(0)}
                color={theme?.palette?.warning['main']}
                data={[
                  {
                    title: 'Successfully Deliveries',
                    value: emailWidgetsData?.delivered,
                    isPercentage: false,
                  },
                  {
                    title: 'Unique Open Rates',
                    value: calculatePercentage(
                      emailWidgetsData?.open ?? 0,
                      emailWidgetsData?.total,
                    ).toFixed(0),
                    isPercentage: true,
                  },
                  {
                    title: 'Last Open Rates',
                    value: calculatePercentage(
                      emailWidgetsData?.open ?? 0,
                      emailWidgetsData?.total,
                    ).toFixed(0),
                    isPercentage: true,
                  },
                ]}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <MarketingDataRates
                title={'Click Rate'}
                percentage={calculatePercentage(
                  emailWidgetsData?.click ?? 0,
                  emailWidgetsData?.total,
                ).toFixed(0)}
                color={theme?.palette?.success?.main}
                data={[
                  {
                    title: 'Total Clicks',
                    value: calculatePercentage(
                      emailWidgetsData?.click ?? 0,
                      emailWidgetsData?.total,
                    ).toFixed(0),
                    isPercentage: false,
                  },
                  {
                    title: 'Unique Clicks Rates',
                    value: calculatePercentage(
                      emailWidgetsData?.click ?? 0,
                      emailWidgetsData?.total,
                    ).toFixed(0),
                    isPercentage: true,
                  },
                  {
                    title: 'Unsubscribe Rates',
                    value: calculatePercentage(
                      emailWidgetsData?.unsubscribe ?? 0,
                      emailWidgetsData?.total,
                    ).toFixed(0),
                    isPercentage: true,
                  },
                ]}
              />
            </Grid>
          </Grid>
        )}

        {status === API_STATUS?.PENDING ? (
          <>
            <Skeleton
              variant="rounded"
              sx={{ width: '100%', height: '300px' }}
            />
          </>
        ) : (
          <>
            <Box
              sx={{
                border: `1px solid ${theme?.palette?.custom?.hawkes_blue}`,
                borderRadius: '8px',
                p: 2,
                mb: 2,
              }}
            >
              <Typography sx={{ fontSize: '18px', fontWeight: '600' }}>
                Reports
              </Typography>
              <ReportsGraph
                performanceData={performanceData}
                calenderUnit={calenderUnit}
              />
            </Box>

            <Box
              sx={{
                border: `1px solid ${theme?.palette?.custom?.hawkes_blue}`,
                borderRadius: '8px',
                p: 2,
              }}
            >
              <Typography sx={{ fontSize: '18px', fontWeight: '600' }}>
                Email Overview
              </Typography>
              <EmailOverviewGraph
                performanceData={performanceData}
                calenderUnit={calenderUnit}
              />
            </Box>
          </>
        )}
      </Box>
    </PermissionsGuard>
  );
};

const MarketingDataRates = ({ title, percentage, data, color }: any) => {
  const theme = useTheme();
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Grid container>
          <Grid item xs={3}>
            <Typography
              sx={{
                fontSize: '16px',
                color: color,
                fontWeight: 600,
              }}
              gutterBottom
            >
              {title}
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Box
              sx={{
                mb: 1.5,
              }}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'space-between'}
              gap={'30px'}
            >
              <Box gap={1} sx={{ width: '87%' }}>
                <LinearProgress
                  variant="determinate"
                  value={percentage}
                  sx={{
                    height: '13px',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: color,
                    },
                  }}
                />
              </Box>
              <Typography
                variant="h4"
                sx={{
                  textAlign: 'end',
                  color: color,
                }}
              >
                {percentage}%
              </Typography>
            </Box>
          </Grid>
        </Grid>
        {data &&
          data?.map((item: any) => (
            <Box
              key={uuidv4()}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 1.5,
              }}
            >
              <Typography
                sx={{
                  fontSize: '16px',
                  fontWeight: 500,
                  color: theme?.palette?.blue?.lighter,
                }}
              >
                {item?.title}
              </Typography>
              <Typography
                sx={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: theme?.palette?.blue?.lighter,
                }}
              >
                {item?.value}
                {item?.isPercentage && <>%</>}
              </Typography>
            </Box>
          ))}
      </CardContent>
    </Card>
  );
};

export default EmailMarketing;
