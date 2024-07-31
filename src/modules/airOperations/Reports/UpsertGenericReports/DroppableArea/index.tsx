import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { StrictModeDroppable as Droppable } from '@/components/DynamicFormModals/StrictModeDroppable';
import { ReportsIcon } from '@/assets/icons';
import { Chart } from '../DraggableFormFields/Chart';
import { Text } from '../DraggableFormFields/Text';
import { Table } from '../DraggableFormFields/Table';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDroppableArea } from './useDroppableArea';
import { REPORT_TYPE } from '@/constants/strings';
import ReportCalendarFilter from '@/components/ReportCalendarFilter';
import TanstackTable from '@/components/Table/TanstackTable';
import { tableColumn } from '../DraggableFormFields/Table/Table.data';
import { Counter } from '../DraggableFormFields/Counter';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';

export default function DroppableArea(props: any) {
  const {
    fieldData,
    modal,
    editorState,
    setEditorState,
    fontSize,
    color,
    form,
    setAddProperties,
    columnsData,
    allChartComponents,
    setShowTemplate,
    showTemplate,
    draggedItemData,
    setModal,
    setFieldData,
    setForm,
    setDraggedItemData,
    handleCancel,
    handleChooseTemplate,
    setValue,
    isLoading,
    isFetching,
    watch,
  } = props;

  const { handleDelete, handleCopy, theme, setCalendarFilter } =
    useDroppableArea(props);
  return (
    <Droppable droppableId={'droppable'}>
      {(provided: any) => (
        <Box
          height={'72vh'}
          overflow={'scroll'}
          ref={provided?.innerRef}
          {...provided?.droppableProps}
        >
          {isLoading || isFetching ? (
            <SkeletonTable />
          ) : (
            <>
              {!!!fieldData ? (
                <>
                  {!!!form?.length ? (
                    <>
                      <Box
                        display={'flex'}
                        flexDirection={'column'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        height={'100%'}
                      >
                        <ReportsIcon />
                        <Typography variant={'h6'} mt={1} component={'span'}>
                          <span style={{ color: theme.palette.primary.main }}>
                            {' '}
                            Drag{' '}
                          </span>
                          or
                          <span style={{ color: theme.palette.primary.main }}>
                            {' '}
                            Drop{' '}
                          </span>
                          widgets here to create your report!
                        </Typography>
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          m={2}
                          width={'50%'}
                        >
                          <Divider
                            sx={{
                              flexGrow: 1,
                              border: `.1rem solid ${theme?.palette?.grey[400]}`,
                            }}
                          />
                          <Typography variant="h4" sx={{ mx: 2 }}>
                            or
                          </Typography>
                          <Divider
                            sx={{
                              flexGrow: 1,
                              border: `.1rem solid ${theme?.palette?.grey[400]}`,
                            }}
                          />
                        </Box>
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
                      </Box>
                    </>
                  ) : (
                    <>
                      {!!form?.length && (
                        <>
                          <Grid container spacing={1} mb={1}>
                            {form?.map((item: any) => (
                              <>
                                {item?.reportType === REPORT_TYPE?.CHART && (
                                  <Grid item sm={12} lg={6} key={item?.id}>
                                    <Box
                                      borderRadius={2}
                                      border={`1px solid ${theme?.palette?.grey[700]}`}
                                    >
                                      <Box
                                        display={'flex'}
                                        justifyContent={'space-between'}
                                        alignItems={'center'}
                                        p={1}
                                      >
                                        <Typography
                                          color="secondary"
                                          variant="h5"
                                          overflow={'scroll'}
                                          width={'55%'}
                                        >
                                          {item?.title}
                                        </Typography>
                                        <Box
                                          display={'flex'}
                                          justifyContent={'center'}
                                          alignItems={'center'}
                                        >
                                          <IconButton
                                            onClick={() =>
                                              handleDelete(item?.id)
                                            }
                                          >
                                            <DeleteIcon />
                                          </IconButton>
                                          <IconButton
                                            onClick={() => handleCopy(item?.id)}
                                          >
                                            <ContentCopyIcon />
                                          </IconButton>
                                          <Box ml={1}>
                                            {item?.subFilter && (
                                              <ReportCalendarFilter
                                                setCalendarFilter={
                                                  setCalendarFilter
                                                }
                                              />
                                            )}
                                          </Box>
                                        </Box>
                                      </Box>
                                      {allChartComponents[item?.type]}
                                    </Box>
                                  </Grid>
                                )}
                              </>
                            ))}
                          </Grid>
                          <Grid container spacing={1} mb={1}>
                            {form?.map((item: any) => (
                              <>
                                {item?.type === REPORT_TYPE?.TEXT && (
                                  <Grid item xs={12} sm={6} key={item?.id}>
                                    <Box
                                      borderRadius={2}
                                      border={`1px solid ${theme?.palette?.grey[700]}`}
                                      p={1}
                                      pl={2.5}
                                    >
                                      <Box
                                        display={'flex'}
                                        justifyContent={'space-between'}
                                        alignItems={'center'}
                                      >
                                        <Typography
                                          color="secondary"
                                          variant="h5"
                                          overflow={'scroll'}
                                          width={'70%'}
                                        >
                                          {item?.title}
                                        </Typography>
                                        <Box
                                          display={'flex'}
                                          justifyContent={'center'}
                                          alignItems={'center'}
                                        >
                                          <IconButton
                                            onClick={() =>
                                              handleDelete(item?.id)
                                            }
                                          >
                                            <DeleteIcon />
                                          </IconButton>
                                          <IconButton
                                            onClick={() => handleCopy(item?.id)}
                                          >
                                            <ContentCopyIcon />
                                          </IconButton>
                                        </Box>
                                      </Box>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: item?.component,
                                        }}
                                      />
                                    </Box>
                                  </Grid>
                                )}
                              </>
                            ))}
                          </Grid>
                          <Grid container spacing={1} mb={1}>
                            {form?.map((item: any) => (
                              <>
                                {item?.type === REPORT_TYPE?.TABLE && (
                                  <Grid item xs={12} sm={6} key={item?.id}>
                                    <Box
                                      borderRadius={2}
                                      border={`1px solid ${theme?.palette?.grey[700]}`}
                                      p={1}
                                    >
                                      <Box
                                        display={'flex'}
                                        justifyContent={'space-between'}
                                        alignItems={'center'}
                                      >
                                        <Typography
                                          color="secondary"
                                          variant="h5"
                                          overflow={'scroll'}
                                          width={'80%'}
                                        >
                                          {item?.title}
                                        </Typography>
                                        <Box
                                          display={'flex'}
                                          justifyContent={'center'}
                                          alignItems={'center'}
                                        >
                                          <IconButton
                                            onClick={() =>
                                              handleDelete(item?.id)
                                            }
                                          >
                                            <DeleteIcon />
                                          </IconButton>
                                          <IconButton
                                            onClick={() => handleCopy(item?.id)}
                                          >
                                            <ContentCopyIcon />
                                          </IconButton>
                                        </Box>
                                      </Box>
                                      <TanstackTable
                                        columns={tableColumn(item?.component)}
                                        data={[]}
                                      />
                                    </Box>
                                  </Grid>
                                )}
                              </>
                            ))}
                          </Grid>

                          <Grid container spacing={1} mb={1}>
                            {form?.map((item: any) => (
                              <>
                                {item?.reportType === REPORT_TYPE?.COUNTER && (
                                  <Grid item xs={12} sm={6} key={item?.id}>
                                    <Box
                                      borderRadius={2}
                                      border={`1px solid ${theme?.palette?.grey[700]}`}
                                      p={1}
                                    >
                                      <Box
                                        display={'flex'}
                                        justifyContent={'space-between'}
                                        alignItems={'center'}
                                      >
                                        <Typography
                                          color="secondary"
                                          variant="h5"
                                          overflow={'scroll'}
                                          width={'80%'}
                                        >
                                          {item?.title}
                                        </Typography>
                                        <Box
                                          display={'flex'}
                                          justifyContent={'center'}
                                          alignItems={'center'}
                                        >
                                          <IconButton
                                            onClick={() =>
                                              handleDelete(item?.id)
                                            }
                                          >
                                            <DeleteIcon />
                                          </IconButton>
                                          <IconButton
                                            onClick={() => handleCopy(item?.id)}
                                          >
                                            <ContentCopyIcon />
                                          </IconButton>
                                        </Box>
                                      </Box>
                                      <Typography
                                        display={'flex'}
                                        justifyContent={'center'}
                                        alignItems={'center'}
                                        variant="h1"
                                        color={'primary'}
                                        p={10}
                                      >
                                        {item?.ticketCount}
                                      </Typography>
                                    </Box>
                                  </Grid>
                                )}
                              </>
                            ))}
                          </Grid>
                        </>
                      )}
                    </>
                  )}
                </>
              ) : (
                <>
                  {modal?.chart && (
                    <Chart
                      allChartComponents={allChartComponents}
                      setCalendarFilter={setCalendarFilter}
                      watch={watch}
                    />
                  )}
                  {modal?.text && (
                    <Text
                      editorState={editorState}
                      setEditorState={setEditorState}
                      fontSize={fontSize}
                      color={color}
                      setValue={setValue}
                      watch={watch}
                    />
                  )}
                  {modal?.table && (
                    <Table
                      watch={watch}
                      setAddProperties={setAddProperties}
                      columnsData={columnsData}
                    />
                  )}
                  {modal?.counter && (
                    <Counter
                      draggedItemData={draggedItemData}
                      setModal={setModal}
                      setFieldData={setFieldData}
                      setForm={setForm}
                      setDraggedItemData={setDraggedItemData}
                      form={form}
                      handleCancel={handleCancel}
                    />
                  )}
                </>
              )}
            </>
          )}
        </Box>
      )}
    </Droppable>
  );
}
