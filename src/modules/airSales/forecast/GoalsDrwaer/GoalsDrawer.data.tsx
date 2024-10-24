import {
  RHFAutocompleteAsync,
  RHFSwitchableDatepicker,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const filterValidationSchema = Yup.object().shape({
  pipelines: Yup.mixed(),
});

export const filterDefaultValues = {
  pipelines: null,
};
export const forecastFilterArray = (dealsListData: any) => {
  return [
    {
      id: 'pipelines',
      component: RHFAutocompleteAsync,
      md: 12,
      componentProps: {
        name: 'pipelines',
        label: 'Deal PipeLine',
        placeholder: 'Select Deal PipeLine',
        apiQuery: dealsListData,
        getOptionLabel: (option: any) => option?.name,
        externalParams: { meta: false },
      },
    },
    {
      componentProps: {
        name: 'CloseDate',
        label: 'Close date',
        fullWidth: true,
      },
      component: RHFSwitchableDatepicker,
      md: 12,
    },
  ];
};
