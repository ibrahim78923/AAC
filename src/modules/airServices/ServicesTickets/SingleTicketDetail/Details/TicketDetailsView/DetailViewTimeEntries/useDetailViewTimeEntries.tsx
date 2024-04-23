import useAuth from '@/hooks/useAuth';
import {
  useGetTicketsTimeEntriesByIdQuery,
  usePostTicketsTimeMutation,
  usePutTicketsTimeMutation,
} from '@/services/airServices/tickets/single-ticket-details/details';
import { errorSnackbar, successSnackbar } from '@/utils/api';

import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';

export const useDetailViewTimeEntries = (data: any) => {
  const { user }: any = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isCheckId, setCheckId] = useState<boolean>(false);
  const [isIconVisible, setIsIconVisible] = useState(true);
  const [putTicketParameterTrigger] = usePutTicketsTimeMutation();
  const [postTicketsTimeTrigger] = usePostTicketsTimeMutation();
  const [hasExecuted, setHasExecuted] = useState(false);

  const router = useRouter();
  const toggleView = () => {
    setIsIconVisible(!isIconVisible);
  };
  const { ticketId } = router?.query;
  const [hours, setHours] = useState<number>(() => {
    const storedValue = localStorage?.getItem('timerHour');
    return storedValue ? parseInt(storedValue, 10) : 0;
  });

  const [minutes, setMinutes] = useState<number>(() => {
    const storedValue = localStorage?.getItem('timerMin');
    return storedValue ? parseInt(storedValue, 10) : 0;
  });

  const [seconds, setSeconds] = useState<number>(() => {
    const storedValue = localStorage?.getItem('timerSecond');
    return storedValue ? parseInt(storedValue, 10) : 0;
  });

  // Rest of your code...

  useEffect(() => {
    localStorage?.setItem('timerSecond', seconds?.toString());
  }, [seconds]);

  useEffect(() => {
    localStorage?.setItem('timerMin', minutes?.toString());
  }, [minutes]);

  useEffect(() => {
    localStorage?.setItem('timerHour', hours?.toString());
  }, [hours]);
  const intervalRef = useRef<number | null>(null);

  const start = () => {
    if (!intervalRef?.current) {
      intervalRef.current = window?.setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 59) {
            setMinutes((prevMinutes) => {
              if (prevMinutes === 59) {
                setHours((prevHours) => prevHours + 1);
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
    setHours(0);
    setMinutes(0);
    setSeconds(0);
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

  const objectWithTrueCounter = timeEntryData?.data?.response?.find(
    (obj: { counter: boolean }) => obj?.counter === true,
  );

  if (objectWithTrueCounter?._id && !hasExecuted) {
    start();
    setIsIconVisible(false);
    setCheckId(true);
    setHasExecuted(true);
  }

  const handleSubmit = async () => {
    if (isCheckId === true) {
      const upDateData = {
        id: objectWithTrueCounter?._id,
        ticketId: ticketId,
      };

      const putTicketParameter = {
        body: upDateData,
      };

      try {
        await putTicketParameterTrigger(putTicketParameter)?.unwrap();
        successSnackbar('Ticket Time Updated Successfully!');
        reset();
        stop();
      } catch (error: any) {
        errorSnackbar(error?.data?.message);
      }
    }

    stop();
  };

  const handleSubmitPause = async () => {
    const postData = {
      ticketId: ticketId,
      taskId: data?.task?._id,
      status: data?.data?.data?.[0]?.status,
      on: data?.data?.data?.[0]?.plannedStartDate,
      agentId: user?._id,
    };

    const putTicketParameter = {
      body: postData,
    };

    try {
      await postTicketsTimeTrigger(putTicketParameter)?.unwrap();
      successSnackbar('Ticket Time Added Successfully!');
      setIsDrawerOpen(false);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
      setIsDrawerOpen(false);
    }

    start();
  };

  return {
    isLoading,
    isFetching,
    isError,
    timeEntryData,
    isDrawerOpen,
    setIsDrawerOpen,
    isIconVisible,
    setIsIconVisible,
    toggleView,

    handleSubmit,
    handleSubmitPause,
    isCheckId,
    reset,
    stop,
    start,
    seconds,
    minutes,
    hours,
  };
};
