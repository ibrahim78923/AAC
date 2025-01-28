import { CALENDAR_STATUS } from '@/constants/strings';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import {
  useDeleteCalendarMutation,
  useGetGoogleMeetAuthQuery,
  useGetMeetingsCalendarsListQuery,
  useGetMsTeamsAuthQuery,
  useGetZoomAuthQuery,
  useUpdateSocialComponentsMeetingsSingleCalendarMutation,
} from '@/services/commonFeatures/meetings/settings';
import { useEffect, useState } from 'react';

export const useVideoConferencing = () => {
  const [switchLoading, setSwitchLoading] = useState<{
    [key: string]: boolean;
  }>({});
  const [meetingsListData, setMeetingsListData] = useState<any[]>([]);

  const { data: googleMeet }: any = useGetGoogleMeetAuthQuery(null);
  const googleMeetAuth = googleMeet?.data;
  const handleGoogleMeetClick = () => {
    if (googleMeetAuth) {
      window?.open(googleMeetAuth, '_self');
    }
  };

  const { data: msTeams }: any = useGetMsTeamsAuthQuery(null);
  const msTeamsAuth = msTeams?.data;
  const handleMsTeamsClick = () => {
    if (msTeamsAuth) {
      window?.open(msTeamsAuth, '_self');
    }
  };

  const { data: zoomData }: any = useGetZoomAuthQuery(null);
  const zoomAuth = zoomData?.data;
  const handleZoomClick = () => {
    if (zoomAuth) {
      window?.open(zoomAuth, '_self');
    }
  };
  const params = {
    settingType: 'CONFERENCING_TOOL',
  };

  const {
    data: meetingsList,
    isLoading,
    isFetching,
  }: any = useGetMeetingsCalendarsListQuery(params);
  useEffect(() => {
    if (meetingsList?.data) {
      setMeetingsListData(meetingsList?.data);
    }
  }, [meetingsList]);

  const [deleteTrigger, deleteProgress] = useDeleteCalendarMutation();
  const handleDelete = async (meetingId: string) => {
    try {
      const response: any = await deleteTrigger({ id: meetingId })?.unwrap();
      setMeetingsListData(
        (prevData) => prevData?.filter((meeting) => meeting?._id !== meetingId),
      );
      successSnackbar(
        response?.data?.message || 'Meeting deleted successfully',
      );
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const [changeStatusTrigger, changeStatusProgress] =
    useUpdateSocialComponentsMeetingsSingleCalendarMutation();

  const handleChangeStatus = async (meetingId: string) => {
    const meetingToChange = meetingsListData?.find(
      (meeting) => meeting?._id === meetingId,
    );

    if (!meetingToChange) {
      errorSnackbar('Meeting not found.');
      return;
    }

    const newStatus = meetingToChange?.isDefault
      ? CALENDAR_STATUS?.INACTIVE
      : CALENDAR_STATUS?.ACTIVE;

    setSwitchLoading((prevState) => ({
      ...prevState,
      [meetingId]: true,
    }));

    try {
      const response: any = await changeStatusTrigger({
        body: { status: newStatus, id: meetingId },
      })?.unwrap();

      setMeetingsListData(
        (prevState) =>
          prevState?.map((meeting) =>
            meeting?._id === meetingId
              ? { ...meeting, isDefault: newStatus === CALENDAR_STATUS?.ACTIVE }
              : meeting,
          ),
      );

      successSnackbar(
        response?.data?.message || `${newStatus?.toLowerCase()} successfully`,
      );
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    } finally {
      setSwitchLoading((prevState) => ({
        ...prevState,
        [meetingId]: false,
      }));
    }
  };

  return {
    handleGoogleMeetClick,
    handleMsTeamsClick,
    meetingsListData,
    switchLoading,
    handleChangeStatus,
    handleDelete,
    isLoading,
    isFetching,
    handleZoomClick,
    changeStatusProgress,
    deleteProgress,
  };
};
