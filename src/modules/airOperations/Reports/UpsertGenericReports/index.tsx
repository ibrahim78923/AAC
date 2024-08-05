import { Button, Grid } from '@mui/material';
import {
  fieldsList,
  mainMetrics,
  templateList,
} from './UpsertGenericReports.data';
import { DragDropContext } from 'react-beautiful-dnd';
import useUpsertGenericReports from './useUpsertGenericReports';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { REPORTS_HEADER_TITLE } from '@/constants';
import { FormProvider } from '@/components/ReactHookForm';
import DroppableArea from './DroppableArea';
import DraggableFields from './DraggableFields';

export const UpsertGenericReports = () => {
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
    setFieldData,
    setModal,
    setValue,
    columnsData,
    setColumnsData,
    setOpenDrawer,
    openDrawer,
    setMetricType,
    metricType,
    form,
    setForm,
    allChartComponents,
    showTemplate,
    setShowTemplate,
    handleTemplateDragEnd,
    handleCancel,
    reportId,
    setDraggedItemData,
    draggedItemData,
    disableTemplate,
    handleChooseTemplate,
    moduleName,
    isLoading,
    isFetching,
    data,
    handleMoveBack,
    watch,
  } = useUpsertGenericReports();
  const { text, table, chart, counter } = modal || {};

  return (
    <FormProvider methods={methods}>
      <DragDropContext
        onDragEnd={showTemplate ? handleTemplateDragEnd : handleDragEnd}
      >
        <Grid container display={'flex'} justifyContent={'space-between'}>
          <Grid
            item
            xs={12}
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
                        : reportId
                          ? REPORTS_HEADER_TITLE?.CUSTOMIZE_REPORT
                          : REPORTS_HEADER_TITLE?.CREATE_REPORT
              }
              canMovedBack
              moveBack={
                text || table || chart || counter
                  ? handleCancel
                  : handleMoveBack
              }
            >
              {!!form?.length && !text && !table && !chart && !counter && (
                <Button
                  variant="contained"
                  onClick={
                    showTemplate
                      ? () => handleChooseTemplate()
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
              form={form}
              setForm={setForm}
              columnsData={columnsData}
              allChartComponents={allChartComponents}
              setShowTemplate={setShowTemplate}
              showTemplate={showTemplate}
              draggedItemData={draggedItemData}
              setModal={setModal}
              setFieldData={setFieldData}
              setDraggedItemData={setDraggedItemData}
              handleCancel={handleCancel}
              handleChooseTemplate={handleChooseTemplate}
              setValue={setValue}
              isLoading={isLoading}
              isFetching={isFetching}
              watch={watch}
            />
          </Grid>
          <Grid
            item
            xs={12}
            lg={4}
            mt={{ xs: 1, lg: 0 }}
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
              setValue={setValue}
              setColumnsData={setColumnsData}
              setOpenDrawer={setOpenDrawer}
              openDrawer={openDrawer}
              setMetricType={setMetricType}
              metricType={metricType}
              form={form}
              setForm={setForm}
              columnsData={columnsData}
              showTemplate={showTemplate}
              handleCancel={handleCancel}
              reportId={reportId}
              setDraggedItemData={setDraggedItemData}
              draggedItemData={draggedItemData}
              disableTemplate={disableTemplate}
              templateList={templateList}
              mainMetrics={mainMetrics}
              selectedModule={moduleName}
              data={data}
              handleMoveBack={handleMoveBack}
              watch={watch}
            />
          </Grid>
        </Grid>
      </DragDropContext>
    </FormProvider>
  );
};
