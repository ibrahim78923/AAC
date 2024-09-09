import { useRouter } from 'next/router';
import { getSession } from '@/utils';
import { peopleTypes } from './AttendeePeople.data';
import { errorSnackbar, timeFormatter } from '@/utils/api';
import {
  useLazyGetBookedMeetingsSlotsListQuery,
  useLazyGetMeetingsSlotsListQuery,
  useLazyGetAllUsersAndContactsDropdownQuery,
} from '@/services/commonFeatures/meetings';

export const useAttendeePeople = (props: any) => {
  const { watch, setValue } = props;

  const router = useRouter();
  const watchPeople = watch('people');
  const watchStartDate = watch('startDate');
  const userDropdown = useLazyGetAllUsersAndContactsDropdownQuery();
  const organizer = getSession()?.user;
  const meetingType = router?.query?.type;
  const handleDateValues = (startTime: any, endTime: any) => {
    setValue('startTime', timeFormatter(startTime));
    setValue('endTime', timeFormatter(endTime));
  };
  const peopleData =
    router?.query?.type === peopleTypes?.group ? watchPeople : [watchPeople];

  const [trigger, status]: any = useLazyGetMeetingsSlotsListQuery();
  const [bookedTrigger, bookedStatus]: any =
    useLazyGetBookedMeetingsSlotsListQuery();
  const handleFetchMeetingSlots = async () => {
    const meetingParameter = {
      queryParams: [
        ...peopleData
          ?.map((item: any) => item?._id)
          .filter(Boolean)
          .map((id: any) => `peoples=${encodeURIComponent(id)}`),
        `startDate=${watchStartDate}`,
      ].join('&'),
    };

    try {
      await trigger(meetingParameter)?.unwrap();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };
  const handleFetchBookedMeetingSlots = async () => {
    const meetingParameter = {
      queryParams: `startDate=${watchStartDate}`,
    };

    try {
      await bookedTrigger(meetingParameter)?.unwrap();
    } catch (error) {}
  };
  const slotsData = status?.data?.data?.availability;
  const bookedSlotsData = bookedStatus?.data?.data?.bookedSlots;

  return {
    userDropdown,
    peopleData,
    organizer,
    handleDateValues,
    router,
    handleFetchMeetingSlots,
    status,
    slotsData,
    watchStartDate,
    meetingType,
    handleFetchBookedMeetingSlots,
    bookedStatus,
    bookedSlotsData,
    watchPeople,
  };
};
