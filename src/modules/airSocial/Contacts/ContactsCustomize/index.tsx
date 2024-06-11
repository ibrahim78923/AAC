import { Box, Checkbox, FormControlLabel, useTheme } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { styles } from './ContactsCustomize.style';
import { DragIcon } from '@/assets/icons';

const ContactsCustomize = ({
  columns,
  setIsCustomize,
  isCustomize,
  handleOnChange,
  handleUpdateColumns,
  handleOnDragEnd,
  isLoading,
}: any) => {
  const theme = useTheme();
  return (
    <CommonDrawer
      title="Customize Columns"
      footer
      isOk
      okText="Save"
      submitHandler={handleUpdateColumns}
      isDrawerOpen={isCustomize}
      onClose={() => {
        setIsCustomize(false);
      }}
      isLoading={isLoading}
    >
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable
          key={uuidv4()}
          droppableId={`columnWrapper`}
          direction="vertical"
        >
          {(provided) => (
            <Box
              sx={{ userSelect: 'none', width: '100%' }}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <Box sx={{ paddingTop: '1rem', width: '100%' }}>
                {columns?.map((col: any, i: number) => {
                  return (
                    <Draggable
                      key={col?.slug}
                      draggableId={col?.slug}
                      index={i}
                    >
                      {(provided) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          sx={{
                            cursor: 'grabbing',
                            width: '100%',
                          }}
                        >
                          <Box
                            sx={{
                              ...styles.column(theme.palette, col.active),
                              width: '100%',
                            }}
                          >
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                flex: 1,
                              }}
                            >
                              <DragIcon />
                              <FormControlLabel
                                checked={col.active}
                                classes={{
                                  root: '_root',
                                  label: '_label',
                                }}
                                name={col.attributes}
                                onChange={(event) =>
                                  handleOnChange(event, col?.attributes)
                                }
                                control={<Checkbox />}
                                label={col.slug}
                              />
                            </Box>
                          </Box>
                        </Box>
                      )}
                    </Draggable>
                  );
                })}
              </Box>
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </CommonDrawer>
  );
};

export default ContactsCustomize;
