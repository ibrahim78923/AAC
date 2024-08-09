import { UseFormReturn, UseFormHandleSubmit } from 'react-hook-form';

export interface TimeRange {
  startHour: string;
  endHour: string;
}

export interface DaysTimeRange {
  days: string;
  timeRanges: TimeRange[];
}

export interface DateOverride {
  date: string;
  timeRanges: TimeRange[];
}

export interface TimeSlotsData {
  _id: string;
  months: string[];
  daysTimeRanges: DaysTimeRange[];
  dateOverrides: DateOverride[];
  companyId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface BufferTime {
  bufferBefore: string;
  bufferAfter: string;
}

interface TimeSlotsFormValues {
  months: string[];
  daysTimeRanges: DaysTimeRange[];
  dateOverrides: DateOverride[];
  bufferTime: BufferTime;
}

export interface UseTimeSlotPreferencesReturnI {
  methods: UseFormReturn<TimeSlotsFormValues>;
  disabled: boolean;
  setDisabled: (value: boolean) => void;
  theme: any;
  onSubmit: (formData: TimeSlotsFormValues) => Promise<void>;
  handleSubmit: UseFormHandleSubmit<TimeSlotsFormValues>;
  watch: UseFormReturn<TimeSlotsFormValues>['watch'];
  setValue: UseFormReturn<TimeSlotsFormValues>['setValue'];
  selectedMonths: string[];
  setSelectedMonths: (months: string[]) => void;
  timeSlotsState: TimeSlotsData[];
  setTimeSlotsState: (state: TimeSlotsData[]) => void;
  daySlotsState: DaysTimeRange[];
  setDaySlotsState: (state: DaysTimeRange[]) => void;
  submittedOverrideData: DateOverride[];
  setSubmittedOverrideData: (data: DateOverride[]) => void;
  timeSlotsProcess: any;
  timeSlotsData: TimeSlotsData | undefined;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
}
