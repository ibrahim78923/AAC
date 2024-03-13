import React from 'react';
import Search from '@/components/Search';
import { DragIcon } from '@/assets/icons/';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Box, Checkbox, FormControlLabel, Grid } from '@mui/material';
import useTaskCustomize from './useTaskCustomize';
import { v4 as uuidv4 } from 'uuid';
import { styles } from './EditColumns.style';
import CommonDrawer from '@/components/CommonDrawer';
const EditColumn = ({ onClose, open }: any) => {
  const {
    handleCheckboxChange,
    handleUpdateColumns,
    // columnsData,
    selected,
    theme,
    order,
    onDragEnd,
  } = useTaskCustomize();

  return (
    <CommonDrawer
      isDrawerOpen={open}
      onClose={onClose}
      footer
      isOk
      submitHandler={handleUpdateColumns}
      okText="Save"
      title="Customize Columns"
    >
      <Search size={'medium'} fullWidth label={'Search'} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          key={uuidv4()}
          droppableId={`columnWrapper`}
          direction="vertical"
        >
          {(provided) => (
            <Box
              sx={{ userSelect: 'none', width: '100%' }}
              ref={provided?.innerRef}
              {...provided?.droppableProps}
            >
              <Box sx={{ paddingTop: '1rem', width: '100%' }}>
                <Grid container>
                  {order?.map((col: any, i: number) => (
                    <Draggable
                      key={col?.slug}
                      draggableId={col?.slug}
                      index={i}
                    >
                      {(provided) => (
                        <Box
                          ref={provided?.innerRef}
                          {...provided?.draggableProps}
                          {...provided?.dragHandleProps}
                          sx={{
                            cursor: 'grabbing',
                            width: '100%',
                          }}
                        >
                          <Grid item xs={12} key={col?.slug}>
                            <Box
                              sx={{
                                ...styles?.column(theme?.palette, col?.active),
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
                                  key={col?.slug}
                                  checked={selected?.includes(col?.slug)}
                                  classes={{
                                    root: '_root',
                                    label: '_label',
                                  }}
                                  name={col?.attributes}
                                  onChange={({ target }: any) =>
                                    handleCheckboxChange(target.checked, col, i)
                                  }
                                  control={<Checkbox />}
                                  label={col?.slug}
                                />
                              </Box>
                            </Box>
                          </Grid>
                        </Box>
                      )}
                    </Draggable>
                  ))}
                </Grid>
              </Box>
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </CommonDrawer>
  );
};

export default EditColumn;
