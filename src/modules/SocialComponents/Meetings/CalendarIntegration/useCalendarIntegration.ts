import { CALENDAR_STATUS } from '@/constants/strings';
import {
  useChangeStatusCalendarMutation,
  useDeleteCalendarMutation,
  useGetGoogleCalendarAuthQuery,
  useGetMeetingsCalendarsListQuery,
  useGetOfficeCalendarAuthQuery,
} from '@/services/commonFeatures/meetings/settings';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useState, useEffect } from 'react';

export const useCalendarIntegration = () => {
  const [switchLoading, setSwitchLoading] = useState<{
    [key: string]: boolean;
  }>({});
  const [calendarListData, setCalendarListData] = useState<any[]>([]);

  const { data: googleData }: any = useGetGoogleCalendarAuthQuery(null);
  const googleAuth = googleData?.data;

  const { data: officeData }: any = useGetOfficeCalendarAuthQuery(null);
  const officeAuth = officeData?.data;

  const { data: calendarData }: any = useGetMeetingsCalendarsListQuery(null);

  useEffect(() => {
    if (calendarData?.data) {
      setCalendarListData(calendarData?.data);
    }
  }, [calendarData]);

  const handleGoogleClick = () => {
    if (googleAuth) {
      window?.open(googleAuth, '_self');
    }
  };

  const handleOfficeClick = () => {
    if (officeAuth) {
      window?.open(officeAuth, '_self');
    }
  };

  const [deleteTrigger] = useDeleteCalendarMutation();
  const handleDelete = async (calendarId: string) => {
    try {
      const response: any = await deleteTrigger({ id: calendarId })?.unwrap();
      setCalendarListData(
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
    const calendarToChange = calendarListData?.find(
      (calendar) => calendar?._id === calendarId,
    );
    const newStatus = calendarToChange?.isDefault
      ? CALENDAR_STATUS?.INACTIVE
      : CALENDAR_STATUS?.ACTIVE;

    setSwitchLoading((prevState) => ({
      ...prevState,
      [calendarId]: true,
    }));

    try {
      for (const calendar of calendarListData) {
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

      setCalendarListData(
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
    handleGoogleClick,
    handleOfficeClick,
    calendarListData,
    handleDelete,
    switchLoading,
    handleChangeStatus,
    googleAuth,
    officeAuth,
  };
};
