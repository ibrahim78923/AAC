import { Box, Button, Divider, Typography, useTheme } from '@mui/material';
import { StrictModeDroppable as Droppable } from '@/components/DynamicFormModals/StrictModeDroppable';
import { ReportsIcon } from '@/assets/icons';
import { Chart } from '../DraggableFormFields/Chart';
import { InteractiveFilter } from '../DraggableFormFields/InteractiveFilter';
import { Text } from '../DraggableFormFields/Text';
import { Table } from '../DraggableFormFields/Table';

export default function DroppableArea(props: any) {
  const {
    fieldData,
    modal,
    editorState,
    setEditorState,
    fontSize,
    color,
    htmlContent,
    textTitle,
    setChartComponent,
    finalChartComponent,
    tableTitle,
  } = props;
  const theme: any = useTheme();

  return (
    <Droppable droppableId={'droppable'}>
      {(provided: any) => (
        <Box
          bgcolor={'secondary.50'}
          borderRadius={2}
          p={2}
          width={'100%'}
          height={'70vh'}
          overflow={'scroll'}
          ref={provided?.innerRef}
          {...provided?.droppableProps}
        >
          {!!!fieldData ? (
            <>
              {!!!htmlContent && !!!finalChartComponent ? (
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
                  {finalChartComponent && (
                    <Box
                      borderRadius={2}
                      border={`1px solid ${theme?.palette?.grey[700]}`}
                      mb={2}
                    >
                      <Typography variant={'h5'} mb={1} p={1}>
                        {finalChartComponent?.chartName}
                      </Typography>
                      {finalChartComponent?.component}
                    </Box>
                  )}
                  {htmlContent && (
                    <Box
                      borderRadius={2}
                      border={`1px solid ${theme?.palette?.grey[700]}`}
                      p={1}
                      pl={3}
                      width={'100%'}
                      height={'40vh'}
                      overflow={'scroll'}
                      mb={2}
                    >
                      <Typography variant={'h3'} mb={1}>
                        {textTitle}
                      </Typography>
                      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                    </Box>
                  )}
                </>
              )}
            </>
          ) : (
            <>
              {modal?.chart && <Chart setChartComponent={setChartComponent} />}
              {modal?.interactiveFilter && <InteractiveFilter />}
              {modal?.text && (
                <Text
                  editorState={editorState}
                  setEditorState={setEditorState}
                  fontSize={fontSize}
                  color={color}
                />
              )}
              {modal?.table && <Table tableTitle={tableTitle} />}
            </>
          )}
        </Box>
      )}
    </Droppable>
  );
}
