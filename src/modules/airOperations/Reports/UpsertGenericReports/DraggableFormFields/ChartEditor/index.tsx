import { PageTitledHeader } from '@/components/PageTitledHeader';
import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFCheckbox,
  RHFTextField,
} from '@/components/ReactHookForm';
import { Box, Button, Container, Toolbar, Typography } from '@mui/material';
import { useChartEditor } from './useChartEditor';
import { CHARTS, COLLECTION_NAME } from '@/constants/strings';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { xAxesDataArray } from './ChartEditor.data';
import {
  ChartEditorI,
  chartTypeI,
  xAxisOptionsI,
} from './ChartEditor.interface';

export const ChartEditor = (props: ChartEditorI) => {
  const { metricType, handleCancel, methods } = props;

  const {
    handleSave,
    singleFieldDropdown,
    xAxisData,
    xAxisType,
    chartType,
    disableTemplate,
    productId,
  } = useChartEditor(props);

  return (
    <Box minHeight="79vh" display="flex" flexDirection="column">
      <PageTitledHeader
        title={'Chart Configuration'}
        canMovedBack
        moveBack={handleCancel}
      />
      <Box flex="1" overflow="scroll">
        <Container>
          <RHFTextField
            name={'chartTitle'}
            size="small"
            label="Title"
            disabled={disableTemplate}
          />
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
            isOptionEqualToValue={(option: any, newValue: any) =>
              option === newValue
            }
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
                  isOptionEqualToValue={(option: any, newValue: any) =>
                    option?.value === newValue?.value
                  }
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
                      ...(xAxisData?.ref != COLLECTION_NAME?.USERS && {
                        meta: false,
                      }),
                      ...(xAxisData?.ref === COLLECTION_NAME?.USERS && {
                        productId: productId,
                      }),
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
                  isOptionEqualToValue={(option: any, newValue: any) =>
                    option?.value === newValue?.value
                  }
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
                      ...(xAxisData?.ref != COLLECTION_NAME?.USERS && {
                        meta: false,
                      }),
                      ...(xAxisData?.ref === COLLECTION_NAME?.USERS && {
                        productId: productId,
                      }),
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
        </Container>
      </Box>
      <Box position="static">
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 1,
          }}
        >
          <Button
            variant="outlined"
            className="small"
            onClick={handleCancel}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            className="small"
            disabled={!xAxisData || (xAxisData?.ref && !xAxisType?.length)}
            onClick={methods?.handleSubmit(handleSave)}
          >
            Save
          </Button>
        </Toolbar>
      </Box>
    </Box>
  );
};
