import { PageTitledHeader } from '@/components/PageTitledHeader';
import { RHFCheckbox, RHFTextField } from '@/components/ReactHookForm';
import { Box, Button, Container, Toolbar, Typography } from '@mui/material';
import { useChartEditor } from './useChartEditor';
import { CHARTS } from '@/constants/strings';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { xAxesDataArray } from './ChartEditor.data';
import { ChartEditorI } from './ChartEditor.interface';
import { ChartListDropdown } from './ChartFormFields/ChartListDropdown';
import { XAxesListDropdown } from './ChartFormFields/XAxesListDropdown';
import { XAxesFieldsListDropdown } from './ChartFormFields/XAxesFieldsListDropdown';

export const ChartEditor = (props: ChartEditorI) => {
  const { metricType, handleCancel, handleSubmit } = props;

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
          <ChartListDropdown disableTemplate={disableTemplate} />
          {(chartType === CHARTS?.BAR_CHART ||
            chartType === CHARTS?.HORIZONTAL_BAR_CHART) && (
            <Box border={1} borderColor={'grey.700'} borderRadius={2}>
              <Box borderRadius={2} p={1} bgcolor={'primary.light'}>
                <Typography variant="h6">{metricType}</Typography>
              </Box>
              <Box px={1}>
                <XAxesListDropdown
                  disableTemplate={disableTemplate}
                  xAxesDataArray={xAxesDataArray}
                  metricType={metricType}
                  label="X Axes"
                />
              </Box>
              {xAxisData?.ref && (
                <Box px={2}>
                  <XAxesFieldsListDropdown
                    xAxisData={xAxisData}
                    productId={productId}
                    singleFieldDropdown={singleFieldDropdown}
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
                <XAxesListDropdown
                  disableTemplate={disableTemplate}
                  xAxesDataArray={xAxesDataArray}
                  metricType={metricType}
                  label="Add Metric"
                />
              </Box>
              {xAxisData?.ref && (
                <Box px={2}>
                  <XAxesFieldsListDropdown
                    xAxisData={xAxisData}
                    productId={productId}
                    singleFieldDropdown={singleFieldDropdown}
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
            onClick={handleSubmit(handleSave)}
          >
            Save
          </Button>
        </Toolbar>
      </Box>
    </Box>
  );
};
