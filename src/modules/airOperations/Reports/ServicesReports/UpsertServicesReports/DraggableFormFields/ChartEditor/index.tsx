import { PageTitledHeader } from '@/components/PageTitledHeader';
import {
  RHFAutocomplete,
  RHFCheckbox,
  RHFTextField,
} from '@/components/ReactHookForm';
import { Box, Button, InputAdornment, Typography } from '@mui/material';
import { useChartEditor } from './useChartEditor';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { CheckBox } from '@mui/icons-material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { servicesChartMetrics } from './ChartEditor.data';
import { CHARTS } from '@/constants/strings';

export const ChartEditor = (props: any) => {
  const {
    chartType,
    metricType,
    setValue,
    chartTitle,
    setChartMetricType,
    chartMetricType,
    xAxisData,
    yAxisData,
  } = props;

  const { handleSave, edit, setEdit, editValue, setEditValue, handleCancel } =
    useChartEditor(props);
  return (
    <>
      <PageTitledHeader title={'Chart'} canMovedBack moveBack={handleCancel} />
      <RHFTextField
        name={'chartTitle'}
        size="small"
        label="Title"
        disabled={edit}
        InputProps={{
          onClick: () => {},
          endAdornment: (
            <InputAdornment position="end" sx={{ cursor: 'pointer' }}>
              {edit ? (
                <Box
                  onClick={() => {
                    setEdit(false), setValue === editValue;
                  }}
                >
                  <BorderColorIcon />
                </Box>
              ) : (
                <Box
                  onClick={() => {
                    setEdit(true), setEditValue(chartTitle);
                  }}
                >
                  <CheckBox />
                </Box>
              )}
            </InputAdornment>
          ),
        }}
      />
      <RHFAutocomplete
        name="chartType"
        label="Type"
        size="small"
        options={['Bar Chart', 'Donut Chart', 'Pie Chart']}
        required
      />
      {chartType === CHARTS?.BAR_CHART && (
        <Box border={1} borderColor={'grey.700'} borderRadius={2} m={1}>
          <Box borderRadius={2} p={1} bgcolor={'primary.light'}>
            <Typography variant="h6">{metricType}</Typography>
          </Box>

          <Box p={1}>
            <RHFAutocomplete
              size="small"
              label="X Axis"
              name="xAxis"
              options={['Task Owner', 'Created Date', 'Status', 'Task Count']}
            />
          </Box>
          <Box p={1}>
            <RHFAutocomplete
              size="small"
              label="Y Axis"
              name="yAxis"
              options={['Task Owner', 'Created Date', 'Status', 'Task Count']}
            />
          </Box>
        </Box>
      )}
      {(chartType === CHARTS?.PIE_CHART ||
        chartType === CHARTS?.DONUT_CHART) && (
        <>
          <Box m={1}>
            <SingleDropdownButton
              dropdownOptions={servicesChartMetrics(setChartMetricType)}
              dropdownName={chartMetricType}
            />
          </Box>
        </>
      )}
      <RHFCheckbox
        name="subFilter"
        label="Add Date Range Filter"
        size="large"
      />
      <Box position={'fixed'} bottom={75} right={90} gap={1} display={'flex'}>
        <Button variant="outlined" onClick={handleCancel} color="secondary">
          Cancel
        </Button>
        <Button
          variant="contained"
          disabled={
            (!xAxisData || !yAxisData) && chartMetricType === 'Add Metric'
          }
          onClick={() => handleSave()}
        >
          Save
        </Button>
      </Box>
    </>
  );
};
