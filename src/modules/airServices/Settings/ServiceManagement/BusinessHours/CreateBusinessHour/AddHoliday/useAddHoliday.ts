import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import {
  holidayDefaultValues,
  holidayValidationSchema,
} from './AddHoliday.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePostAirServicesSettingsServiceBusinessHourHolidayMutation } from '@/services/airServices/settings/service-management/business-hours';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { IErrorResponse } from '@/types/shared/ErrorResponse';
import { CALENDAR_FORMAT } from '@/constants';

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

  const [postHolidayTrigger, postHolidayStatus] =
    usePostAirServicesSettingsServiceBusinessHourHolidayMutation();

  const { handleSubmit, reset } = method;

  const closeHolidayModal = () => {
    setOpenAddHolidayModal(false);
    reset();
  };

  const onSubmitRequest = handleSubmit(async (data: any) => {
    const body = {
      ...data,
      date: dayjs(data?.date)?.format(CALENDAR_FORMAT?.YMD),
    };
    if (!!!businessHourId) {
      const newData = {
        ...body,
        uuid: uuidv4(),
      };
      setHolidaysData((pervState: any) =>
        pervState ? [...pervState, newData] : [newData],
      );
      successSnackbar('Holiday added successfully');
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
      successSnackbar('holiday added successfully');
      closeHolidayModal();
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
    }
  });

  return {
    openAddHolidayModal,
    setOpenAddHolidayModal,
    method,
    reset,
    onSubmitRequest,
    postHolidayStatus,
    closeHolidayModal,
  };
};
