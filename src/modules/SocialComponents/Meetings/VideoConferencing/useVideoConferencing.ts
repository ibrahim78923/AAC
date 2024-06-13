import { CALENDAR_STATUS } from '@/constants/strings';
import {
  useChangeStatusCalendarMutation,
  useDeleteCalendarMutation,
  useGetGoogleMeetAuthQuery,
  useGetMeetingsCalendarsListQuery,
  useGetMsTeamsAuthQuery,
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
  const params = {
    settingType: 'CONFERENCING_TOOL',
  };

  const { data: meetingsList }: any = useGetMeetingsCalendarsListQuery(params);
  useEffect(() => {
    if (meetingsList?.data) {
      setMeetingsListData(meetingsList?.data);
    }
  }, [meetingsList]);

  const [deleteTrigger] = useDeleteCalendarMutation();
  const handleDelete = async (calendarId: string) => {
    try {
      const response: any = await deleteTrigger({ id: calendarId })?.unwrap();
      setMeetingsListData(
        (prevData) =>
          prevData?.filter((calendar) => calendar?._id !== calendarId),
      );
      successSnackbar(
        response?.data?.message || 'Calendar deleted successfully',
      );
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const [changeStatusTrigger] = useChangeStatusCalendarMutation();

  const handleChangeStatus = async (calendarId: string) => {
    const calendarToChange = meetingsListData?.find(
      (calendar: any) => calendar?._id === calendarId,
    );
    const newStatus = calendarToChange?.isDefault
      ? CALENDAR_STATUS?.INACTIVE
      : CALENDAR_STATUS?.ACTIVE;

    setSwitchLoading((prevState) => ({
      ...prevState,
      [calendarId]: true,
    }));

    try {
      for (const calendar of meetingsListData) {
        if (calendar?._id !== calendarId && calendar?.isDefault) {
          await changeStatusTrigger({
            id: calendar?._id,
            body: { status: CALENDAR_STATUS?.INACTIVE },
          });
        }
      }

      const response: any = await changeStatusTrigger({
        id: calendarId,
        body: { status: newStatus },
      })?.unwrap();

      setMeetingsListData(
        (prevState) =>
          prevState?.map((calendar) =>
            calendar?._id === calendarId
              ? { ...calendar, isDefault: !calendar?.isDefault }
              : calendar?._id !== calendarId && calendar?.isDefault
                ? { ...calendar, isDefault: false }
                : calendar,
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
        [calendarId]: false,
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
  };
};
