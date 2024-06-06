import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_OPERATIONS } from '@/constants';
import { Box, Grid } from '@mui/material';
import DraggableFields from './DraggableFields';
import { fieldsList } from './UpsertServicesReports.data';
import { DragDropContext } from 'react-beautiful-dnd';
import DroppableArea from './DroppableArea';
import useCreateServicesReports from './useUpsertServicesReports';
import { FormProvider } from 'react-hook-form';

export const UpsertServicesReports = () => {
  const {
    handleDragEnd,
    router,
    modal,
    theme,
    fieldData,
    handleCancel,
    methods,
    setEditorState,
    editorState,
    setColor,
    color,
    setFontSize,
    fontSize,
    textTitle,
    setFieldData,
    setModal,
    tableTitle,
    setValue,
    AddProperties,
    setAddProperties,
    columnsData,
    setColumnsData,
    setOpenDrawer,
    openDrawer,
    chartType,
    setMetricType,
    metricType,
    chartTitle,
    form,
    setForm,
    yAxisData,
    xAxisData,
    setChartMetricType,
    chartMetricType,
    subFilter,
    allChartComponents,
  } = useCreateServicesReports();

  return (
    <FormProvider {...methods}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Grid container gap={2}>
          <Grid
            item
            sm={12}
            lg={7.9}
            p={2}
            borderRadius={3}
            boxShadow={`0px 0px 10px 10px ${theme?.palette?.grey[100]}`}
          >
            <PageTitledHeader
              title={'Create Report'}
              canMovedBack
              moveBack={() => {
                router?.push({
                  pathname: AIR_OPERATIONS?.SERVICES_REPORTS,
                });
              }}
            />
            <Box
              borderRadius={2}
              bgcolor={'common.white'}
              display={'flex'}
              alignItems={'center'}
            >
              <DroppableArea
                fieldData={fieldData}
                modal={modal}
                editorState={editorState}
                setEditorState={setEditorState}
                fontSize={fontSize}
                color={color}
                tableTitle={tableTitle}
                chartType={chartType}
                form={form}
                setForm={setForm}
                setAddProperties={setAddProperties}
                columnsData={columnsData}
                allChartComponents={allChartComponents}
                chartTitle={chartTitle}
                textTitle={textTitle}
                subFilter={subFilter}
              />
            </Box>
          </Grid>
          <Grid
            item
            sm={12}
            lg={3.8}
            p={2}
            borderRadius={3}
            boxShadow={`0px 0px 10px 10px ${theme?.palette?.grey[100]}`}
          >
            <Box borderRadius={2} bgcolor={'common.white'}>
              <DraggableFields
                fieldsList={fieldsList}
                fieldData={fieldData}
                modal={modal}
                handleCancel={handleCancel}
                setEditorState={setEditorState}
                editorState={editorState}
                fontSize={fontSize}
                color={color}
                setFontSize={setFontSize}
                setColor={setColor}
                setModal={setModal}
                setFieldData={setFieldData}
                textTitle={textTitle}
                tableTitle={tableTitle}
                setValue={setValue}
                AddProperties={AddProperties}
                setColumnsData={setColumnsData}
                setOpenDrawer={setOpenDrawer}
                openDrawer={openDrawer}
                chartType={chartType}
                setMetricType={setMetricType}
                metricType={metricType}
                chartTitle={chartTitle}
                form={form}
                setForm={setForm}
                chartMetricType={chartMetricType}
                setChartMetricType={setChartMetricType}
                allChartComponents={allChartComponents}
                xAxisData={xAxisData}
                yAxisData={yAxisData}
                subFilter={subFilter}
              />
            </Box>
          </Grid>
        </Grid>
      </DragDropContext>
    </FormProvider>
  );
};
