import { Grid } from '@mui/material';
import DraggableFields from './DraggableFields';
import { fieldsList } from './UpsertServicesReports.data';
import { DragDropContext } from 'react-beautiful-dnd';
import DroppableArea from './DroppableArea';
import useUpsertServicesReports from './useUpsertServicesReports';
import { FormProvider } from 'react-hook-form';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_OPERATIONS } from '@/constants';

export const UpsertServicesReports = () => {
  const {
    handleDragEnd,
    modal,
    theme,
    fieldData,
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
    showTemplate,
    setShowTemplate,
    handleTemplateDragEnd,
    router,
  } = useUpsertServicesReports();

  return (
    <FormProvider {...methods}>
      <DragDropContext
        onDragEnd={showTemplate ? handleTemplateDragEnd : handleDragEnd}
      >
        <Grid container>
          <Grid
            item
            sm={12}
            lg={8}
            p={2}
            borderRadius={3}
            boxShadow={`0rem 0rem .1rem .1rem ${theme?.palette?.grey[400]}`}
          >
            <PageTitledHeader
              title={'Create Service Report'}
              canMovedBack
              moveBack={() => {
                router?.push({
                  pathname: AIR_OPERATIONS?.SERVICES_REPORTS,
                });
              }}
            />
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
              setShowTemplate={setShowTemplate}
              showTemplate={showTemplate}
            />
          </Grid>
          <Grid
            item
            sm={12}
            lg={4}
            p={2}
            borderRadius={3}
            boxShadow={`0rem 0rem .1rem .1rem ${theme?.palette?.grey[400]}`}
          >
            <DraggableFields
              fieldsList={fieldsList}
              fieldData={fieldData}
              modal={modal}
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
              columnsData={columnsData}
              showTemplate={showTemplate}
            />
          </Grid>
        </Grid>
      </DragDropContext>
    </FormProvider>
  );
};
