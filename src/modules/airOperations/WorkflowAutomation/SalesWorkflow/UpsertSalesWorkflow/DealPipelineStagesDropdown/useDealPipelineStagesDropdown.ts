import { useLazyGetDealDropdownListQuery } from '@/services/airOperations/workflow-automation/sales-workflow';
import { useTheme } from '@mui/material';
import { debounce } from 'lodash';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

export const useDealPipelineStagesDropdown = () => {
  const { control } = useFormContext();
  const [open, setOpen] = useState(false);
  const [trigger, { data, isLoading, isFetching }]: any =
    useLazyGetDealDropdownListQuery();
  const triggerDebounce = debounce((newInputValue) => {
    trigger({
      params: {
        search: newInputValue?.length ? newInputValue : undefined,
        meta: false,
      },
    });
  }, 500);

  const onChanged = (e: any, newValue: any, onChange: any) => {
    onChange(newValue);
  };
  const theme: any = useTheme();
  return {
    control,
    open,
    setOpen,
    data,
    isLoading,
    isFetching,
    onChanged,
    theme,
    triggerDebounce,
    trigger,
  };
};
