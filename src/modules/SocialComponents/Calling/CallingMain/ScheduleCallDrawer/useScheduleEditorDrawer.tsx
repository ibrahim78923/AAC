import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { getSession } from '@/utils';
import { useGetEmployeeListQuery } from '@/services/superAdmin/user-management/UserList';
import { useGetContactsQuery } from '@/services/commonFeatures/contacts';
import {
  usePostCallsMutation,
  useUpdateCallsMutation,
} from '@/services/commonFeatures/calling';
import {
  dealsCallsDefaultValues,
  dealsCallsValidationSchema,
} from './ScheduleCallDrawer.data';
import { DATE_FORMAT, TIME_FORMAT } from '@/constants';
import dayjs from 'dayjs';
import { enqueueSnackbar } from 'notistack';

import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useGetDealsListQuery } from '@/services/airSales/deals';

const useScheduleEditorDrawer = ({
  selectedCheckboxes,
  openDrawer,
  setOpenDrawer,
  setSelectedCheckboxes,
}: any) => {
  const { user } = getSession();
  const { data: deals } = useGetDealsListQuery({});
  const editCallValue = selectedCheckboxes && selectedCheckboxes[0];

  const { data: employeeList } = useGetEmployeeListQuery({
    orgId: user?.organization?._id,
  });
  const { data: ContactListData } = useGetContactsQuery({});

  const [postCalls] = usePostCallsMutation();
  const [updateCalls] = useUpdateCallsMutation();

  const EmployeeList = ContactListData?.data?.contacts?.concat(
    employeeList?.data?.users,
  );
  const EmployeeData = EmployeeList?.map((data: any) => ({
    label: `${data?.firstName} ${data?.lastName}`,
    value: data?._id,
  }));

  const DealsListData = deals?.data?.deals?.map((data: any) => ({
    label: data?.name,
    value: data?._id,
  }));

  const methodsdealsCalls = useForm({
    resolver: yupResolver(dealsCallsValidationSchema),

    defaultValues: async () => {
      if (editCallValue && openDrawer !== 'Add') {
        const {
          title,
          status,
          callFromDate,
          callFromTime,
          callToDate,
          callToTime,
          dealId,
          callType,
          setReminder,
          attendees,
          outcome,
          callNotes,
        }: any = editCallValue;
        const currentDate = new Date()?.toJSON()?.slice(0, 10);

        return {
          title,
          status,
          callFromDate: new Date(callFromDate),
          callFromTime: new Date(`${currentDate} ${callFromTime}`),
          callToDate: new Date(callToDate),
          callToTime: new Date(`${currentDate} ${callToTime}`),
          dealId,
          callType,
          setReminder,
          attendees,
          outcome,
          callNotes,
        };
      }
      return dealsCallsDefaultValues;
    },
  });
  const onClose = () => {
    setOpenDrawer('');
    openDrawer !== 'Add' && setSelectedCheckboxes([]);
  };

  const onSubmit = async (values: any) => {
    const {
      callToDate,
      callToTime,
      callFromTime,
      callFromDate,
      status,
      ...rest
    } = values;
    const payload = {
      callToDate: dayjs(callToDate)?.format(DATE_FORMAT?.API),
      callToTime: dayjs(callToTime)?.format(TIME_FORMAT?.API),
      callFromTime: dayjs(callFromTime)?.format(TIME_FORMAT?.API),
      callFromDate: dayjs(callFromDate)?.format(DATE_FORMAT?.API),
      status: openDrawer === 'Reschedule' ? 'Re-Scheduled' : status,
      ...rest,
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
  const { handleSubmit } = methodsdealsCalls;
  return {
    handleSubmit,
    onSubmit,
    methodsdealsCalls,
    EmployeeData,
    DealsListData: DealsListData,
  };
};

export default useScheduleEditorDrawer;
