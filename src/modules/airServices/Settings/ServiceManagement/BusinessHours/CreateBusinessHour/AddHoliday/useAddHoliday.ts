import { v4 as uuidv4 } from 'uuid';
import {
  holidayDefaultValues,
  holidayValidationSchema,
} from './AddHoliday.data';
import { usePostAirServicesSettingsServiceBusinessHourHolidayMutation } from '@/services/airServices/settings/service-management/business-hours';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { IErrorResponse } from '@/types/shared/ErrorResponse';
import { CALENDAR_FORMAT } from '@/constants';
import { otherDateFormat } from '@/lib/date-time';
import { useFormLib } from '@/hooks/useFormLib';

export const useAddHoliday = (props: any) => {
  const {
    setHolidaysData,
    openAddHolidayModal,
    setOpenAddHolidayModal,
    businessHourId,
  } = props;

  const formLibProps = {
    validationSchema: holidayValidationSchema,
    defaultValues: holidayDefaultValues,
  };

  const { handleSubmit, reset, methods } = useFormLib(formLibProps);

  const [postHolidayTrigger, postHolidayStatus] =
    usePostAirServicesSettingsServiceBusinessHourHolidayMutation();

  const closeHolidayModal = () => {
    setOpenAddHolidayModal(false);
    reset();
  };

  const onSubmitRequest = handleSubmit(async (data: any) => {
    const body = {
      ...data,
      date: otherDateFormat(data?.date, CALENDAR_FORMAT?.YMD),
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
    methods,
    reset,
    onSubmitRequest,
    postHolidayStatus,
    closeHolidayModal,
  };
};
