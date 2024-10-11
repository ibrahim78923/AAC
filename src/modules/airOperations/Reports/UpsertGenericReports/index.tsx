import { Button, Grid } from '@mui/material';
import { fieldsList, mainMetrics } from './UpsertGenericReports.data';
import { DragDropContext } from 'react-beautiful-dnd';
import useUpsertGenericReports from './useUpsertGenericReports';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { REPORTS_HEADER_TITLE } from '@/constants';
import { FormProvider } from '@/components/ReactHookForm';
import DroppableArea from './DroppableArea';
import DraggableFields from './DraggableFields';
import { setShowTemplate } from '@/redux/slices/genericReport/genericReportSlice';

export const UpsertGenericReports = () => {
  const {
    handleDragEnd,
    modal,
    theme,
    methods,
    setModal,
    setValue,
    form,
    setForm,
    allChartComponents,
    showTemplate,
    handleTemplateDragEnd,
    handleCancel,
    reportId,
    setDraggedItemData,
    draggedItemData,
    handleChooseTemplate,
    moduleName,
    isLoading,
    isFetching,
    data,
    handleMoveBack,
    watch,
    isError,
    refetch,
    dispatch,
    reset,
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
            p={1}
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
                  className="small"
                  onClick={
                    showTemplate
                      ? () => handleChooseTemplate()
                      : () => dispatch(setShowTemplate(true))
                  }
                >
                  {showTemplate
                    ? REPORTS_HEADER_TITLE?.CREATE_REPORT
                    : REPORTS_HEADER_TITLE?.CHOOSE_TEMPLATE}
                </Button>
              )}
            </PageTitledHeader>
            <DroppableArea
              modal={modal}
              form={form}
              setForm={setForm}
              allChartComponents={allChartComponents}
              draggedItemData={draggedItemData}
              setModal={setModal}
              setDraggedItemData={setDraggedItemData}
              handleCancel={handleCancel}
              handleChooseTemplate={handleChooseTemplate}
              isLoading={isLoading}
              isFetching={isFetching}
              isError={isError}
              watch={watch}
              refetch={refetch}
            />
          </Grid>
          <Grid
            item
            xs={12}
            lg={4}
            mt={{ xs: 1, lg: 0 }}
            p={1}
            borderRadius={3}
            boxShadow={`0rem 0rem .2rem .2rem ${theme?.palette?.grey[400]}`}
          >
            <DraggableFields
              fieldsList={fieldsList}
              modal={modal}
              setModal={setModal}
              setValue={setValue}
              form={form}
              setForm={setForm}
              handleCancel={handleCancel}
              reportId={reportId}
              setDraggedItemData={setDraggedItemData}
              draggedItemData={draggedItemData}
              mainMetrics={mainMetrics}
              selectedModule={moduleName}
              data={data}
              handleMoveBack={handleMoveBack}
              watch={watch}
              isLoading={isLoading}
              isFetching={isFetching}
              isError={isError}
              refetch={refetch}
              methods={methods}
              reset={reset}
            />
          </Grid>
        </Grid>
      </DragDropContext>
    </FormProvider>
  );
};
