import { Box, Button, Divider, Typography, useTheme } from '@mui/material';
import { StrictModeDroppable as Droppable } from '@/components/DynamicFormModals/StrictModeDroppable';
import { Draggable } from 'react-beautiful-dnd';
import { DragAndDropIcon } from '@/assets/icons';
import { ChartEditor } from '../DraggableFormFields/ChartEditor';
import { TableEditor } from '../DraggableFormFields/TableEditor';
import { TextEditor } from '../DraggableFormFields/TextEditor';
import { ServicesReportsDrawer } from '../ServicesReportsDrawer';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { servicesMetrics } from '../CreateServicesReports.data';

export default function DraggableFields({
  fieldsList,
  fieldData,
  modal,
  handleCancel,
  setEditorState,
  editorState,
  fontSize,
  setFontSize,
  color,
  setColor,
  setModal,
  setFieldData,
  textTitle,
  tableTitle,
  setValue,
  AddProperties,
  setCloumnsData,
  setOpenDrawer,
  openDrawer,
  chartType,
  setMetricType,
  metricType,
  chartTitle,
  form,
  setForm,
  setChartMetricType,
  chartMetricType,
  allChartComponents,
  xAxesData,
  yAxesData,
  subFilter,
}: any) {
  const theme: any = useTheme();

  return (
    <Droppable droppableId={'draggable'}>
      {(provided: any) => (
        <Box
          borderRadius={2}
          ref={provided?.innerRef}
          {...provided?.droppableProps}
        >
          {!!!fieldData ? (
            <>
              <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}
                mb={2}
              >
                <Typography variant={'h5'} mb={2}>
                  Form Scratch
                </Typography>
                <SingleDropdownButton
                  dropdownOptions={servicesMetrics(setMetricType)}
                  dropdownName={metricType}
                />
              </Box>
              {fieldsList?.map((item: any, index: number) => (
                <Draggable key={item?.id} draggableId={item?.id} index={index}>
                  {(provided) => (
                    <Box
                      boxShadow={`0px 0px 1.5px 1.5px ${theme?.palette?.grey?.[700]}`}
                      bgcolor={'common.white'}
                      borderRadius={2}
                      mb={index === fieldsList?.length - 1 ? 0 : 2}
                      p={2}
                      display={'flex'}
                      alignItems={'center'}
                      ref={provided?.innerRef}
                      {...provided?.draggableProps}
                      {...provided?.dragHandleProps}
                      sx={{
                        '&:hover': {
                          boxShadow: 5,
                        },
                        cursor: 'pointer',
                      }}
                    >
                      <DragAndDropIcon />
                      <Divider
                        orientation="vertical"
                        flexItem
                        sx={{
                          margin: '0 1rem',
                          border: `.1rem solid ${theme?.palette?.grey[700]}`,
                          backgroundColor: 'transparent',
                        }}
                      />
                      <Box>
                        <Typography variant={'body1'} color={'custom.main'}>
                          {item?.title}
                        </Typography>
                        <Typography variant={'body2'} color={'grey.0'}>
                          {item?.description}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </Draggable>
              ))}
              <Box position={'fixed'} bottom={75} right={90}>
                <Button variant="contained" onClick={() => setOpenDrawer(true)}>
                  Save
                </Button>
              </Box>
            </>
          ) : (
            <>
              {modal?.chart && (
                <ChartEditor
                  setModal={setModal}
                  setFieldData={setFieldData}
                  chartType={chartType}
                  metricType={metricType}
                  setValue={setValue}
                  chartTitle={chartTitle}
                  form={form}
                  setForm={setForm}
                  setChartMetricType={setChartMetricType}
                  chartMetricType={chartMetricType}
                  allChartComponents={allChartComponents}
                  xAxesData={xAxesData}
                  yAxesData={yAxesData}
                  subFilter={subFilter}
                />
              )}

              {modal?.text && (
                <TextEditor
                  setEditorState={setEditorState}
                  editorState={editorState}
                  fontSize={fontSize}
                  color={color}
                  setFontSize={setFontSize}
                  setColor={setColor}
                  setModal={setModal}
                  setFieldData={setFieldData}
                  textTitle={textTitle}
                  form={form}
                  setForm={setForm}
                  setValue={setValue}
                />
              )}
              {modal?.table && (
                <TableEditor
                  handleCancel={handleCancel}
                  setValue={setValue}
                  tableTitle={tableTitle}
                  AddProperties={AddProperties}
                  setCloumnsData={setCloumnsData}
                />
              )}
            </>
          )}
          {openDrawer && (
            <ServicesReportsDrawer open={openDrawer} setOpen={setOpenDrawer} />
          )}
        </Box>
      )}
    </Droppable>
  );
}
