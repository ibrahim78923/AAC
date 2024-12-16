import { DATE_FORMAT } from '@/constants';
import { endOfTime, startOfAddTime, startOfFormat } from '@/lib/date-time';
import {
  useLazyGetAirServicesWorkloadFilterQuery,
  useLazyGetAirServicesWorkloadQuery,
} from '@/services/airServices/workload';
import { NextRouter, useRouter } from 'next/router';
import { RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function useWorkload() {
  const calendarRef: RefObject<any> = useRef<any>(null);
  const router: NextRouter = useRouter();

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
  const [addPlannedTicketEffort, setAddPlannedTicketEffort] = useState<any>({
    open: null,
    data: null,
  });
  const [dateCalendar, setDateCalendar] = useState<string | any>(
    startOfFormat(new Date(), 'week', DATE_FORMAT?.API),
  );
  const [selected, setSelected] = useState<any>(null);
  const [filterByTypeState, setFilterByTypeState] = useState('ALL');

  const methods = useForm({
    defaultValues: { filterModuleType: filterByTypeState ?? 'ALL' },
  });

  const [trigger, status] = useLazyGetAirServicesWorkloadQuery();
  const [triggerFilter, statusFilter] =
    useLazyGetAirServicesWorkloadFilterQuery();

  // Memoize parameters for API calls to avoid unnecessary recalculations
  const workloadParams = useMemo(
    () => ({
      startDate: startOfAddTime(dateCalendar, 'week', 1, 'day'),
      endDate: endOfTime(dateCalendar, 'week'),
      agent: selected?._id,
      assignTo: selected?._id,
      moduleType: filterByTypeState,
    }),
    [dateCalendar, selected, filterByTypeState],
  );

  const filterParams = useMemo(
    () => ({
      ...workloadParams,
      countDayWise: filter?.countDayWise,
      countDayWiseHours: filter?.countDayWiseHours,
      countDayWiseHoursAverage: filter?.countDayWiseHoursAverage,
    }),
    [workloadParams, filter],
  );

  const firstTrigger = () => {
    trigger(workloadParams);
  };

  useEffect(() => {
    firstTrigger();
  }, [workloadParams]);

  useEffect(() => {
    triggerFilter(filterParams);
  }, [filterParams]);

  const dateChangeHandler = async (date: string | any) => {
    setDateCalendar(date);
    try {
      await Promise.all([
        trigger({
          ...workloadParams,
          startDate: startOfAddTime(date, 'week', 1, 'day'),
          endDate: endOfTime(date, 'week'),
        }).unwrap(),
        triggerFilter({
          ...filterParams,
          startDate: startOfAddTime(date, 'week', 1, 'day'),
          endDate: endOfTime(date, 'week'),
        }).unwrap(),
      ]);

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
    methods,
    setFilterByTypeState,
    firstTrigger,
  };
}
