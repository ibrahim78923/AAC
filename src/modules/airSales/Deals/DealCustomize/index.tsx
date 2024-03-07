import React from 'react';
import { Box, Checkbox, FormControlLabel, Grid } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';

import useDealCustomize from './useDealCustomize';
import { styles } from './DealCustomize.style';
import { DragIcon } from '@/assets/icons';

import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const DealCustomize = ({ open, onClose }: any) => {
  const {
    handleChackboxChange,
    handleUpdateColumns,
    // columnsData,
    selected,
    theme,
    order,
    onDragEnd,
  } = useDealCustomize({ onClose, open });

  // const onDragEnd = (result: any) => {
  //   if (!result?.destination) return;

  //   const items = Array.from(order);
  //   const [reOrderItem] = items.splice(result.source.index, 1);
  //   items.splice(result.destination.index, 0, reOrderItem);
  //   setOrder(items);
  // };

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
                                    handleChackboxChange(target.checked, col, i)
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

export default DealCustomize;
