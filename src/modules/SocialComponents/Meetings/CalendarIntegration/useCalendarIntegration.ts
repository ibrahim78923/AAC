import { CALENDAR_STATUS } from '@/constants/strings';
import {
  useChangeStatusCalendarMutation,
  useDeleteCalendarMutation,
  useGetGoogleCalendarAuthQuery,
  useGetMeetingsCalendarsListQuery,
} from '@/services/commonFeatures/meetings/settings';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useState } from 'react';

export const useCalendarIntegration = () => {
  const [switchLoading, setSwitchLoading] = useState<any>({});
  const { data } = useGetGoogleCalendarAuthQuery(null);
  const { data: calendarData } = useGetMeetingsCalendarsListQuery(null);
  const googleAuth = data?.data;
  const handleClick = () => {
    window?.open(googleAuth, '_self');
  };
  const calendarListData = calendarData?.data;

  const [deleteTrigger] = useDeleteCalendarMutation();
  const deleteParams = calendarListData?.map((item: any) => `${item?._id}`);
  const handleDelete = async () => {
    const response: any = await deleteTrigger(deleteParams)?.unwrap();
    try {
      successSnackbar(
        response?.data?.message && 'Calendar Delete Successfully',
      );
    } catch (e) {
      errorSnackbar(response?.error?.data?.message);
    }
  };

  const [changeStatusTrigger] = useChangeStatusCalendarMutation();

  const handleChangeStatus = async (calendarId: string) => {
    const calendarToChange = calendarListData?.find(
      (calendar: any) => calendar?._id === calendarId,
    );
    const newStatus =
      calendarToChange?.status === CALENDAR_STATUS?.ACTIVE
        ? CALENDAR_STATUS?.INACTIVE
        : CALENDAR_STATUS?.ACTIVE;

    setSwitchLoading((prevState: any) => ({
      ...prevState,
      [calendarId]: true,
    }));
    for (const calendar of calendarListData) {
      if (
        calendar?._id !== calendarId &&
        calendar?.status === CALENDAR_STATUS?.ACTIVE
      ) {
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

    try {
      successSnackbar(
        response?.data?.message &&
          `${calendarToChange?.title} ${newStatus?.toLocaleLowerCase()} successfully`,
      );
    } catch (error) {
      errorSnackbar(response?.error?.data?.message);
    } finally {
      setSwitchLoading((prevState: any) => ({
        ...prevState,
        [calendarId]: false,
      }));
    }
  };

  return {
    handleClick,
    calendarListData,
    handleDelete,
    switchLoading,
    handleChangeStatus,
  };
};
