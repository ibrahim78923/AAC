import {
  Box,
  Button,
  Divider,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import { StrictModeDroppable as Droppable } from '@/components/DynamicFormModals/StrictModeDroppable';
import { Draggable } from 'react-beautiful-dnd';
import { ChartEditor } from '../DraggableFormFields/ChartEditor';
import { TableEditor } from '../DraggableFormFields/TableEditor';
import { TextEditor } from '../DraggableFormFields/TextEditor';
import { SaveReportDrawer } from '../SaveReportDrawer';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { servicesMetrics, templateList } from '../UpsertSalesReports.data';
import AppsIcon from '@mui/icons-material/Apps';
import { REPORT_TYPE } from '@/constants/strings';

export default function DraggableFields({
  setModal,
  setFieldData,
  form,
  setForm,
  chartType,
  metricType,
  setValue,
  chartTitle,
  setChartMetricType,
  chartMetricType,
  allChartComponents,
  xAxisData,
  yAxisData,
  subFilter,
  setEditorState,
  fieldsList,
  fieldData,
  modal,
  editorState,
  fontSize,
  setFontSize,
  color,
  setColor,
  textTitle,
  tableTitle,
  AddProperties,
  setAddProperties,
  setColumnsData,
  setOpenDrawer,
  openDrawer,
  setMetricType,
  columnsData,
  showTemplate,
  handleCancel,
  reportId,
  setDraggedItemData,
}: any) {
  const theme: any = useTheme();

  return (
    <Droppable droppableId={'draggable'}>
      {(provided: any) => (
        <Box ref={provided?.innerRef} {...provided?.droppableProps}>
          {!!!fieldData || modal?.counter ? (
            <>
              <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}
                mb={2}
              >
                <Typography variant={'h5'} mb={2}>
                  {showTemplate ? 'Form Template' : ' Form Scratch'}
                </Typography>
                <SingleDropdownButton
                  dropdownOptions={servicesMetrics(setMetricType)}
                  dropdownName={metricType}
                />
              </Box>
              <Box height={'60vh'} overflow={'scroll'} p={1}>
                {showTemplate ? (
                  <>
                    {templateList?.map(
                      (item: any, index: number) =>
                        (item?.templateType === metricType ||
                          item?.templateType === REPORT_TYPE?.ALL) && (
                          <Draggable
                            key={item?.id}
                            draggableId={item?.id}
                            index={index}
                          >
                            {(provided: any) => (
                              <Box
                                boxShadow={`0px 0px 1.5px 1.5px ${theme?.palette?.grey?.[700]}`}
                                bgcolor={'common.white'}
                                borderRadius={2}
                                mb={index === templateList?.length - 1 ? 0 : 2}
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
                                <AppsIcon
                                  sx={{
                                    fontSize: '2.7rem',
                                    color: 'custom.main',
                                    '&:hover': {
                                      color: 'primary.main',
                                    },
                                  }}
                                />
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
                                  <Typography
                                    variant={'body1'}
                                    color={'custom.main'}
                                  >
                                    {item?.title}
                                  </Typography>
                                  <Typography
                                    variant={'body2'}
                                    color={'grey.0'}
                                  >
                                    {item?.description}
                                  </Typography>
                                </Box>
                              </Box>
                            )}
                          </Draggable>
                        ),
                    )}
                  </>
                ) : (
                  <>
                    {fieldsList?.map((item: any, index: number) => (
                      <Draggable
                        key={item?.id}
                        draggableId={item?.id}
                        index={index}
                      >
                        {(provided: any) => (
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
                            <AppsIcon
                              sx={{
                                fontSize: '2.7rem',
                                color: 'custom.main',
                                '&:hover': {
                                  color: 'primary.main',
                                },
                              }}
                            />
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
                              <Typography
                                variant={'body1'}
                                color={'custom.main'}
                              >
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
                  </>
                )}
              </Box>
              {!modal?.counter && form?.length > 0 && (
                <Toolbar
                  sx={{ mt: 6, display: 'flex', justifyContent: 'flex-end' }}
                >
                  <Button
                    variant="contained"
                    onClick={() => setOpenDrawer(true)}
                  >
                    Save
                  </Button>
                </Toolbar>
              )}
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
                  xAxisData={xAxisData}
                  yAxisData={yAxisData}
                  subFilter={subFilter}
                  handleCancel={handleCancel}
                  setDraggedItemData={setDraggedItemData}
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
                  handleCancel={handleCancel}
                  setDraggedItemData={setDraggedItemData}
                />
              )}
              {modal?.table && (
                <TableEditor
                  setValue={setValue}
                  tableTitle={tableTitle}
                  AddProperties={AddProperties}
                  setColumnsData={setColumnsData}
                  setAddProperties={setAddProperties}
                  setModal={setModal}
                  form={form}
                  setForm={setForm}
                  setFieldData={setFieldData}
                  columnsData={columnsData}
                  handleCancel={handleCancel}
                  setDraggedItemData={setDraggedItemData}
                />
              )}
            </>
          )}
          {openDrawer && (
            <SaveReportDrawer
              open={openDrawer}
              setOpen={setOpenDrawer}
              form={form}
              reportId={reportId}
              setForm={setForm}
            />
          )}
        </Box>
      )}
    </Droppable>
  );
}
