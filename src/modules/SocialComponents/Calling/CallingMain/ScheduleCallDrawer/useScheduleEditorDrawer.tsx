import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { getSession } from '@/utils';
import { useGetEmployeeListQuery } from '@/services/superAdmin/user-management/UserList';
import { useGetContactsQuery } from '@/services/commonFeatures/contacts';
import { usePostCallsMutation } from '@/services/commonFeatures/calling';
import {
  dealsCallsDefaultValues,
  dealsCallsValidationSchema,
} from './ScheduleCallDrawer.data';
import { DATE_FORMAT, TIME_FORMAT } from '@/constants';
import dayjs from 'dayjs';
import { enqueueSnackbar } from 'notistack';

import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useGetDealsListQuery } from '@/services/airSales/deals';

const useScheduleEditorDrawer = () => {
  const { user } = getSession();
  const { data: deals } = useGetDealsListQuery({});

  const { data: employeeList } = useGetEmployeeListQuery({
    orgId: user?.organization?._id,
  });
  const { data: ContactListData } = useGetContactsQuery({});

  const [postCalls] = usePostCallsMutation();

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
    defaultValues: dealsCallsDefaultValues,
  });

  const onSubmit = async (values: any) => {
    const { callToDate, callToTime, callFromTime, callFromDate, ...rest } =
      values;
    const payload = {
      callToDate: dayjs(callToDate)?.format(DATE_FORMAT?.API),
      callToTime: dayjs(callToTime)?.format(TIME_FORMAT?.API),
      callFromTime: dayjs(callFromTime)?.format(TIME_FORMAT?.API),
      callFromDate: dayjs(callFromDate)?.format(DATE_FORMAT?.API),
      ...rest,
    };

    try {
      await postCalls({
        body: payload,
      })?.unwrap();

      enqueueSnackbar(`Call Schedule  Successfully`, {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error) {
      const errMsg = error?.data?.message;
      enqueueSnackbar(errMsg ?? 'Error occurred', {
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
