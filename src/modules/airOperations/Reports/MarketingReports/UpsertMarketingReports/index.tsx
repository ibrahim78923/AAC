import { Button, Grid } from '@mui/material';
import DraggableFields from './DraggableFields';
import { DragDropContext } from 'react-beautiful-dnd';
import DroppableArea from './DroppableArea';
import { FormProvider } from 'react-hook-form';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_OPERATIONS, REPORTS_HEADER_TITLE } from '@/constants';
import useUpsertServicesReports from '../../ServicesReports/UpsertServicesReports/useUpsertServicesReports';
import { fieldsList } from './UpsertMArketingReports.data';

export const UpsertMarketingReports = () => {
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
    handleCancel,
    reportId,
    setDraggedItemData,
    draggedItemData,
  } = useUpsertServicesReports();
  const { text, table, chart, counter } = modal || {};
  return (
    <FormProvider {...methods}>
      <DragDropContext
        onDragEnd={showTemplate ? handleTemplateDragEnd : handleDragEnd}
      >
        <Grid container display={'flex'} justifyContent={'space-between'}>
          <Grid
            item
            sm={12}
            lg={7.9}
            p={2}
            borderRadius={3}
            boxShadow={`0rem 0rem .2rem .2rem ${theme?.palette?.grey[400]}`}
          >
            <PageTitledHeader
              title={
                text
                  ? REPORTS_HEADER_TITLE?.CREATE_TEXT
                  : table
                    ? REPORTS_HEADER_TITLE?.CREATE_TABLE
                    : chart
                      ? REPORTS_HEADER_TITLE?.CREATE_CHART
                      : counter
                        ? REPORTS_HEADER_TITLE?.CREATE_COUNTER
                        : REPORTS_HEADER_TITLE?.CREATE_REPORT
              }
              canMovedBack
              moveBack={
                text || table || chart || counter
                  ? handleCancel
                  : () => {
                      router?.push({
                        pathname: AIR_OPERATIONS?.MARKETING_REPORTS,
                      });
                    }
              }
            >
              {!!form?.length && !text && !table && !chart && !counter && (
                <Button
                  variant="contained"
                  onClick={
                    showTemplate
                      ? () => setShowTemplate(false)
                      : () => setShowTemplate(true)
                  }
                >
                  {showTemplate ? 'Create Report' : 'Choose Template'}
                </Button>
              )}
            </PageTitledHeader>
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
              draggedItemData={draggedItemData}
              setModal={setModal}
              setFieldData={setFieldData}
              setDraggedItemData={setDraggedItemData}
              handleCancel={handleCancel}
            />
          </Grid>
          <Grid
            item
            sm={12}
            lg={4}
            mt={{ sm: 1, lg: 0 }}
            p={2}
            borderRadius={3}
            boxShadow={`0rem 0rem .2rem .2rem ${theme?.palette?.grey[400]}`}
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
              handleCancel={handleCancel}
              reportId={reportId}
              setDraggedItemData={setDraggedItemData}
            />
          </Grid>
        </Grid>
      </DragDropContext>
    </FormProvider>
  );
};
