import { CustomLinearProgress } from '@/components/ProgressBars/CustomLinearProgress';
import { useApiPolling } from '@/hooks/useApiPolling';
import { pxToRem } from '@/utils/getFontValue';
import { Autorenew } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { ApiPollingButtonPropsI } from '../Buttons.interface';

export const ApiPollingButton = (props: ApiPollingButtonPropsI) => {
  const {
    onClick,
    showLoader,
    variant = 'outlined',
    isSmall = true,
    customStyles,
    isFetching,
    fulfilledTimeStamp,
    intervalTime,
    buttonLabel = 'refresh api ',
  } = props;

  const pollProps = {
    isFetching,
    fulfilledTimeStamp,
    intervalTime,
  };

  const { timeLapse } = useApiPolling(pollProps);

  return (
    <Button
      aria-label={buttonLabel}
      variant={variant}
      color="inherit"
      size="small"
      className={isSmall ? 'small' : ''}
      startIcon={<Autorenew />}
      onClick={onClick}
      disabled={showLoader}
      sx={{
        fontSize: pxToRem(12),
        fontWeight: 'fontWeightRegular',
        textTransform: 'lowercase',
        ...customStyles,
      }}
    >
      {!!showLoader ? (
        <Box>
          <CustomLinearProgress />
        </Box>
      ) : (
        timeLapse?.lastFetchLapseTime
      )}
    </Button>
  );
};
