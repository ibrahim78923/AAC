import { PageTitledHeader } from '@/components/PageTitledHeader';
import {
  RHFAutocomplete,
  RHFMultiSearchableSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import { Box, Button, InputAdornment, Typography } from '@mui/material';
import { useChartEditor } from './useChartEditor';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { CheckBox } from '@mui/icons-material';
import { DeleteBlackIcon } from '@/assets/icons';
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
                <Box display={'flex'} alignItems={'center'}>
                  <Box
                    onClick={() => {
                      setEdit(true), setEditValue(chartTitle);
                    }}
                  >
                    <CheckBox />
                  </Box>
                  <Box
                    onClick={() => {
                      setEdit(true), setValue('chartTitle', editValue);
                    }}
                  >
                    <DeleteBlackIcon />
                  </Box>
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

      <Box border={1} borderColor={'grey.700'} borderRadius={2} pb={1} mt={2}>
        <Box borderRadius={2} p={1} bgcolor={'primary.light'}>
          <Typography variant="h6">{metricType}</Typography>
        </Box>

        {chartType === CHARTS?.BAR_CHART && (
          <>
            <Box p={1}>
              <RHFMultiSearchableSelect
                size="small"
                label="X Axes"
                name="xAxes"
                options={[
                  {
                    value: 'Task Owner',
                    label: 'Task Owner',
                  },
                  {
                    value: 'Created Date',
                    label: 'Created Date',
                  },
                  {
                    value: 'Status',
                    label: 'Status',
                  },
                  {
                    value: 'Task Count',
                    label: 'Task Count',
                  },
                ]}
              />
            </Box>
            <Box p={1}>
              <RHFMultiSearchableSelect
                size="small"
                label="Y Axes"
                name="yAxes"
                options={[
                  {
                    value: 'Task Owner',
                    label: 'Task Owner',
                  },
                  {
                    value: 'Created Date',
                    label: 'Created Date',
                  },
                  {
                    value: 'Status',
                    label: 'Status',
                  },
                  {
                    value: 'Task Count',
                    label: 'Task Count',
                  },
                ]}
              />
            </Box>
          </>
        )}
        <Box p={1}>
          <SingleDropdownButton
            dropdownOptions={servicesChartMetrics(setChartMetricType)}
            dropdownName={chartMetricType}
          />
        </Box>
      </Box>
      <Box
        sx={{
          mt: chartType === CHARTS?.BAR_CHART ? 14 : 34,
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 1,
        }}
      >
        <Button variant="outlined" onClick={handleCancel} color="secondary">
          Cancel
        </Button>
        <Button
          variant="contained"
          disabled={!chartType}
          onClick={() => handleSave()}
        >
          Save
        </Button>
      </Box>
    </>
  );
};
