import { CALENDAR_STATUS } from '@/constants/strings';
import {
  useChangeStatusCalendarMutation,
  useDeleteCalendarMutation,
  useGetGoogleMeetAuthQuery,
  useGetMeetingsCalendarsListQuery,
  useGetMsTeamsAuthQuery,
  useGetZoomAuthQuery,
} from '@/services/commonFeatures/meetings/settings';
import { errorSnackbar, successSnackbar } from '@/utils/api';
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

  const [deleteTrigger] = useDeleteCalendarMutation();
  const handleDelete = async (meetingId: string) => {
    try {
      const response: any = await deleteTrigger({ id: meetingId })?.unwrap();
      setMeetingsListData(
        (prevData) => prevData?.filter((meeting) => meeting?._id !== meetingId),
      );
      successSnackbar(
        response?.data?.message || 'Calendar deleted successfully',
      );
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const [changeStatusTrigger] = useChangeStatusCalendarMutation();

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
      if (newStatus === CALENDAR_STATUS?.ACTIVE) {
        for (const meeting of meetingsListData) {
          if (meeting?._id !== meetingId && meeting?.isDefault) {
            await changeStatusTrigger({
              id: meeting?._id,
              body: { status: CALENDAR_STATUS?.INACTIVE },
            });
          }
        }
      }

      const response: any = await changeStatusTrigger({
        id: meetingId,
        body: { status: newStatus },
      })?.unwrap();

      setMeetingsListData(
        (prevState) =>
          prevState?.map((meeting) =>
            meeting?._id === meetingId
              ? { ...meeting, isDefault: newStatus === CALENDAR_STATUS?.ACTIVE }
              : { ...meeting, isDefault: false },
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
  };
};
