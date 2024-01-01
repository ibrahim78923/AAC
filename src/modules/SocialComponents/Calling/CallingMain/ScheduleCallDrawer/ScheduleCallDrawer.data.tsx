import {
  RHFDatePicker,
  RHFSelect,
  RHFTextField,
  RHFTimePicker,
} from '@/components/ReactHookForm';
import { TIME_FORMAT } from '@/constants';
import dayjs from 'dayjs';
import * as Yup from 'yup';

export const dealsCallsValidationSchema = Yup?.object()?.shape({
  title: Yup?.string()?.trim()?.required('Field is Required'),
  callFromDate: Yup?.string()?.required('Field is Required'),
  callFromTime: Yup?.string()?.required('Field is Required'),
  callToDate: Yup?.date()
    ?.required('End Date is required')
    ?.test(
      'startDateBeforecallToDate',
      'End Date must be after Start Date',
      function (callToDate) {
        const { callFromDate } = this?.parent;
        if (!callFromDate || !callToDate) {
          return true;
        }
        return new Date(callFromDate) < new Date(callToDate);
      },
    ),

  callToTime: Yup?.string()
    ?.required('End Time is required')
    ?.test(
      'startTimeBeforecallToTime',
      'End Time must be after Start Time',
      function (callToTime) {
        const { callFromTime } = this?.parent;
        if (!callFromTime || !callToTime) {
          return true;
        }

        const parseTime = (time) => {
          const [hours, minutes] = time?.split(':');
          return new Date(0, 0, 0, hours, minutes);
        };
        return (
          parseTime(dayjs(callFromTime)?.format(TIME_FORMAT?.TIME_VALIDATION)) <
          parseTime(dayjs(callToTime)?.format(TIME_FORMAT?.TIME_VALIDATION))
        );
      },
    ),
});

export const dealsCallsDefaultValues = {
  title: '',
  outcome: '',
  callType: '',
};

export const dealsCallsDataArray = ({ DealsListData, openDrawer }: any) => [
  {
    componentProps: {
      name: 'title',
      label: 'Title',
      required: true,
      placeholder: 'Title',
      fullWidth: true,
      disabled: openDrawer === 'Reschedule',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'callFromDate',
      label: 'Start Date',
      required: true,

      fullWidth: true,
      disabled: openDrawer === 'Edit',
    },
    component: RHFDatePicker,
    md: 6,
  },
  {
    componentProps: {
      name: 'callToDate',
      label: '  End Date',
      fullWidth: true,
      required: true,
      disabled: openDrawer === 'Edit',
    },
    component: RHFDatePicker,
    md: 6,
  },
  {
    componentProps: {
      name: 'callFromTime',
      label: 'Start Time',
      fullWidth: true,
      required: true,
      disabled: openDrawer === 'Edit',
    },
    component: RHFTimePicker,
    md: 6,
  },

  {
    componentProps: {
      name: 'callToTime',
      label: 'End Time',
      required: true,
      fullWidth: true,
      disabled: openDrawer === 'Edit',
    },
    component: RHFTimePicker,
    md: 6,
  },

  {
    componentProps: {
      name: 'dealId',
      label: 'Link Deal',
      fullWidth: true,
      select: true,
      disabled: openDrawer === 'Reschedule',
    },

    options: DealsListData,

    component: RHFSelect,

    md: 12,
  },

  {
    componentProps: {
      name: 'callType',
      label: 'Select Call Type',
      fullWidth: true,
      select: true,
      disabled: openDrawer === 'Reschedule',
    },
    options: [
      { value: 'CONFERENCE', label: 'Conference call' },
      { value: 'ONE_ON_ONE', label: 'One-on-One Call' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'setReminder',
      label: 'Set Reminder',
      fullWidth: true,
      select: true,
      disabled: openDrawer === 'Reschedule',
    },
    options: [
      { value: '30 minutes before', label: '30 minutes before' },
      { value: '1 hour before', label: '1 hour before' },
      { value: '1 day before', label: '1 day before' },
      { value: '1 week before', label: '1 week before' },
    ],
    component: RHFSelect,
    md: 12,
  },
];

export const drawerTitle: any = {
  Add: 'Schedule Call',
  Edit: 'Edit Call',
  Reschedule: 'Reschedule Call',
};
export const drawerButtonTitle: any = {
  Add: 'Add',
  Edit: 'Edit',
  Reschedule: 'Update',
};
