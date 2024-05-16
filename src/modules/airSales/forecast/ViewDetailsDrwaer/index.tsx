import { HeaderInfoIcon } from '@/assets/icons';
import CommonDrawer from '@/components/CommonDrawer';
import {
  Box,
  Divider,
  Grid,
  LinearProgress,
  Typography,
  useTheme,
} from '@mui/material';
import { BarChart } from '@mui/x-charts';
import { chartSetting, dataset } from './ViewDetails.data';

const ViewDetailsDrwaer = (props: any) => {
  const { isOpenDrawer, onClose } = props;
  const theme = useTheme();
  const valueFormatter = (value: number | null) => `${value}mm`;

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
      <Box>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Typography variant="body1" fontWeight={'600'}>
            Testers
          </Typography>
          <Typography
            sx={{
              backgroundColor: theme?.palette?.custom?.light_yellow_bg,
              color: theme?.palette?.warning?.main,
              padding: '2px 7px',
              borderRadius: '20px',
            }}
          >
            In-Progress
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
            value={30}
          />
          <Typography variant="body4">30%</Typography>
        </Box>
        <Typography
          mt={1}
          mb={1}
          display={'flex'}
          alignItems={'center'}
          variant="body3"
        >
          {' '}
          Last updated on April 27th at 5:20pm &nbsp; <HeaderInfoIcon />{' '}
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
          Monthly Target Over Time &nbsp; <HeaderInfoIcon />{' '}
        </Typography>
        <Typography
          display={'flex'}
          alignItems={'center'}
          variant="body2"
          fontWeight={'500'}
        >
          {' '}
          Date Range: From 4/1/2023 to 4/30/2023
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
            Date Range: From 4/1/2023 to 4/30/2023
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
                £1200.00
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
              <Typography variant="h5" color={theme?.palette?.grey[800]}>
                2
              </Typography>
            </Grid>
            <Grid item xs={4} sx={{ padding: '13px !important' }}>
              <Typography variant="body3" color={theme?.palette?.grey[900]}>
                Current progress
              </Typography>
              <Typography variant="h5" color={theme?.palette?.grey[800]}>
                £0.00
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
              £1200.00
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
              Registering Pipeline
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
              Monthly
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
              04/01/2023
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
              04/30/2023
            </Typography>
          </Box>
          <Box
            mt={1}
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Typography variant="body2">Goal Created By</Typography>
            <Typography variant="body2">Dea Gea</Typography>
          </Box>
        </Box>
      </Box>
    </CommonDrawer>
  );
};

export default ViewDetailsDrwaer;
