import { ARRAY_INDEX } from '@/constants/strings';
import { BORDER_RADIUS, MARGIN } from '@/constants/style';
import { progressBarColors } from '@/modules/airServices/FeedbackSurvey/UserResponsesAnalysis/UserResponsesAnalysis.data';
import { Box, LinearProgress, Typography } from '@mui/material';

export const MultiLevelLinearProgressBar = (props: any) => {
  const { valuesArray = [] } = props;

  return (
    <>
      <Box>
        {valuesArray?.map((item: any, index: any) => (
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
                width: `${item?.value}%`,
                display: 'inline-block',
                '.MuiLinearProgress-bar': {
                  borderRadius: `${
                    index === ARRAY_INDEX?.ZERO
                      ? BORDER_RADIUS?.['10px']
                      : BORDER_RADIUS?.[0]
                  }`,
                  backgroundColor: progressBarColors?.[item?.impact],
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
              {item?.value}%
            </Typography>
          </Box>
        ))}
      </Box>
    </>
  );
};
