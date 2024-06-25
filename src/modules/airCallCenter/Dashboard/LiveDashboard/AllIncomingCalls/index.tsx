import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import { styles } from './AllIncomingCalls.style';
import { CustomChart } from '@/components/Chart';

export const AllIncomingCalls = () => {
  const theme = useTheme();

  const callsCardsData = [
    {
      id: 1,
      count: '70',
      Heading: 'All incoming calls',
      para: (
        <>
          67% of calls were answered
          <br /> within the threshold of 30s
        </>
      ),
      color: theme?.palette?.success?.main,
    },
    {
      id: 2,
      count: '64',
      Heading: 'Global Queue',
      para: (
        <>
          46% of calls were answered
          <br /> within the threshold of 30s
        </>
      ),
      color: theme?.palette?.warning?.main,
    },
    {
      id: 3,
      count: '67',
      Heading: 'New Call Queue ',
      para: (
        <>
          100% of calls were answered
          <br /> within the threshold of 25s
        </>
      ),
      color: theme?.palette?.warning?.main,
    },
    {
      id: 4,
      count: '15',
      Heading: 'Queue 2',
      para: (
        <>
          15% of calls were answered
          <br /> within the threshold of 30s
        </>
      ),
      color: theme?.palette?.error?.main,
    },
  ];

  const allInComingCardsData = [
    {
      id: 1,
      time: '43s',
      Heading: 'average wait time',
      color: theme?.palette?.primary?.main,
      bgColor: theme?.palette?.primary?.lighter,
    },
    {
      id: 2,
      time: '43s',
      Heading: 'service level threshold',
      color: theme?.palette?.success?.main,
      bgColor: theme?.palette?.custom?.light_success,
    },
    {
      id: 3,
      time: '09s',
      Heading: 'average  time to answer',
      color: theme?.palette?.blue?.main,
      bgColor: theme?.palette?.custom?.light_blue,
    },
    {
      id: 4,
      time: '42s',
      Heading: 'average handle time',
      color: theme?.palette?.warning?.main,
      bgColor: theme?.palette?.custom?.light_warning,
    },
    {
      id: 5,
      time: '1 mints 43 s',
      Heading: 'longest wait time',
      color: theme?.palette?.custom?.bright,
      bgColor: theme?.palette?.custom?.lighter_blue,
    },
    {
      id: 6,
      time: '09s',
      Heading: 'average talk time',
      color: theme?.palette?.error?.main,
      bgColor: theme?.palette?.custom?.light_error,
    },
  ];

  const CustomCircularProgress = ({ value, color }: any) => {
    const customStyles = {
      root: {
        color: color,
        width: '77px',
        height: '77px',
      },
      circle: {
        strokeLinecap: 'round',
      },
    };

    return (
      <Box position="relative" display="inline-flex">
        <CircularProgress
          variant="determinate"
          value={value}
          style={customStyles.root}
          classes={{ circle: customStyles?.circle }}
          size={100}
          thickness={3}
          sx={{
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            },
          }}
        />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            display="flex"
            alignItems="center"
            justifyContent="center"
            variant="body2"
            fontWeight={500}
            component="div"
            color="common.black"
          >
            {`${Math.round(15)}%`}
          </Typography>
        </Box>
      </Box>
    );
  };
  const chartOptions: any = {
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: {
          margin: 0,
          size: '80%',
          background: 'transparent',
        },
        dataLabels: {
          name: {
            offsetY: 40,
            color: theme?.palette?.success?.main,
            fontFamily: theme?.typography?.fontFamily,
            fontSize: '32px',
            fontWeight: 700,
          },
          value: {
            offsetY: -20,
            color: theme?.palette?.blue?.main,
            fontSize: '48px',
            fontWeight: 600,
            fontFamily: theme?.typography?.fontFamily,
            show: true,
            formatter: function (val: any) {
              return `${val}%`;
            },
          },
        },
      },
    },
    colors: [theme?.palette?.success?.main],
    labels: ['Good'],
    series: [70],
    stroke: {
      lineCap: 'round',
    },
    legend: {
      show: false,
    },
  };
  return (
    <Box sx={styles.mainDiv(theme)}>
      <Grid container>
        {callsCardsData?.map((item: any) => (
          <Grid item xs={12} sm={6} md={4} xl={3} key={item?.id}>
            <Box sx={styles?.innerBox}>
              <Box
                sx={{
                  backgroundColor: item?.color,
                  width: '77px',
                  height: '77px',
                  opacity: '.2',
                  margin: 'auto',
                  borderRadius: '50%',
                  position: 'absolute',
                  left: '50%',
                  right: '50%',
                  transform: 'translate(-40px, 0px)',
                }}
              >
                {' '}
              </Box>
              {/* <CircularProgress variant="determinate" value={item?.count} style={customStyles(item?.color).root} /> */}
              <CustomCircularProgress value={item?.count} color={item?.color} />
              <Typography
                variant="body1"
                sx={{
                  marginTop: '25px',
                  color: theme?.palette?.slateBlue?.main,
                }}
              >
                {item?.Heading}{' '}
              </Typography>
              <Typography
                variant="body3"
                sx={{ color: theme?.palette?.custom?.cadet_color }}
              >
                {item?.para}{' '}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Divider sx={{ my: 2, borderColor: 'grey.700' }} />
      <Typography
        variant="h4"
        sx={{ color: theme?.palette?.grey[800], marginTop: '20px' }}
      >
        All Incoming Calls
      </Typography>
      <Typography sx={{ color: theme?.palette?.custom?.cadet_color }}>
        service level metrics
      </Typography>

      <Grid container>
        <Grid item xs={12} sm={6} md={4}>
          <CustomChart
            options={chartOptions}
            series={chartOptions.series}
            type="radialBar"
            height={350}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          <Grid container spacing={3}>
            {allInComingCardsData?.map((item: any) => (
              <Grid item xs={12} sm={6} md={4} key={item?.id}>
                <Box
                  sx={{
                    backgroundColor: item?.bgColor,
                    padding: '16px',
                    borderRadius: '8px',
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ color: item?.color, textTransform: 'capitalize' }}
                  >
                    {item?.Heading}
                  </Typography>
                  <Typography
                    variant="body3"
                    sx={{ color: theme?.palette?.blue?.light }}
                  >
                    {item?.time}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
