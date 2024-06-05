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
import { InteractiveFilter } from '../DraggableFormFields/InteractiveFilter';
import { Text } from '../DraggableFormFields/Text';
import { Table } from '../DraggableFormFields/Table';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDroppableArea } from './useDroppableArea';
import { REPORT_TYPE } from '@/constants/strings';

export default function DroppableArea(props: any) {
  const {
    fieldData,
    modal,
    editorState,
    setEditorState,
    fontSize,
    color,
    setChartComponent,
    form,
    tableTitle,
    chartType,
    chartComponent,
    yAxesData,
    xAxesData,
    chartMetricType,
    filterType,
    setAddProperties,
    columnsData,
  } = props;

  const { handleDelete, handleCopy, theme } = useDroppableArea(props);
  return (
    <Droppable droppableId={'droppable'}>
      {(provided: any) => (
        <Box
          bgcolor={'secondary.50'}
          borderRadius={2}
          p={1}
          width={'100%'}
          height={'70vh'}
          overflow={'scroll'}
          ref={provided?.innerRef}
          {...provided?.droppableProps}
        >
          {!!!fieldData ? (
            <>
              {!!!form?.length ? (
                <>
                  <Box
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                  >
                    <ReportsIcon />
                    <Typography variant={'h6'} mt={1} component={'span'}>
                      Drag or Drop Widgets here to create your report!
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
                    <Box>
                      <Button variant="contained">Chose Template</Button>
                    </Box>
                  </Box>
                </>
              ) : (
                <>
                  {form?.length > 0 && (
                    <>
                      <Grid container spacing={1}>
                        {form?.map((item: any) => (
                          <>
                            {item?.type === REPORT_TYPE?.CHART && (
                              <Grid item xs={12} sm={6} key={item?.id}>
                                <Box
                                  borderRadius={2}
                                  border={`1px solid ${theme?.palette?.grey[700]}`}
                                  mb={2}
                                >
                                  <Box
                                    display={'flex'}
                                    justifyContent={'space-between'}
                                    alignItems={'center'}
                                    p={1}
                                  >
                                    <Typography color="secondary" variant="h5">
                                      {item?.title}
                                    </Typography>
                                    <Box
                                      display={'flex'}
                                      justifyContent={'center'}
                                      alignItems={'center'}
                                    >
                                      <IconButton
                                        onClick={() => handleDelete(item?.id)}
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
                                  {item?.component}
                                </Box>
                              </Grid>
                            )}
                          </>
                        ))}
                      </Grid>
                      <Grid container spacing={1}>
                        {form?.map((item: any) => (
                          <>
                            {item?.type === REPORT_TYPE?.TEXT && (
                              <Grid item xs={12} sm={6} key={item?.id}>
                                <Box
                                  borderRadius={2}
                                  border={`1px solid ${theme?.palette?.grey[700]}`}
                                  mb={2}
                                  p={1}
                                  pl={2.5}
                                >
                                  <Box
                                    display={'flex'}
                                    justifyContent={'space-between'}
                                    alignItems={'center'}
                                  >
                                    <Typography color="secondary" variant="h5">
                                      {item?.title}
                                    </Typography>
                                    <Box
                                      display={'flex'}
                                      justifyContent={'center'}
                                      alignItems={'center'}
                                    >
                                      <IconButton
                                        onClick={() => handleDelete(item?.id)}
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
                    </>
                  )}
                </>
              )}
            </>
          ) : (
            <>
              {modal?.chart && (
                <Chart
                  setChartComponent={setChartComponent}
                  chartType={chartType}
                  chartComponent={chartComponent}
                  yAxesData={yAxesData}
                  xAxesData={xAxesData}
                  chartMetricType={chartMetricType}
                />
              )}
              {modal?.interactiveFilter && (
                <InteractiveFilter filterType={filterType} />
              )}
              {modal?.text && (
                <Text
                  editorState={editorState}
                  setEditorState={setEditorState}
                  fontSize={fontSize}
                  color={color}
                />
              )}
              {modal?.table && (
                <Table
                  tableTitle={tableTitle}
                  setAddProperties={setAddProperties}
                  columnsData={columnsData}
                />
              )}
            </>
          )}
        </Box>
      )}
    </Droppable>
  );
}
