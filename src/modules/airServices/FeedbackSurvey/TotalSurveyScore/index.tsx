import { CustomCircularProgressBar } from '@/components/CustomCircularProgressBar';
import { Box, Typography, useTheme } from '@mui/material';

export const TotalSurveyScore = (props: any) => {
  const { data } = props;
  const theme = useTheme();
  return (
    <Box boxShadow={2} p={2} borderRadius={2} height={'100%'}>
      <Typography variant="body4" color="slateBlue.main" component={'p'}>
        Total Survey Score
      </Typography>
      <br />
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        gap={2.5}
        flexWrap={'wrap'}
        my={1}
      >
        <Box>
          <CustomCircularProgressBar
            size={150}
            thickness={3}
            progressColor={theme?.palette?.warning?.main}
            value={data?.value}
          />
        </Box>
        <Box flex={1}>
          <Typography variant="h4" color="slateBlue.main">
            Very Good
          </Typography>
          <Typography variant="body2" color="slateBlue.main">
            Awesome!
          </Typography>
          <Typography variant="body4" color="slateBlue.main">
            The overall average of this survey scaled answers indicates a
            positive result. This means that you’re generally doing a good job
            keeping your people happy, specifically in connection to topics
            brought up in this survey.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
