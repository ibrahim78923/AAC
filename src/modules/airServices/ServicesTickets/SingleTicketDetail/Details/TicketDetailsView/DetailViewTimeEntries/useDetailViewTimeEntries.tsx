import useAuth from '@/hooks/useAuth';
import {
  useGetTicketsTimeEntriesByIdQuery,
  usePostTicketsTimeMutation,
  usePutTicketsTimeMutation,
} from '@/services/airServices/tickets/single-ticket-details/details';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useStopwatch } from 'react-timer-hook';

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

  if (objectWithTrueCounter?._id && !hasExecuted) {
    start();
    setIsIconVisible(false);
    setCheckId(true);
    setHasExecuted(true);
  }

  const handleSubmit = async () => {
    pause();
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
      } catch (error: any) {
        errorSnackbar(error?.data?.message);
      }
    }
    reset();
    pause();
  };

  const handleSubmitPause = async () => {
    reset();
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
