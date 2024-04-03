import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import {
  holidayDefaultValues,
  holidayValidationSchema,
} from './AddHoliday.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePostHolidayMutation } from '@/services/airServices/settings/service-management/business-hours';
import { errorSnackbar, successSnackbar } from '@/utils/api';
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
      successSnackbar('Holiday Added Successfully');
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
      await postHolidayTrigger(postHolidayParameter)?.unwrap();
      successSnackbar('Holiday Added Successfully');
      closeHolidayModal();
    } catch (error: any) {
      errorSnackbar();
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
