import { PageTitledHeader } from '@/components/PageTitledHeader';
import {
  RHFAutocomplete,
  RHFCheckbox,
  RHFTextField,
} from '@/components/ReactHookForm';
import {
  Box,
  Button,
  InputAdornment,
  Toolbar,
  Typography,
} from '@mui/material';
import { useChartEditor } from './useChartEditor';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { CheckBox } from '@mui/icons-material';
import { CHARTS } from '@/constants/strings';
import {
  CheckboxCheckedIcon,
  CheckboxIcon,
  EditInputIcon,
} from '@/assets/icons';

export const ChartEditor = (props: any) => {
  const {
    chartType,
    metricType,
    setValue,
    chartTitle,
    chartMetricType,
    xAxisData,
    yAxisData,
    handleCancel,
  } = props;

  const {
    handleSave,
    edit,
    setEdit,
    editValue,
    setEditValue,
    dropdownOptions,
  } = useChartEditor(props);

  return (
    <>
      <PageTitledHeader
        title={'Chart Configuration'}
        canMovedBack
        moveBack={handleCancel}
      />
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
                  <EditInputIcon />
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
      <Box height={'40vh'}>
        <RHFAutocomplete
          name="chartType"
          label="Type"
          size="small"
          options={[
            'Bar Chart',
            'Donut Chart',
            'Pie Chart',
            'Horizotal Bar Chart',
          ]}
          getOptionLabel={(option: any) => option}
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
                getOptionLabel={(option: string) => option}
              />
            </Box>
            <Box p={1}>
              <RHFAutocomplete
                size="small"
                label="Y Axis"
                name="yAxis"
                options={['Task Owner', 'Created Date', 'Status', 'Task Count']}
                getOptionLabel={(option: string) => option}
              />
            </Box>
          </Box>
        )}
        {(chartType === CHARTS?.PIE_CHART ||
          chartType === CHARTS?.DONUT_CHART) && (
          <>
            <Box m={1}>
              <SingleDropdownButton
                dropdownOptions={dropdownOptions}
                dropdownName={chartMetricType}
              />
            </Box>
          </>
        )}
        <RHFCheckbox
          name="subFilter"
          label="Add Date Range Filter"
          icon={<CheckboxIcon />}
          checkedIcon={<CheckboxCheckedIcon />}
        />
      </Box>
      <Toolbar
        sx={{ mt: 19, display: 'flex', justifyContent: 'flex-end', gap: 1 }}
      >
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
      </Toolbar>
    </>
  );
};
