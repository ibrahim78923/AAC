import { Box, Button, Divider, Toolbar, Typography } from '@mui/material';
import { StrictModeDroppable as Droppable } from '@/components/DynamicFormModals/StrictModeDroppable';
import { Draggable } from 'react-beautiful-dnd';
import { ChartEditor } from '../DraggableFormFields/ChartEditor';
import { TableEditor } from '../DraggableFormFields/TableEditor';
import { TextEditor } from '../DraggableFormFields/TextEditor';
import { SaveReportDrawer } from '../SaveReportDrawer';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import AppsIcon from '@mui/icons-material/Apps';
import { DraggableFieldsI } from './DraggableFields.interface';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';
import { useDraggableFields } from './useDraggableFields';
import { templateList } from '../UpsertGenericReports.data';

export default function DraggableFields(props: DraggableFieldsI) {
  const {
    setModal,
    form,
    setForm,
    setValue,
    fieldsList,
    modal,
    handleCancel,
    reportId,
    setDraggedItemData,
    draggedItemData,
    mainMetrics,
    selectedModule,
    data,
    handleMoveBack,
    watch,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = props;

  const {
    theme,
    metricType,
    setMetricType,
    fieldData,
    openDrawer,
    setOpenDrawer,
    showTemplate,
  } = useDraggableFields(props);

  return (
    <Droppable droppableId={'draggable'}>
      {(provided: any) => (
        <Box ref={provided?.innerRef} {...provided?.droppableProps}>
          {!!!fieldData || modal?.counter ? (
            <>
              {isLoading || isFetching || isError ? (
                isError ? (
                  <ApiErrorState canRefresh refresh={() => refetch?.()} />
                ) : (
                  <SkeletonTable />
                )
              ) : (
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
                      dropdownName={metricType}
                      dropdownOptions={
                        mainMetrics(setMetricType)[selectedModule]
                      }
                      disabled={!!form?.length}
                    />
                  </Box>
                  <Box height={'60vh'} overflow={'scroll'} p={1}>
                    {showTemplate ? (
                      <>
                        {templateList?.map(
                          (item: any, index: number) =>
                            item?.templateType === metricType && (
                              <Draggable
                                key={item?.id}
                                draggableId={item?.id}
                                index={index}
                              >
                                {(provided: any) => (
                                  <Box
                                    key={item?.id}
                                    boxShadow={`0px 0px 1.5px 1.5px ${theme?.palette?.grey?.[700]}`}
                                    bgcolor={'common.white'}
                                    borderRadius={2}
                                    mb={
                                      index === templateList?.length - 1 ? 0 : 2
                                    }
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
                                key={item?.id}
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
                        ))}
                      </>
                    )}
                  </Box>
                  {!modal?.counter && form?.length > 0 && (
                    <Toolbar
                      sx={{
                        mt: 4,
                        display: 'flex',
                        justifyContent: 'flex-end',
                      }}
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
              )}
            </>
          ) : (
            <>
              {modal?.chart && (
                <ChartEditor
                  setModal={setModal}
                  metricType={metricType}
                  setValue={setValue}
                  form={form}
                  setForm={setForm}
                  handleCancel={handleCancel}
                  setDraggedItemData={setDraggedItemData}
                  draggedItemData={draggedItemData}
                  watch={watch}
                />
              )}

              {modal?.text && (
                <TextEditor
                  setModal={setModal}
                  form={form}
                  setForm={setForm}
                  handleCancel={handleCancel}
                  setDraggedItemData={setDraggedItemData}
                  setValue={setValue}
                  watch={watch}
                />
              )}
              {modal?.table && (
                <TableEditor
                  setValue={setValue}
                  setModal={setModal}
                  form={form}
                  setForm={setForm}
                  handleCancel={handleCancel}
                  setDraggedItemData={setDraggedItemData}
                  metricType={metricType}
                  draggedItemData={draggedItemData}
                  watch={watch}
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
              metricType={metricType}
              data={data}
              handleMoveBack={handleMoveBack}
            />
          )}
        </Box>
      )}
    </Droppable>
  );
}
