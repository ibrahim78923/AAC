import { FieldValues, UseFormReturn } from 'react-hook-form';

export interface ChartI {
  allChartComponents: Record<string, JSX.Element>;
  setCalendarFilter: any;
  watch: UseFormReturn<FieldValues>['watch'];
}
