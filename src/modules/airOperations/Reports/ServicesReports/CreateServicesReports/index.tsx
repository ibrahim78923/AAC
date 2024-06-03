import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_OPERATIONS } from '@/constants';
import { Box, Grid } from '@mui/material';
import DraggableFields from './DraggableFields';
import { fieldsList } from './CreateServicesReports.data';
import { DragDropContext } from 'react-beautiful-dnd';
import DroppableArea from './DroppableArea';
import useCreateServicesReports from './useCreateServicesReports';
import { FormProvider } from 'react-hook-form';

export const CreateServicesReports = () => {
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
    setHtmlContent,
    htmlContent,
    textTitle,
    setFieldData,
    setModal,
    handleTextCancel,
    setChartComponent,
    chartComponent,
    setFinalChartComponent,
    finalChartComponent,
    handleChartCancel,
    tableTitle,
    setValue,
    setOpenDrawer,
    openDrawer,
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
              p={2}
            >
              <DroppableArea
                fieldData={fieldData}
                modal={modal}
                editorState={editorState}
                setEditorState={setEditorState}
                fontSize={fontSize}
                color={color}
                htmlContent={htmlContent}
                textTitle={textTitle}
                setChartComponent={setChartComponent}
                finalChartComponent={finalChartComponent}
                tableTitle={tableTitle}
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
            <Box borderRadius={2} bgcolor={'common.white'} p={2}>
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
                setHtmlContent={setHtmlContent}
                setModal={setModal}
                setFieldData={setFieldData}
                handleTextCancel={handleTextCancel}
                textTitle={textTitle}
                setFinalChartComponent={setFinalChartComponent}
                chartComponent={chartComponent}
                handleChartCancel={handleChartCancel}
                tableTitle={tableTitle}
                setValue={setValue}
                setOpenDrawer={setOpenDrawer}
                openDrawer={openDrawer}
              />
            </Box>
          </Grid>
        </Grid>
      </DragDropContext>
    </FormProvider>
  );
};
