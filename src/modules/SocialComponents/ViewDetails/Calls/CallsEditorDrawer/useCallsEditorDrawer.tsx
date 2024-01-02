import {
  dealsCallsDefaultValues,
  dealsCallsValidationSchema,
} from './CallsEditorDrawer.data';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import dayjs from 'dayjs';
import { DATE_FORMAT, TIME_FORMAT } from '@/constants';
import {
  usePostCallsMutation,
  useUpdateCallsMutation,
} from '@/services/commonFeatures/calling';
import { useGetEmployeeListQuery } from '@/services/superAdmin/user-management/UserList';
import { useGetContactsQuery } from '@/services/commonFeatures/contacts';
import { getSession } from '@/utils';

const useCallsEditorDrawer = ({
  openDrawer,
  setOpenDrawer,
  setSelectedCheckboxes,
  selectedCheckboxes,
}: any) => {
  const { user } = getSession();
  const [postCalls] = usePostCallsMutation();
  const [updateCalls] = useUpdateCallsMutation();
  const editCallValue = selectedCheckboxes && selectedCheckboxes[0];

  const { data: employeeList } = useGetEmployeeListQuery({
    orgId: user?.organization?._id,
  });
  const { data: ContactListData } = useGetContactsQuery({});

  const EmployeeList = ContactListData?.data?.contacts?.concat(
    employeeList?.data?.users,
  );
  const EmployeeData = EmployeeList?.map((data: any) => ({
    label: `${data?.firstName} ${data?.lastName}`,
    value: data?._id,
  }));

  const methodsdealsCalls = useForm({
    resolver: yupResolver(dealsCallsValidationSchema),

    defaultValues: async () => {
      if (editCallValue && openDrawer !== 'Add') {
        const {
          title,
          callFromDate,
          callFromTime,
          callToDate,
          callToTime,
          attendees,
          outcome,
          callNotes,
        }: any = editCallValue;
        const currentDate = new Date()?.toJSON()?.slice(0, 10);
        return {
          title,
          callFromDate: new Date(callFromDate),
          callFromTime: new Date(`${currentDate} ${callFromTime}`),
          callToDate: new Date(callToDate),
          callToTime: new Date(`${currentDate} ${callToTime}`),
          attendee: attendees,
          Outcome: outcome,
          Notes: callNotes,
        };
      }
      return dealsCallsDefaultValues;
    },
  });

  const { handleSubmit, reset } = methodsdealsCalls;

  const onClose = () => {
    setOpenDrawer('');
    reset();
    openDrawer !== 'Add' && setSelectedCheckboxes([]);
  };

  const onSubmit = async (values: any) => {
    const {
      callToDate,
      callToTime,
      callFromTime,
      callFromDate,
      title,
      attendee,
    } = values;
    const payload = {
      title: title,
      attendees: attendee,
      outcome: values?.Outcome,
      callNotes: values?.Notes,
      callToDate: dayjs(callToDate)?.format(DATE_FORMAT?.API),
      callToTime: dayjs(callToTime)?.format(TIME_FORMAT?.API),
      callFromTime: dayjs(callFromTime)?.format(TIME_FORMAT?.API),
      callFromDate: dayjs(callFromDate)?.format(DATE_FORMAT?.API),
      // status: openDrawer === 'Reschedule' ? 'Re-Scheduled' : status,
    };

    try {
      openDrawer !== 'Add'
        ? await updateCalls({
            body: payload,
            id: editCallValue?._id,
          })?.unwrap()
        : await postCalls({ body: payload })?.unwrap();
      enqueueSnackbar(
        `Call Schedule ${
          openDrawer === 'Edit' ? 'Updated' : 'Added '
        } Successfully`,
        {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        },
      );
      onClose();
    } catch (error) {
      const errMsg = error?.data?.message;
      const errMessage = Array?.isArray(errMsg) ? errMsg[0] : errMsg;
      enqueueSnackbar(errMessage ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  return { handleSubmit, onSubmit, methodsdealsCalls, EmployeeData };
};

export default useCallsEditorDrawer;
