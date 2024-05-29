import { Box, Button, Divider, Typography, useTheme } from '@mui/material';
import { DroppableModule as Droppable } from '../../DroppableModule';
import { Draggable } from 'react-beautiful-dnd';
import { DragAndDropIcon } from '@/assets/icons';
import { ChartEditor } from '../../DraggableFormFields/ChartEditor';
import { TableEditor } from '../../DraggableFormFields/TableEditor';
import { TextEditor } from '../../DraggableFormFields/TextEditor';
import { InteractiveFilterEditor } from '../../DraggableFormFields/InteractiveFilterEditor';

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
  setHtmlContent,
  setModal,
  setFieldData,
  handleTextCancel,
  textTitle,
  chartComponent,
  setFinalChartComponent,
  handleChartCancel,
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
              <Typography variant={'h5'} mb={2}>
                Form Scratch
              </Typography>

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
              <Box
                sx={{
                  mt: 26,
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: 1,
                }}
              >
                <Button variant="outlined" onClick={() => ''} color="secondary">
                  Cancel
                </Button>
                <Button variant="contained" onClick={() => ''}>
                  Save
                </Button>
              </Box>
            </>
          ) : (
            <>
              {modal?.chart && (
                <ChartEditor
                  setFinalChartComponent={setFinalChartComponent}
                  chartComponent={chartComponent}
                  handleCancel={handleCancel}
                  setModal={setModal}
                  setFieldData={setFieldData}
                  handleChartCancel={handleChartCancel}
                />
              )}

              {modal?.interactiveFilter && (
                <InteractiveFilterEditor handleCancel={handleCancel} />
              )}
              {modal?.text && (
                <TextEditor
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
                />
              )}
              {modal?.table && <TableEditor handleCancel={handleCancel} />}
            </>
          )}
        </Box>
      )}
    </Droppable>
  );
}
