import { Box, LinearProgress, Typography } from '@mui/material';
import { Fragment } from 'react';
import { progressBarColors } from './MultipleSelectionResponse.data';

export const MultipleSelectionResponse = (props: any) => {
  const { answers, question } = props;

  return (
    <Box bgcolor={'common.white'} p={2} boxShadow={1} borderRadius={2}>
      <Typography variant="body2">{question}</Typography>
      {answers?.map((answer: any) => (
        <Fragment key={answer?.option}>
          <Typography variant="body2" component={'p'}>
            {answer?.option}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
              <LinearProgress
                variant="determinate"
                value={answer?.value}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  '&.MuiLinearProgress-colorPrimary': {
                    backgroundColor: 'transparent',
                  },
                  '.MuiLinearProgress-bar': {
                    borderRadius: 5,
                    backgroundColor: progressBarColors?.[answer?.impact],
                  },
                }}
              />
            </Box>
            <Box sx={{ minWidth: 35 }}>
              <Typography
                variant="body2"
                color="text.secondary"
              >{`${Math?.round(answer?.value)}%`}</Typography>
            </Box>
          </Box>
        </Fragment>
      ))}
    </Box>
  );
};
