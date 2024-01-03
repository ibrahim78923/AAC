import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import {
  businessHourDefaultValues,
  businessHourValidationSchema,
  holidaysDropDownData,
} from './CreateBusinessHour.data';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useGetBusinessHourByIdQuery,
  useLazyGetHolidaysQuery,
  usePatchBusinessHourMutation,
  usePostBusinessHourMutation,
} from '@/services/airServices/settings/service-management/business-hours';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { AIR_SERVICES } from '@/constants';
import { useEffect, useState } from 'react';
import { PAGINATION } from '@/config';
import dayjs from 'dayjs';
import { useSearchParams } from 'next/navigation';

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
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState<any>('');
  const [dateRange, setDateRange] = useState<any>([
    {
      startDate: new Date('2022-01-01'),
      endDate: new Date('2025-01-01'),
      key: 'selection',
    },
  ]);
  const [postBusinessHourTrigger, postBusinessHourStatus] =
    usePostBusinessHourMutation();
  const [patchBusinessHourTrigger, patchBusinessHourStatus] =
    usePatchBusinessHourMutation();
  const singleBusinessHour = useGetBusinessHourByIdQuery(businessHourId, {
    refetchOnMountOrArgChange: true,
    skip: !!!businessHourId,
  });
  const loadingStatus =
    patchBusinessHourStatus?.isLoading || postBusinessHourStatus?.isLoading;
  const [lazyGetHolidaysTrigger, getHolidaysStatus] = useLazyGetHolidaysQuery();
  const holidays = getHolidaysStatus?.data?.data?.holidays;
  const getHolidaysListData = async (country: any) => {
    enqueueSnackbar(
      'Importing can cause loss of Added or Deleted Holidays Data',
      {
        variant: NOTISTACK_VARIANTS?.ERROR,
      },
    );
    const getHolidaysParam = new URLSearchParams();
    getHolidaysParam?.append('country', country);
    try {
      const response = await lazyGetHolidaysTrigger(getHolidaysParam)?.unwrap();
      enqueueSnackbar(response?.message ?? 'Holidays Retrieved successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message ?? 'Error', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const businessHourMethod = useForm({
    defaultValues: businessHourDefaultValues(),
    resolver: yupResolver(businessHourValidationSchema),
  });
  const { control, watch, setValue, handleSubmit, reset }: any =
    businessHourMethod;
  const onSubmitRequest = handleSubmit(async (data: any) => {
    if (!holidaysData?.length) {
      enqueueSnackbar('Please Import or Add Holidays Before Submitting', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
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
      const response = await postBusinessHourTrigger(
        postBusinessHourParameter,
      )?.unwrap();
      enqueueSnackbar(response?.message ?? 'Business Hour Added Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      router?.push(AIR_SERVICES?.BUSINESS_HOURS_SETTINGS);
      reset();
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message?.[0] ?? 'Something went wrong', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  });
  const submitUpdateBusinessHour = async (data: any) => {
    const patchBusinessHourParameter = {
      body: { ...data, id: businessHourId },
    };
    try {
      const response = await patchBusinessHourTrigger(
        patchBusinessHourParameter,
      )?.unwrap();
      enqueueSnackbar(
        response?.message ?? 'Business Hour Updated Successfully!',
        {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        },
      );
      router?.push(AIR_SERVICES?.BUSINESS_HOURS_SETTINGS);
      reset();
    } catch (error) {
      enqueueSnackbar('Something went wrong', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
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
  return {
    router,
    businessHourMethod,
    control,
    watch,
    setValue,
    onSubmitRequest,
    buttonName,
    setButtonName,
    getHolidaysStatus,
    setHolidaysData,
    setPageLimit,
    setPage,
    pageLimit,
    page,
    dateRange,
    setDateRange,
    search,
    setSearch,
    manipulatedHolidaysData,
    openAddHolidayModal,
    setOpenAddHolidayModal,
    businessHourId,
    loadingStatus,
    singleBusinessHour,
  };
};
