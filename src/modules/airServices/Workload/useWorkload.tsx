import { DATE_FORMAT } from '@/constants';
import { endOfTime, startOfAddTime, startOfFormat } from '@/lib/date-time';
import {
  useLazyGetAirServicesWorkloadFilterQuery,
  useLazyGetAirServicesWorkloadQuery,
} from '@/services/airServices/workload';
import { NextRouter, useRouter } from 'next/router';
import { RefObject, useEffect, useRef, useState } from 'react';
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

  const firstTrigger = () => {
    trigger({
      startDate: startOfAddTime(dateCalendar, 'week', 1, 'day'),
      endDate: endOfTime(dateCalendar, 'week'),
      agent: selected?._id,
      assignTo: selected?._id,
      moduleType: filterByTypeState,
    });
  };

  useEffect(() => {
    firstTrigger?.();
  }, [selected, filterByTypeState]);

  useEffect(() => {
    triggerFilter({
      startDate: startOfAddTime(dateCalendar, 'week', 1, 'day'),
      endDate: endOfTime(dateCalendar, 'week'),
      agent: selected?._id,
      assignTo: selected?._id,
      countDayWise: filter?.countDayWise,
      countDayWiseHours: filter?.countDayWiseHours,
      countDayWiseHoursAverage: filter?.countDayWiseHoursAverage,
      moduleType: filterByTypeState,
    });
  }, [filter]);

  const dateChangeHandler = async (date: string | any) => {
    setDateCalendar(date);
    try {
      await trigger({
        startDate: startOfAddTime(date, 'week', 1, 'day'),
        endDate: endOfTime(date, 'week'),
        agent: selected?._id,
        assignTo: selected?._id,
        moduleType: filterByTypeState,
      })?.unwrap();

      await triggerFilter({
        startDate: startOfAddTime(date, 'week', 1, 'day'),
        endDate: endOfTime(date, 'week'),
        agent: selected?._id,
        assignTo: selected?._id,
        countDayWise: filter?.countDayWise,
        countDayWiseHours: filter?.countDayWiseHours,
        countDayWiseHoursAverage: filter?.countDayWiseHoursAverage,
        moduleType: filterByTypeState,
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
    methods,
    setFilterByTypeState,
    firstTrigger,
  };
}
