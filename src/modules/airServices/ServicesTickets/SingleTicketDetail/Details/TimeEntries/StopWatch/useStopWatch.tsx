import { ARRAY_INDEX, TIME_ENTRIES_TICKETS_TIMES } from '@/constants/strings';
import useAuth from '@/hooks/useAuth';
import {
  usePostTicketsTimeMutation,
  usePutTicketsTimeMutation,
} from '@/services/airServices/tickets/single-ticket-details/details';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useTheme } from '@mui/material';

import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useStopWatch = (props: any) => {
  const {
    data,
    setIsTimerPause,
    isTimerPause,
    setTime,
    startTimerId,
    intervalRef,
  } = props;

  const { user }: any = useAuth();
  const theme = useTheme();

  const [putTicketsTimeTrigger, putTicketsTimeStatus] =
    usePutTicketsTimeMutation();
  const [postTicketsTimeTrigger, postTicketsTimeStatus] =
    usePostTicketsTimeMutation();

  const router = useRouter();
  const { ticketId } = router?.query;

  const start = () => {
    if (!intervalRef?.current) {
      intervalRef.current = window?.setInterval(() => {
        setTime((prevTime: any) => {
          let { hours, minutes, seconds } = prevTime;

          if (seconds === TIME_ENTRIES_TICKETS_TIMES?.PREVIOUS_SECOND) {
            seconds = 0;
            if (minutes === TIME_ENTRIES_TICKETS_TIMES?.PREVIOUS_MINUTE) {
              minutes = 0;
              hours += 1;
            } else {
              minutes += 1;
            }
          } else {
            seconds += 1;
          }

          return { hours, minutes, seconds };
        });
      }, 1000);
    }
  };

  const stop = () => {
    if (intervalRef?.current) {
      clearInterval(intervalRef?.current);
      intervalRef.current = null;
    }
  };

  const reset = () => {
    if (intervalRef?.current) {
      clearInterval(intervalRef?.current);
      intervalRef.current = null;
    }
    setTime({
      hours: TIME_ENTRIES_TICKETS_TIMES?.INITIAL_HOUR,
      minutes: TIME_ENTRIES_TICKETS_TIMES?.INITIAL_MINUTE,
      seconds: TIME_ENTRIES_TICKETS_TIMES?.INITIAL_SECOND,
    });
  };

  const submitStartTimer = async () => {
    const postData = {
      ticketId: ticketId,
      taskId: data?.task?._id,
      status: data?.data?.[ARRAY_INDEX?.ZERO]?.status,
      on: new Date(),
      agentId: data?.data?.[ARRAY_INDEX?.ZERO]?.agentDetails?._id,
    };

    const putTicketParameter = {
      body: postData,
    };

    try {
      const response =
        await postTicketsTimeTrigger(putTicketParameter)?.unwrap();
      successSnackbar('Ticket time added successfully!');
      setIsTimerPause?.(false);
      startTimerId.current = response?.data?._id;
      start();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };
  const submitPauseTimer = async () => {
    const body = {
      id: startTimerId?.current,
      ticketId: ticketId,
    };

    if (!!!body?.id) return;

    const putTicketParameter = {
      body,
    };

    try {
      stop();
      await putTicketsTimeTrigger(putTicketParameter)?.unwrap();
      successSnackbar('Ticket time updated successfully!');
      setIsTimerPause?.(true);
      startTimerId.current = undefined;
      reset();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const toggleTimerPlayPause = () => {
    if (data?.data?.[ARRAY_INDEX?.ZERO]?.agentDetails?._id !== user?._id)
      return;
    isTimerPause ? submitStartTimer?.() : submitPauseTimer?.();
  };

  useEffect(() => {
    const handleUnmount = () => {
      if (!!startTimerId?.current) {
        submitPauseTimer?.();
      }
    };
    return handleUnmount;
  }, []);

  return {
    user,
    isTimerPause,
    toggleTimerPlayPause,
    postTicketsTimeStatus,
    putTicketsTimeStatus,
    theme,
  };
};
