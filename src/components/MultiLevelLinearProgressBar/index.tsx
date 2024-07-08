import { ARRAY_INDEX, PERCENTAGES_VALUES } from '@/constants/strings';
import { BORDER_RADIUS, MARGIN } from '@/constants/style';
import { progressBarColorsLinearScale } from '@/modules/airServices/FeedbackSurvey/UserResponsesAnalysis/UserResponsesAnalysis.data';
import { Box, LinearProgress, Typography } from '@mui/material';

export const MultiLevelLinearProgressBar = (props: any) => {
  const { valuesArray = [] } = props;
  return (
    <>
      <Box>
        {valuesArray
          ?.filter((item: any) => item?.percentage !== PERCENTAGES_VALUES?.ZERO)
          ?.map((item: any, index: any) => (
            <Box
              key={item?._id}
              sx={{ position: 'relative', marginBottom: '4px' }}
              component={'span'}
            >
              <LinearProgress
                variant="determinate"
                value={100}
                sx={{
                  borderRadius: `${
                    index === ARRAY_INDEX?.ZERO
                      ? BORDER_RADIUS?.['10px']
                      : BORDER_RADIUS?.['0 10px 10px 0']
                  }`,
                  marginLeft: `${
                    index === ARRAY_INDEX?.ZERO ? MARGIN?.[0] : MARGIN?.['-4px']
                  }`,
                  zIndex: `${valuesArray?.length - index}`,
                  height: '20px',
                  width: `${item?.percentage}%`,
                  display: 'inline-block',
                  '.MuiLinearProgress-bar': {
                    borderRadius: `${
                      index === ARRAY_INDEX?.ZERO
                        ? BORDER_RADIUS?.['10px']
                        : BORDER_RADIUS?.[0]
                    }`,
                    backgroundColor: progressBarColorsLinearScale?.[item?.text],
                  },
                }}
              />
              <Typography
                variant="body4"
                component="div"
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: 'common.white',
                  zIndex: valuesArray?.length + 1,
                }}
              >
                {`${Math?.round(item?.percentage)}%`}
              </Typography>
            </Box>
          ))}
      </Box>
    </>
  );
};
