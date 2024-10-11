import { HeaderInfoIcon } from '@/assets/icons';
import CommonDrawer from '@/components/CommonDrawer';
import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  LinearProgress,
  Typography,
  useTheme,
} from '@mui/material';
import { BarChart } from '@mui/x-charts';
import { chartSetting, dataset } from './ViewDetails.data';
import { useGetSingleForecastGoalsQuery } from '@/services/airSales/forecast';
import { isNullOrEmpty } from '@/utils';
import dayjs from 'dayjs';
import { DATE_TIME_FORMAT, goalsStatus } from '@/constants';
import { capitalizeFirstLetter } from '@/utils/api';

const ViewDetailsDrwaer = (props: any) => {
  const { isOpenDrawer, onClose, tableRowValues, user } = props;
  const theme = useTheme();
  const valueFormatter = (value: number | null) => `${value}mm`;

  const { data: getOneGoal, isLoading } = useGetSingleForecastGoalsQuery(
    { id: tableRowValues, user: user === 'User' ? false : true },
    { skip: isNullOrEmpty(tableRowValues) },
  );
  const currentDate = dayjs();

  const endDate = dayjs(getOneGoal?.data?.endDate);
  const remainingDays = endDate.diff(currentDate, 'day');

  return (
    <CommonDrawer
      isDrawerOpen={isOpenDrawer}
      title="Revenue Goal"
      okText="Apply"
      onClose={onClose}
      isOk={true}
      isCancel={false}
      footer={false}
    >
      {isLoading ? (
        <Box
          display={'flex'}
          alignItems={'center'}
          height={'85vh'}
          justifyContent={'center'}
        >
          {' '}
          <CircularProgress />{' '}
        </Box>
      ) : (
        <Box>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Typography variant="body1" fontWeight={'600'}>
              {capitalizeFirstLetter(getOneGoal?.data?.goalName)}
            </Typography>
            <Typography
              sx={{
                backgroundColor:
                  getOneGoal?.data?.status === goalsStatus?.expired
                    ? theme?.palette?.custom?.light_purple
                    : theme?.palette?.custom?.light_yellow_bg,
                color:
                  getOneGoal?.data?.status === goalsStatus?.expired
                    ? theme?.palette?.error?.main
                    : theme?.palette?.warning?.main,
                padding: '2px 7px',
                borderRadius: '20px',
              }}
            >
              {getOneGoal?.data?.status ?? '---'}
            </Typography>
          </Box>
          <Typography mt={2} variant="body2">
            Admin Services
          </Typography>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <LinearProgress
              sx={{
                color: theme?.Palette?.primary?.main,
                height: '5px',
                width: '90%',
              }}
              variant="determinate"
              value={getOneGoal?.data?.percentageAchieved}
            />
            <Typography variant="body4">
              {getOneGoal?.data?.percentageAchieved}%
            </Typography>
          </Box>
          <Typography
            mt={1}
            mb={1}
            display={'flex'}
            alignItems={'center'}
            variant="body3"
          >
            {' '}
            Last updated on{' '}
            {dayjs(getOneGoal?.data?.updatedAt)?.format(
              DATE_TIME_FORMAT?.MMMMD,
            )}{' '}
            &nbsp; <HeaderInfoIcon />
          </Typography>

          <Divider />

          <Typography
            mt={2}
            mb={1}
            display={'flex'}
            alignItems={'center'}
            variant="body1"
            fontWeight={'600'}
            color={theme?.palette?.custom?.main}
          >
            {' '}
            {getOneGoal?.data?.duration} Target Over Time &nbsp;{' '}
            <HeaderInfoIcon />{' '}
          </Typography>
          <Typography
            display={'flex'}
            alignItems={'center'}
            variant="body2"
            fontWeight={'500'}
          >
            {' '}
            Date Range: From{' '}
            {dayjs(getOneGoal?.data?.startDate)?.format(
              DATE_TIME_FORMAT?.DDMMYYY,
            )}
            &nbsp; to &nbsp;
            {dayjs(getOneGoal?.data?.endDate)?.format(
              DATE_TIME_FORMAT?.DDMMYYY,
            )}
          </Typography>

          <BarChart
            dataset={dataset}
            xAxis={[{ scaleType: 'band', dataKey: 'date' }]} // Ensure the x-axis is of type "band"
            series={[{ dataKey: 'seoul', valueFormatter }]}
            layout="vertical"
            barSize={20}
            grid={{ horizontal: true }}
            {...chartSetting}
          />

          <Box
            sx={{
              padding: '15px',
              borderRadius: '6px',
              borderTop: `1px solid ${theme?.palette?.custom?.light_gray_shadow}`,
              borderBottom: `1px solid ${theme?.palette?.custom?.light_gray_shadow}`,
            }}
          >
            <Typography
              display={'flex'}
              alignItems={'center'}
              variant="body2"
              fontWeight={'500'}
            >
              {' '}
              Date Range: From{' '}
              {dayjs(getOneGoal?.data?.startDate)?.format(
                DATE_TIME_FORMAT?.DDMMYYY,
              )}
              &nbsp; to &nbsp;
              {dayjs(getOneGoal?.data?.endDate)?.format(
                DATE_TIME_FORMAT?.DDMMYYY,
              )}
            </Typography>

            <Grid container spacing={2} mt={1}>
              <Grid
                item
                xs={4}
                sx={{
                  borderRight: '1px solid lightgrey',
                  padding: '13px !important',
                }}
              >
                <Typography variant="body3" color={theme?.palette?.grey[900]}>
                  REMAINING GOAL TARGET
                </Typography>
                <Typography variant="h5" color={theme?.palette?.grey[800]}>
                  £{' '}
                  {`${getOneGoal?.data?.target}` -
                    `${getOneGoal?.data?.totalAmountAchieved}`}
                </Typography>
              </Grid>
              <Grid
                item
                xs={4}
                sx={{
                  borderRight: '1px solid lightgrey',
                  padding: '13px !important',
                }}
              >
                <Typography variant="body3" color={theme?.palette?.grey[900]}>
                  Days Until Due
                </Typography>
                <Typography
                  variant="h5"
                  color={
                    getOneGoal?.data?.status === goalsStatus?.expired
                      ? theme?.palette?.error?.main
                      : theme?.palette?.grey[800]
                  }
                >
                  {getOneGoal?.data?.status === goalsStatus?.expired
                    ? getOneGoal?.data?.status
                    : remainingDays}
                </Typography>
              </Grid>
              <Grid item xs={4} sx={{ padding: '13px !important' }}>
                <Typography variant="body3" color={theme?.palette?.grey[900]}>
                  Current progress
                </Typography>
                <Typography variant="h5" color={theme?.palette?.grey[800]}>
                  £ {getOneGoal?.data?.totalAmountAchieved}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Box
            mt={2}
            sx={{
              padding: '10px',
              borderRadius: '6px',
              borderTop: `1px solid ${theme?.palette?.custom?.light_gray_shadow}`,
            }}
          >
            <Typography
              mb={1}
              display={'flex'}
              alignItems={'center'}
              variant="body1"
              fontWeight={'600'}
              color={theme?.palette?.custom?.main}
            >
              {' '}
              Details
            </Typography>

            <Box
              mt={1}
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Typography variant="body2" color={theme?.palette?.custom?.main}>
                Goal Target
              </Typography>
              <Typography variant="body2" color={theme?.palette?.custom?.main}>
                £{getOneGoal?.data?.target}
              </Typography>
            </Box>
            <Box
              mt={1}
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Typography variant="body2" color={theme?.palette?.custom?.main}>
                Deal Pipelines
              </Typography>
              <Typography
                variant="body2"
                color={theme?.palette?.slateBlue?.main}
                sx={{
                  background: theme?.palette?.custom?.light_gray_bg,
                  borderRadius: '20px',
                  padding: '2px 8px',
                }}
              >
                {getOneGoal?.data?.pipelines
                  ?.map((pipeline: any) => pipeline?.name)
                  ?.join(', ')}
              </Typography>
            </Box>
            <Box
              mt={1}
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Typography variant="body2" color={theme?.palette?.custom?.main}>
                Duration
              </Typography>
              <Typography variant="body2" color={theme?.palette?.custom?.main}>
                {getOneGoal?.data?.duration}
              </Typography>
            </Box>
            <Box
              mt={1}
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Typography variant="body2" color={theme?.palette?.custom?.main}>
                Start Date
              </Typography>
              <Typography variant="body2" color={theme?.palette?.custom?.main}>
                {dayjs(getOneGoal?.data?.startDate)?.format(
                  DATE_TIME_FORMAT?.DDMMYYY,
                )}
              </Typography>
            </Box>
            <Box
              mt={1}
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Typography variant="body2" color={theme?.palette?.custom?.main}>
                End Date
              </Typography>
              <Typography variant="body2" color={theme?.palette?.custom?.main}>
                {dayjs(getOneGoal?.data?.endDate)?.format(
                  DATE_TIME_FORMAT?.DDMMYYY,
                )}
              </Typography>
            </Box>
            <Box
              mt={1}
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Typography variant="body2">Goal Created By</Typography>
              <Typography variant="body2">
                {getOneGoal?.data?.createdBy?.firstName}{' '}
                {getOneGoal?.data?.createdBy?.lastName}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </CommonDrawer>
  );
};

export default ViewDetailsDrwaer;
