import { ARRAY_INDEX, TIME_ENTRIES_TICKETS_TIMES } from '@/constants/strings';
import useAuth from '@/hooks/useAuth';
import {
  useGetTicketsTimeEntriesByIdQuery,
  usePostTicketsTimeMutation,
  usePutTicketsTimeMutation,
} from '@/services/airServices/tickets/single-ticket-details/details';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useTheme } from '@mui/material';

import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';

export const useDetailViewTimeEntries = (data: any) => {
  const { user }: any = useAuth();
  const theme = useTheme();

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [putTicketsTimeTrigger, putTicketsTimeStatus] =
    usePutTicketsTimeMutation();
  const [postTicketsTimeTrigger, postTicketsTimeStatus] =
    usePostTicketsTimeMutation();
  const [isTimerPause, setIsTimerPause] = useState(true);
  const startTimerId = useRef();
  const router = useRouter();

  const { ticketId } = router?.query;

  const [hours, setHours] = useState<number>(
    TIME_ENTRIES_TICKETS_TIMES?.INITIAL_HOUR,
  );

  const [minutes, setMinutes] = useState<number>(
    TIME_ENTRIES_TICKETS_TIMES?.INITIAL_MINUTE,
  );

  const [seconds, setSeconds] = useState<number>(
    TIME_ENTRIES_TICKETS_TIMES?.INITIAL_SECOND,
  );

  const intervalRef = useRef<number | null>(null);

  const start = () => {
    if (!intervalRef?.current) {
      intervalRef.current = window?.setInterval(() => {
        setSeconds((prevSeconds: any) => {
          if (prevSeconds === TIME_ENTRIES_TICKETS_TIMES?.PREVIOUS_SECOND) {
            setMinutes((prevMinutes: any) => {
              if (prevMinutes === TIME_ENTRIES_TICKETS_TIMES?.PREVIOUS_MINUTE) {
                setHours((prevHours: any) => prevHours + 1);
                return 0;
              }
              return prevMinutes + 1;
            });
            return 0;
          }
          return prevSeconds + 1;
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
    setHours(TIME_ENTRIES_TICKETS_TIMES?.INITIAL_HOUR);
    setMinutes(TIME_ENTRIES_TICKETS_TIMES?.INITIAL_MINUTE);
    setSeconds(TIME_ENTRIES_TICKETS_TIMES?.INITIAL_SECOND);
  };

  const apiDataParameter = {
    queryParams: {
      ticketId,
    },
  };

  const {
    data: timeEntryData,
    isLoading,
    isFetching,
    isError,
  } = useGetTicketsTimeEntriesByIdQuery(apiDataParameter, {
    refetchOnMountOrArgChange: true,
    skip: !!!ticketId,
  });

  const submitStartTimer = async () => {
    const postData = {
      ticketId: ticketId,
      taskId: data?.task?._id,
      status: data?.data?.data?.[ARRAY_INDEX?.ZERO]?.status,
      on: new Date(),
      agentId: data?.data?.data?.[ARRAY_INDEX?.ZERO]?.agentDetails?._id,
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
    const upDateData = {
      id: startTimerId?.current,
      ticketId: ticketId,
    };

    const putTicketParameter = {
      body: upDateData,
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
    if (data?.data?.data?.[ARRAY_INDEX?.ZERO]?.agentDetails?._id !== user?._id)
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
    isLoading,
    isError,
    timeEntryData,
    isDrawerOpen,
    setIsDrawerOpen,
    start,
    stop,
    reset,
    seconds,
    minutes,
    hours,
    user,
    isTimerPause,
    toggleTimerPlayPause,
    postTicketsTimeStatus,
    putTicketsTimeStatus,
    isFetching,
    theme,
  };
};
