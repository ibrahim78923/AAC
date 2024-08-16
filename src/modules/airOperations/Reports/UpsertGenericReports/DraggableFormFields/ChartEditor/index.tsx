import { PageTitledHeader } from '@/components/PageTitledHeader';
import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
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
import { CheckBox } from '@mui/icons-material';
import { CHARTS, COLLECTION_NAME } from '@/constants/strings';
import {
  CheckboxCheckedIcon,
  CheckboxIcon,
  EditInputIcon,
} from '@/assets/icons';
import { xAxesDataArray } from './ChartEditor.data';
import {
  ChartEditorI,
  chartTypeI,
  xAxisOptionsI,
} from './ChartEditor.interface';

export const ChartEditor = (props: ChartEditorI) => {
  const { metricType, setValue, handleCancel, disableTemplate } = props;

  const {
    handleSave,
    edit,
    setEdit,
    editValue,
    setEditValue,
    singleFieldDropdown,
    chartTitle,
    xAxisData,
    xAxisType,
    chartType,
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
            CHARTS?.BAR_CHART,
            CHARTS?.HORIZONTAL_BAR_CHART,
            CHARTS?.PIE_CHART,
            CHARTS?.DONUT_CHART,
          ]}
          getOptionLabel={(option: chartTypeI) => option}
          required
        />
        {(chartType === CHARTS?.BAR_CHART ||
          chartType === CHARTS?.HORIZONTAL_BAR_CHART) && (
          <Box border={1} borderColor={'grey.700'} borderRadius={2}>
            <Box borderRadius={2} p={1} bgcolor={'primary.light'}>
              <Typography variant="h6">{metricType}</Typography>
            </Box>
            <Box px={1}>
              <RHFAutocomplete
                size="small"
                label="X Axis"
                name="xAxis"
                placeholder="Select Option"
                disabled={disableTemplate}
                options={xAxesDataArray[metricType]}
                getOptionLabel={(option: xAxisOptionsI) => option?.label}
              />
            </Box>
            {xAxisData?.ref && (
              <Box px={2}>
                <RHFAutocompleteAsync
                  size="small"
                  name="xAxisType"
                  label={`${xAxisData?.label} Fields`}
                  multiple={true}
                  apiQuery={singleFieldDropdown}
                  getOptionLabel={(option: any) =>
                    xAxisData?.ref === COLLECTION_NAME?.LOCATION
                      ? option?.locationName
                      : xAxisData?.ref === COLLECTION_NAME?.USERS
                        ? `${option?.firstName} ${option?.lastName}`
                        : option?.name
                  }
                  placeholder="Select Option"
                  externalParams={{
                    meta: false,
                  }}
                />
              </Box>
            )}
            <Box px={1}>
              <RHFTextField
                size="small"
                label="Y Axis"
                name="yAxis"
                disabled={true}
                placeholder="NO_OF_RECORDS"
              />
            </Box>
          </Box>
        )}
        {(chartType === CHARTS?.PIE_CHART ||
          chartType === CHARTS?.DONUT_CHART) && (
          <>
            <Box px={1}>
              <RHFAutocomplete
                size="small"
                label="Add Metric"
                name="xAxis"
                placeholder="Select Option"
                disabled={disableTemplate}
                options={xAxesDataArray[metricType]}
                getOptionLabel={(option: xAxisOptionsI) => option?.label}
              />
            </Box>
            {xAxisData?.ref && (
              <Box px={2}>
                <RHFAutocompleteAsync
                  size="small"
                  name="xAxisType"
                  label={`${xAxisData?.label} Fields`}
                  multiple={true}
                  apiQuery={singleFieldDropdown}
                  getOptionLabel={(option: any) =>
                    xAxisData?.ref === COLLECTION_NAME?.LOCATION
                      ? option?.locationName
                      : xAxisData?.ref === COLLECTION_NAME?.USERS
                        ? `${option?.firstName} ${option?.lastName}`
                        : option?.name
                  }
                  placeholder="Select Option"
                  externalParams={{
                    meta: false,
                  }}
                />
              </Box>
            )}
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
        sx={{ mt: 15, display: 'flex', justifyContent: 'flex-end', gap: 1 }}
      >
        <Button variant="outlined" onClick={handleCancel} color="secondary">
          Cancel
        </Button>
        <Button
          variant="contained"
          disabled={
            !xAxisData || (xAxisData?.ref && !xAxisType?.length) || !chartTitle
          }
          onClick={() => handleSave()}
        >
          Save
        </Button>
      </Toolbar>
    </>
  );
};
