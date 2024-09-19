import { DATE_FORMAT } from '@/constants';
import {
  useLazyGetWorkloadFilterQuery,
  useLazyGetWorkloadQuery,
} from '@/services/airServices/workload';
import dayjs from 'dayjs';
import { NextRouter, useRouter } from 'next/router';
import { RefObject, useEffect, useRef, useState } from 'react';
import { IFilter, IOnClickEvent, ISelected } from './Workload.interface';

export default function useWorkload() {
  const calendarRef: RefObject<any> = useRef<any>(null);
  const router: NextRouter = useRouter();

  const [filter, setFilter] = useState<IFilter>({
    countDayWise: undefined,
    countDayWiseHours: undefined,
    countDayWiseHoursAverage: undefined,
  });

  const [onClickEvent, setOnClickEvent] = useState<IOnClickEvent>({
    open: null,
    data: null,
  });
  const [addPlannedEffort, setAddPlannedEffort] = useState<IOnClickEvent>({
    open: null,
    data: null,
  });
  const [addPlannedTicketEffort, setAddPlannedTicketEffort] =
    useState<IOnClickEvent>({
      open: null,
      data: null,
    });
  const [dateCalendar, setDateCalendar] = useState<string | any>(
    dayjs()
      ?.startOf('week')
      ?.format(DATE_FORMAT?.API),
  );
  const [selected, setSelected] = useState<ISelected | null>(null);
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

  const dateChangeHandler = async (date: string | any) => {
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
    } catch (error) {}
  };

  return {
    status,
    statusFilter,
    dateChangeHandler,
    dateCalendar,
    selected,
    setSelected,
    setFilter,
    calendarRef,
    setAddPlannedEffort,
    router,
    setOnClickEvent,
    onClickEvent,
    addPlannedEffort,
    setAddPlannedTicketEffort,
    addPlannedTicketEffort,
  };
}
