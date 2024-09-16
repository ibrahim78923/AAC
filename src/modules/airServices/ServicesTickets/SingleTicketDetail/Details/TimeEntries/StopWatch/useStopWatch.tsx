import { ARRAY_INDEX, TIME_ENTRIES_TICKETS_TIMES } from '@/constants/strings';
import useAuth from '@/hooks/useAuth';
import {
  resetTime,
  setIsTimerPause,
  setTime,
} from '@/redux/slices/airServices/tickets/slice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  usePostTicketsTimeMutation,
  usePutTicketsTimeMutation,
} from '@/services/airServices/tickets/single-ticket-details/details';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useStopWatch = (props: any) => {
  const { data, startTimerId, intervalRef } = props;

  const dispatch = useAppDispatch();

  const isTimerPause = useAppSelector(
    (state) => state?.servicesTickets?.isTimerPause,
  );

  const time = useAppSelector((state) => state?.servicesTickets?.time);

  const { user }: any = useAuth();
  const theme = useTheme();

  const [putTicketsTimeTrigger, putTicketsTimeStatus] =
    usePutTicketsTimeMutation();
  const [postTicketsTimeTrigger, postTicketsTimeStatus] =
    usePostTicketsTimeMutation();

  const router = useRouter();
  const { ticketId } = router?.query;

  const start = () => {
    if (!intervalRef?.current !== null) {
      const id = window?.setInterval(() => {
        dispatch((dispatch, getState) => {
          const { hours, minutes, seconds } = getState()?.servicesTickets?.time;

          let newHours = hours;
          let newMinutes = minutes;
          let newSeconds = seconds;

          if (newSeconds === TIME_ENTRIES_TICKETS_TIMES?.PREVIOUS_SECOND) {
            newSeconds = 0;
            if (newMinutes === TIME_ENTRIES_TICKETS_TIMES?.PREVIOUS_MINUTE) {
              newMinutes = 0;
              newHours += 1;
            } else {
              newMinutes += 1;
            }
          } else {
            newSeconds += 1;
          }

          dispatch(
            setTime<any>({
              hours: newHours,
              minutes: newMinutes,
              seconds: newSeconds,
            }),
          );
        });
      }, 1000);
      intervalRef.current = id;
    }
  };

  const stop = () => {
    if (intervalRef?.current !== null) {
      window?.clearInterval(intervalRef?.current);
      intervalRef.current = null;
    }
  };

  const reset = () => {
    if (intervalRef?.current !== null) {
      window?.clearInterval(intervalRef?.current);
      intervalRef.current = null;
    }
    dispatch(resetTime());
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
      dispatch(
        setIsTimerPause<any>({
          isTimerPause: false,
        }),
      );
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
      dispatch(setIsTimerPause<any>({ isTimerPause: true }));
      startTimerId.current = null;
      reset();
    } catch (error) {}
  };

  const toggleTimerPlayPause = () => {
    if (data?.data?.[ARRAY_INDEX?.ZERO]?.agentDetails?._id !== user?._id)
      return;
    isTimerPause ? submitStartTimer?.() : submitPauseTimer?.();
  };

  useEffect(() => {
    const handleUnmount = () => {
      if (startTimerId?.current !== null) {
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
    time,
  };
};
