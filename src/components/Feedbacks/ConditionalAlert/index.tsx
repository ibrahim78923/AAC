import { alpha, Box, Typography, useTheme } from '@mui/material';
import { useConditionalAlert } from './useConditionalAlert';
import { ConditionalAlertPropsI } from '../Feedbacks.interface';

const ConditionalAlert = (props: ConditionalAlertPropsI) => {
  const { alert } = useConditionalAlert(props);
  const theme = useTheme();

  if (!alert?.open) return null;

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: alpha(theme?.palette?.background?.paper, 0.775),
        zIndex: 99999,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          top: '0%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          textAlign: 'center',
          backgroundColor: 'error.main',
          padding: 0.5,
          borderRadius: 1,
        }}
      >
        <Typography
          variant="body2"
          sx={{ fontWeight: 600 }}
          color="common.white"
        >
          {alert?.message}
        </Typography>
      </Box>
    </Box>
  );
};

export default ConditionalAlert;
