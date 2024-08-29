import { FieldValues, UseFormReturn } from 'react-hook-form';

export interface TableI {
  watch: UseFormReturn<FieldValues>['watch'];
}
