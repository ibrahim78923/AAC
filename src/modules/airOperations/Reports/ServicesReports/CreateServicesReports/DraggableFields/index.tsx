import { Box, Divider, Typography, useTheme } from '@mui/material';
import { DroppableModule as Droppable } from '../../DroppableModule';
import { Draggable } from 'react-beautiful-dnd';
import { DragAndDropIcon } from '@/assets/icons';
import { ChartEditor } from '../../DraggableFormFields/ChartEditor';
import { TableEditor } from '../../DraggableFormFields/TableEditor';
import { TextEditor } from '../../DraggableFormFields/TextEditor';
import { InteractiveFilterEditor } from '../../DraggableFormFields/InteractiveFilterEditor';

export default function DraggableFields({
  fieldsList,
  form,
  setForm,
  fieldData,
  modal,
  handleCancel,
  setColor,
  setFontSize,
  applyFormat,
  fontSize,
  color,
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
          {fieldData === false ? (
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
            </>
          ) : (
            <>
              {modal?.chart && (
                <ChartEditor
                  form={form}
                  setForm={setForm}
                  handleCancel={handleCancel}
                />
              )}

              {modal?.interactiveFilter && (
                <InteractiveFilterEditor
                  form={form}
                  setForm={setForm}
                  handleCancel={handleCancel}
                />
              )}
              {modal?.text && (
                <TextEditor
                  form={form}
                  setForm={setForm}
                  handleCancel={handleCancel}
                  applyFormat={applyFormat}
                  setColor={setColor}
                  setFontSize={setFontSize}
                  fontSize={fontSize}
                  color={color}
                />
              )}
              {modal?.table && (
                <TableEditor
                  form={form}
                  setForm={setForm}
                  handleCancel={handleCancel}
                />
              )}
            </>
          )}
        </Box>
      )}
    </Droppable>
  );
}
