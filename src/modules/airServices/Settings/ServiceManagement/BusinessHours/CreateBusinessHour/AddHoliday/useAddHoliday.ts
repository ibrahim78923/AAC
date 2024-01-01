import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import {
  holidayDefaultValues,
  holidayValidationSchema,
} from './AddHoliday.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePostHolidayMutation } from '@/services/airServices/settings/service-management/business-hours';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
export const useAddHoliday = (props: any) => {
  const {
    setHolidaysData,
    openAddHolidayModal,
    setOpenAddHolidayModal,
    businessHourId,
  } = props;
  const method = useForm({
    defaultValues: holidayDefaultValues,
    resolver: yupResolver(holidayValidationSchema),
  });
  const [postHolidayTrigger, postHolidayStatus] = usePostHolidayMutation();
  const { handleSubmit, reset } = method;
  const closeHolidayModal = () => {
    setOpenAddHolidayModal(false);
    reset();
  };
  const onSubmitRequest = handleSubmit(async (data: any) => {
    const body = {
      ...data,
      date: dayjs(data?.date, 'YYYY-MM-DD').format('YYYY-MM-DD'),
    };
    if (!!!businessHourId) {
      const newData = {
        ...body,
        uuid: uuidv4(),
      };
      setHolidaysData((pervState: any) =>
        pervState ? [...pervState, newData] : [newData],
      );
      enqueueSnackbar('Holiday Added Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      closeHolidayModal();
      return;
    }

    const postHolidayParameter = {
      body: {
        ...body,
        id: businessHourId,
      },
    };
    try {
      const response = await postHolidayTrigger(postHolidayParameter)?.unwrap();
      enqueueSnackbar(response?.message ?? 'Holiday Added Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      closeHolidayModal();
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message?.[0] ?? 'Something went wrong', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  });
  return {
    openAddHolidayModal,
    setOpenAddHolidayModal,
    method,
    reset,
    onSubmitRequest,
    postHolidayStatus,
  };
};
