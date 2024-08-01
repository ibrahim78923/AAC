import { FieldValues, UseFormReturn } from 'react-hook-form';

export interface TableI {
  columnsData: any[];
  watch: UseFormReturn<FieldValues>['watch'];
}
