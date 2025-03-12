import { Box, Typography } from '@mui/material';
import { LogInfoPropsI } from '../DataDisplay.interface';

export const LogInfo = (props: LogInfoPropsI) => {
  const { performer, logType, log, logProps, logColor = 'primary' } = props;
  return (
    <Box display={'flex'} gap={0.3} alignItems={'center'} flexWrap={'wrap'}>
      <Typography
        variant="body2"
        fontWeight={'fontWeightSmall'}
        color={logColor}
        textTransform={'capitalize'}
      >
        {performer?.toLowerCase()}
      </Typography>
      <Typography variant="body2" color="secondary">
        {logType?.toLowerCase()}
      </Typography>
      <Typography
        component={'div'}
        fontWeight={'fontWeightSmall'}
        variant="body2"
        color={logColor}
        {...logProps}
      >
        {log}
      </Typography>
    </Box>
  );
};
