import { SOCIAL_COMPONENTS } from '@/constants';
import { useRouter } from 'next/router';
import {
  useDeleteMeetingsTemplateMutation,
  useGetMeetingsEmailTemplatesQuery,
} from '@/services/commonFeatures/meetings';
import { useState } from 'react';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useTheme } from '@mui/material';

export const useEmilTemplate = () => {
  const theme = useTheme();
  const [search, setSearch] = useState<string>('');
  const [deleteModal, setDeleteModal] = useState<Record<string, any>>({});
  const router: any = useRouter();
  const ticketId = router?.query?.ticketId;
  const meetingId = router?.query?.meetingId;
  const handleMoveCreateEmail = () => {
    router?.push({
      pathname: SOCIAL_COMPONENTS?.CREATE_MEETING_TEMPLATE,
      query: { ...(ticketId && { ticketId: ticketId }), meetingId: meetingId },
    });
  };
  const handleMoveBackMeeting = () => {
    router?.back();
  };
  const params = {
    search,
  };
  const { data, isLoading, isFetching, isError, refetch }: any =
    useGetMeetingsEmailTemplatesQuery(params, {
      refetchOnMountOrArgChange: true,
    });
  const meetingsEmailData = data?.data;

  const [deleteMeetingsParameter, deleteMeetingsTrigger] =
    useDeleteMeetingsTemplateMutation();

  const submitDeleteModal = async () => {
    const params = {
      id: deleteModal?.data?._id,
    };
    try {
      await deleteMeetingsParameter(params)?.unwrap();
      successSnackbar();
      setDeleteModal({});
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };
  return {
    router,
    handleMoveBackMeeting,
    handleMoveCreateEmail,
    meetingsEmailData,
    isLoading,
    isFetching,
    setSearch,
    isError,
    refetch,
    meetingId,
    ticketId,
    submitDeleteModal,
    setDeleteModal,
    deleteModal,
    deleteMeetingsTrigger,
    theme,
  };
};
