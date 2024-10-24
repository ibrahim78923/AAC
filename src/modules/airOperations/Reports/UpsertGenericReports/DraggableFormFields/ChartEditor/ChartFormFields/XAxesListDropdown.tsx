import { RHFAutocomplete } from '@/components/ReactHookForm';
import { xAxisOptionsI } from '../ChartEditor.interface';

export const XAxesListDropdown = (props: any) => {
  const { disableTemplate, xAxesDataArray, metricType, label } = props;

  return (
    <RHFAutocomplete
      size="small"
      label={label}
      name="xAxis"
      placeholder="Select Option"
      disabled={disableTemplate}
      options={xAxesDataArray[metricType]}
      getOptionLabel={(option: xAxisOptionsI) => option?.label}
      isOptionEqualToValue={(option: any, newValue: any) =>
        option?.value === newValue?.value
      }
    />
  );
};
