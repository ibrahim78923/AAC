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
import { CHART_METRICS, xAxesDataArray } from './ChartEditor.data';

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
    disableTemplate,
    xAxisType,
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
        disabled={edit || disableTemplate}
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
          disabled={disableTemplate}
          options={[
            'Bar Chart',
            'Horizontal Bar Chart',
            'Donut Chart',
            'Pie Chart',
          ]}
          getOptionLabel={(option: any) => option}
          required
        />
        {(chartType === CHARTS?.BAR_CHART ||
          chartType === CHARTS?.HORIZONTAL_BAR_CHART) && (
          <Box border={1} borderColor={'grey.700'} borderRadius={2} m={1}>
            <Box borderRadius={2} p={1} bgcolor={'primary.light'}>
              <Typography variant="h6">{metricType}</Typography>
            </Box>
            <Box p={1}>
              <RHFAutocomplete
                size="small"
                label="X Axis"
                name="xAxis"
                disabled={disableTemplate}
                options={xAxesDataArray[metricType]}
                getOptionLabel={(option: any) =>
                  option?.label || 'Select Option'
                }
              />
            </Box>
            {xAxisData?.ref && (
              <Box mx={2} my={1}>
                <RHFAutocomplete
                  size="small"
                  name="xAxisType"
                  label="X Axis Field Type"
                  multiple={true}
                  disabled={disableTemplate}
                  options={[
                    {
                      _id: '1',
                      label: 'Ticket Requester',
                      value: 'ticket_requester',
                    },
                    {
                      _id: '2',
                      label: 'Ticket Category',
                      value: 'ticket_category',
                    },
                    { _id: '3', label: 'Status', value: 'status' },
                    {
                      _id: '4',
                      label: 'Ticket Department',
                      value: 'ticket_department',
                    },
                    { _id: '5', label: 'Source', value: 'source' },
                    { _id: '6', label: 'Impact', value: 'impact' },
                    { _id: '7', label: 'Ticket Agent', value: 'ticket_agent' },
                  ]}
                  getOptionLabel={(option: any) => option?.label}
                  placeholder="Select Option"
                />
              </Box>
            )}
            <Box p={1}>
              <RHFAutocomplete
                size="small"
                label="Y Axis"
                name="yAxis"
                placeholder="Select Option"
                disabled={disableTemplate}
                options={['No of Records']}
                getOptionLabel={(option: any) => option}
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
                disabled={disableTemplate}
              />
            </Box>
          </>
        )}
        <RHFCheckbox
          name="subFilter"
          label="Add Date Range Filter"
          disabled={disableTemplate}
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
            (!xAxisData || !yAxisData || (xAxisData?.ref && !xAxisType)) &&
            chartMetricType === CHART_METRICS?.ADD_METRIC
          }
          onClick={() => handleSave()}
        >
          Save
        </Button>
      </Toolbar>
    </>
  );
};
