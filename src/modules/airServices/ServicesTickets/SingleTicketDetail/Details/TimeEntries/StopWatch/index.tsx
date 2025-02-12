import { Box, Typography } from '@mui/material';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import { pxToRem } from '@/utils/getFontValue';
import { StartTimerIcon } from '@/assets/icons';
import PauseIcon from '@mui/icons-material/Pause';
import { ARRAY_INDEX } from '@/constants/strings';
import { useStopWatch } from './useStopWatch';
import { CustomLoadingButton } from '@/components/Buttons/CustomLoadingButton';

const StopWatch = (props: any) => {
  const { data } = props;

  const {
    user,
    toggleTimerPlayPause,
    theme,
    time,
    isTimerPause,
    apiCallInProgress,
  } = useStopWatch(props);

  return (
    <>
      <PermissionsGuard
        permissions={[
          AIR_SERVICES_TICKETS_TICKETS_DETAILS?.TIME_TRACK_PLAY_PAUSE,
        ]}
      >
        <CustomLoadingButton
          color="inherit"
          customStyles={{ cursor: 'pointer', p: 0, minWidth: pxToRem(40) }}
          primary={false}
          size="small"
          disabled={
            data?.data?.[ARRAY_INDEX?.ZERO]?.agentDetails?._id !== user?._id
          }
          loading={apiCallInProgress}
          onClick={toggleTimerPlayPause}
        >
          {isTimerPause ? (
            <Box display="flex" justifyContent="center" alignItems="center">
              <StartTimerIcon
                color={
                  data?.data?.[ARRAY_INDEX?.ZERO]?.agentDetails?._id ===
                  user?._id
                    ? theme?.palette?.primary?.main
                    : theme?.palette?.custom?.dark
                }
              />
            </Box>
          ) : (
            <PauseIcon
              sx={{
                color:
                  data?.data?.[ARRAY_INDEX?.ZERO]?.agentDetails?._id ===
                  user?._id
                    ? theme?.palette?.error?.main
                    : '',
                fontWeight: 'bold',
              }}
            />
          )}
        </CustomLoadingButton>
      </PermissionsGuard>
      <Typography variant="h5" fontWeight={500} color="slateBlue.main">
        <span>{time?.hours}</span>:<span>{time?.minutes}</span>:
        <span>{time?.seconds}</span>
      </Typography>
    </>
  );
};

export default StopWatch;
