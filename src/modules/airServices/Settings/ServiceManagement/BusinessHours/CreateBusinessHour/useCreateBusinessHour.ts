import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import {
  businessHourDefaultValues,
  businessHourValidationSchema,
  holidaysDropDownData,
  holidaysListsColumn,
} from './CreateBusinessHour.data';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useGetAirServicesSettingsServiceBusinessHourByIdQuery,
  useLazyGetAirServicesSettingsServiceBusinessHourHolidaysQuery,
  usePatchAirServicesSettingsServiceBusinessHourMutation,
  usePostAirServicesSettingsServiceBusinessHourMutation,
} from '@/services/airServices/settings/service-management/business-hours';
import { AIR_SERVICES, CALENDAR_FORMAT } from '@/constants';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useSearchParams } from 'next/navigation';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { IErrorResponse } from '@/types/shared/ErrorResponse';
import { otherDateFormat } from '@/utils/dateTime';

export const useCreateBusinessHour = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const businessHourId = searchParams.get('id');

  const [buttonName, setButtonName] = useState<string>('');
  const [openAddHolidayModal, setOpenAddHolidayModal] =
    useState<boolean>(false);
  const [holidaysData, setHolidaysData] = useState<any>([]);
  const [manipulatedHolidaysData, setManipulatedHolidaysData] = useState<any>(
    [],
  );
  const [search, setSearch] = useState<any>('');
  const [dateRange, setDateRange] = useState<any>([
    {
      startDate: dayjs()?.startOf('month')?.toDate(),
      endDate: dayjs()?.endOf('month')?.toDate(),
      key: 'selection',
    },
  ]);

  const [postBusinessHourTrigger, postBusinessHourStatus] =
    usePostAirServicesSettingsServiceBusinessHourMutation();
  const [patchBusinessHourTrigger, patchBusinessHourStatus] =
    usePatchAirServicesSettingsServiceBusinessHourMutation();

  const singleBusinessHour =
    useGetAirServicesSettingsServiceBusinessHourByIdQuery(businessHourId, {
      refetchOnMountOrArgChange: true,
      skip: !!!businessHourId,
    });

  const [lazyGetHolidaysTrigger, getHolidaysStatus] =
    useLazyGetAirServicesSettingsServiceBusinessHourHolidaysQuery();

  const loadingStatus =
    patchBusinessHourStatus?.isLoading ||
    postBusinessHourStatus?.isLoading ||
    getHolidaysStatus?.isFetching ||
    getHolidaysStatus?.isLoading ||
    singleBusinessHour?.isLoading ||
    singleBusinessHour?.isFetching;

  const holidays = getHolidaysStatus?.data?.data?.holidays;

  const getHolidaysListData = async (country: any) => {
    errorSnackbar('Importing can cause loss of Added or Deleted Holidays Data');
    const getHolidaysParam = new URLSearchParams();
    getHolidaysParam?.append('country', country);
    try {
      const res: any = await lazyGetHolidaysTrigger(getHolidaysParam)?.unwrap();
      const newData = res.data.items?.map((item: any) => {
        return {
          name: item?.summary,
          date: otherDateFormat(item?.start?.date, CALENDAR_FORMAT?.YMD),
          uuid: item?.id,
        };
      });
      setHolidaysData((pervState: any) =>
        pervState ? [...pervState, ...newData] : newData,
      );
      if (res?.error) {
        errorSnackbar('Error in Retrieving Holidays');
        return;
      }
      successSnackbar('Holidays Retrieved successfully');
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
    }
  };

  const businessHourMethod = useForm({
    defaultValues: businessHourDefaultValues(),
    resolver: yupResolver(businessHourValidationSchema),
  });

  const { control, watch, handleSubmit, reset }: any = businessHourMethod;

  const onSubmitRequest = handleSubmit(async (data: any) => {
    if (!holidaysData?.length) {
      errorSnackbar('Please Import or Add Holidays Before Submitting');
      return;
    }
    delete data?.importHolidays;
    const {
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
      ...rest
    } = data;
    const body = {
      ...rest,
      timeZone: data?.timeZone?.label,
      monday: monday?.timings,
      tuesday: tuesday?.timings,
      wednesday: wednesday?.timings,
      thursday: thursday?.timings,
      friday: friday?.timings,
      saturday: saturday?.timings,
      sunday: sunday?.timings,
      holidays: holidaysData,
    };
    const postBusinessHourParameter = {
      body,
    };
    if (!!businessHourId) {
      submitUpdateBusinessHour(body);
      return;
    }
    try {
      await postBusinessHourTrigger(postBusinessHourParameter)?.unwrap();
      successSnackbar('Business Hour Created Successfully');
      router?.push(AIR_SERVICES?.BUSINESS_HOURS_SETTINGS);
      reset();
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
    }
  });

  const submitUpdateBusinessHour = async (data: any) => {
    const patchBusinessHourParameter = {
      body: { ...data, id: businessHourId },
    };
    try {
      await patchBusinessHourTrigger(patchBusinessHourParameter)?.unwrap();
      successSnackbar('Business Hour Updated Successfully!');
      router?.push(AIR_SERVICES?.BUSINESS_HOURS_SETTINGS);
      reset();
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
    }
  };

  useEffect(() => {
    if (buttonName) {
      getHolidaysListData(holidaysDropDownData?.[buttonName]);
    }
  }, [buttonName]);

  useEffect(() => {
    if (holidays?.length) {
      setHolidaysData(
        holidays?.map(({ name, uuid, date }: any) => ({ name, uuid, date })),
      );
    }
  }, [holidays]);

  useEffect(() => {
    setManipulatedHolidaysData(holidaysData);
    const filteredData = holidaysData?.filter(
      (item: any) => item?.name?.toLowerCase()?.includes(search?.toLowerCase()),
    );
    const startDate = dayjs(dateRange[0]?.startDate);
    const endDate = dayjs(dateRange[0]?.endDate);
    const dateFilteredData = filteredData?.filter((item: any) => {
      const itemDate = dayjs(item.date);
      const daysDifference = itemDate.diff(startDate, 'day');
      return (
        daysDifference >= 0 && daysDifference < endDate.diff(startDate, 'day')
      );
    });
    setManipulatedHolidaysData(dateFilteredData);
  }, [holidaysData, search, dateRange]);

  useEffect(() => {
    if (singleBusinessHour?.data) {
      reset(() => businessHourDefaultValues(singleBusinessHour?.data?.data));
      setHolidaysData(singleBusinessHour?.data?.data?.holidays);
    }
  }, [singleBusinessHour?.data, reset]);

  useEffect(() => {
    setButtonName(watch('importHolidays'));
  }, [watch('importHolidays')]);

  const tableColumns = holidaysListsColumn(setHolidaysData);
  const holidaysDataOptions = Object.keys(holidaysDropDownData);

  return {
    router,
    businessHourMethod,
    control,
    watch,
    onSubmitRequest,
    getHolidaysStatus,
    setHolidaysData,
    dateRange,
    setDateRange,
    setSearch,
    manipulatedHolidaysData,
    openAddHolidayModal,
    setOpenAddHolidayModal,
    businessHourId,
    loadingStatus,
    singleBusinessHour,
    tableColumns,
    holidaysDataOptions,
  };
};
