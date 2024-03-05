import { DATE_FORMAT } from '@/constants';
import {
  useLazyGetWorkloadFilterQuery,
  useLazyGetWorkloadQuery,
} from '@/services/airServices/workload';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

export default function useWorkload() {
  const calendarRef = useRef<any>(null);
  const router: any = useRouter();

  const zeroIndex = 0;

  const [filter, setFilter] = useState<any>({
    countDayWise: undefined,
    countDayWiseHours: undefined,
    countDayWiseHoursAverage: undefined,
  });

  const [onClickEvent, setOnClickEvent] = useState<any>({
    open: null,
    data: null,
  });
  const [addPlannedEffort, setAddPlannedEffort] = useState<any>({
    open: null,
    data: null,
  });
  const [dateCalendar, setDateCalendar] = useState<any>(
    dayjs()
      ?.startOf('week')
      ?.format(DATE_FORMAT?.API),
  );
  const [selected, setSelected] = useState<any>(null);
  const [trigger, status] = useLazyGetWorkloadQuery();
  const [triggerFilter, statusFilter] = useLazyGetWorkloadFilterQuery();

  useEffect(() => {
    trigger({
      startDate: dayjs()?.startOf('week')?.add(1, 'day')?.toISOString(),
      endDate: dayjs()?.endOf('week')?.toISOString(),
      userIds: selected?._id,
    });
  }, [selected]);

  useEffect(() => {
    triggerFilter({
      startDate: dayjs()?.startOf('week')?.add(1, 'day')?.toISOString(),
      endDate: dayjs()?.endOf('week')?.toISOString(),
      countDayWise: filter?.countDayWise,
      countDayWiseHours: filter?.countDayWiseHours,
      countDayWiseHoursAverage: filter?.countDayWiseHoursAverage,
    });
  }, [filter]);

  const COMPLETED = 'Done';
  const IN_PROGRESS = 'In-Progress';

  const dateChangeHandler = async (date: any) => {
    setDateCalendar(date);
    try {
      await trigger({
        startDate: dayjs(date)?.startOf('week')?.add(1, 'day')?.toISOString(),
        endDate: dayjs(date)?.endOf('week')?.toISOString(),
        userIds: selected?._id,
      })?.unwrap();

      await triggerFilter({
        startDate: dayjs(date)?.startOf('week')?.add(1, 'day')?.toISOString(),
        endDate: dayjs(date)?.endOf('week')?.toISOString(),
        countDayWise: filter?.countDayWise,
        countDayWiseHours: filter?.countDayWiseHours,
        countDayWiseHoursAverage: filter?.countDayWiseHoursAverage,
      })?.unwrap();

      calendarRef?.current?.getApi()?.gotoDate(date);
    } catch (error: any) {}
  };

  return {
    status,
    statusFilter,
    zeroIndex,
    dateChangeHandler,
    dateCalendar,
    selected,
    setSelected,
    setFilter,
    calendarRef,
    COMPLETED,
    IN_PROGRESS,
    setAddPlannedEffort,
    router,
    setOnClickEvent,
    onClickEvent,
    addPlannedEffort,
  };
}
