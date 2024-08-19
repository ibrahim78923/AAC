import React from 'react';
import { Box, Typography } from '@mui/material';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import { LoadingButton } from '@mui/lab';
import { pxToRem } from '@/utils/getFontValue';
import { StartTimerIcon } from '@/assets/icons';
import PauseIcon from '@mui/icons-material/Pause';
import { ARRAY_INDEX } from '@/constants/strings';
import { useStopWatch } from './useStopWatch';

const StopWatch = (props: any) => {
  const { data, isTimerPause, time } = props;
  const {
    user,
    toggleTimerPlayPause,
    postTicketsTimeStatus,
    putTicketsTimeStatus,
    theme,
  } = useStopWatch(props);

  return (
    <>
      <PermissionsGuard
        permissions={[
          AIR_SERVICES_TICKETS_TICKETS_DETAILS?.TIME_TRACK_PLAY_PAUSE,
        ]}
      >
        <LoadingButton
          sx={{ cursor: 'pointer', p: 0, minWidth: pxToRem(40) }}
          variant="outlined"
          color="inherit"
          size="small"
          className="small"
          disabled={
            data?.data?.[ARRAY_INDEX?.ZERO]?.agentDetails?._id !== user?._id
          }
          loading={
            postTicketsTimeStatus?.isLoading || putTicketsTimeStatus?.isLoading
          }
          onClick={() => toggleTimerPlayPause?.()}
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
        </LoadingButton>
      </PermissionsGuard>
      <Typography variant="h5" fontWeight={500} color="slateBlue.main">
        <span>{time?.hours}</span>:<span>{time?.minutes}</span>:
        <span>{time?.seconds}</span>
      </Typography>
    </>
  );
};
export default StopWatch;
