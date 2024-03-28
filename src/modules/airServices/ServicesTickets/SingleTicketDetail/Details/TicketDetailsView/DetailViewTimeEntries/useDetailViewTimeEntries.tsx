import useAuth from '@/hooks/useAuth';

import {
  useGetTicketsTimeEntriesByIdQuery,
  usePostTicketsTimeMutation,
  usePutTicketsTimeMutation,
} from '@/services/airServices/tickets/single-ticket-details/details';
import { errorSnackbar, successSnackbar } from '@/utils/api';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useStopwatch } from 'react-timer-hook';

export const useDetailViewTimeEntries = (data: any) => {
  const { user }: any = useAuth();

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isCheckId, setCheckId] = useState<boolean>(false);
  const [isIconVisible, setIsIconVisible] = useState(true);
  const [putTicketParameterTrigger] = usePutTicketsTimeMutation();
  const [postTicketsTimeTrigger] = usePostTicketsTimeMutation();
  const router = useRouter();
  const toggleView = () => {
    setIsIconVisible(!isIconVisible);
  };

  const { ticketId } = router?.query;
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: false });
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
  const trueCounterId = objectWithTrueCounter?._id;
  useEffect(() => {
    if (trueCounterId) {
      start();
      setIsIconVisible(false);
      setCheckId(true);
    }
  }, [trueCounterId]);

  const handleSubmit = async () => {
    pause();
    if (isCheckId === true) {
      const upDateData = {
        id: trueCounterId,
        ticketId: ticketId,
      };

      const putTicketParameter = {
        body: upDateData,
      };
      try {
        await putTicketParameterTrigger(putTicketParameter)?.unwrap();

        successSnackbar(' ticket Time upDated successfully');

        reset();
      } catch (error) {
        errorSnackbar();
      }
    }
    reset();
    pause();
  };

  const handleSubmitPause = async () => {
    start();
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

      successSnackbar(' ticket Time Added successfully');
      setIsDrawerOpen(false);
    } catch (error) {
      errorSnackbar();
      setIsDrawerOpen(false);
    }
    reset();
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
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
    handleSubmit,
    handleSubmitPause,
    isCheckId,
  };
};
