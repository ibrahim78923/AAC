import { RHFAutocomplete } from '@/components/ReactHookForm';
import { CHARTS } from '@/constants/strings';
import { chartTypeI } from '../ChartEditor.interface';

export const ChartListDropdown = (props: any) => {
  const { disableTemplate } = props;

  return (
    <RHFAutocomplete
      name="chartType"
      label="Type"
      size="small"
      disabled={disableTemplate}
      options={[
        CHARTS?.BAR_CHART,
        CHARTS?.HORIZONTAL_BAR_CHART,
        CHARTS?.PIE_CHART,
        CHARTS?.DONUT_CHART,
      ]}
      getOptionLabel={(option: chartTypeI) => option}
      isOptionEqualToValue={(option: any, newValue: any) => option === newValue}
      required
    />
  );
};
