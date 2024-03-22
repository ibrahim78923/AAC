import {
  // List,
  // ListItem,
  // ListItemButton,
  // ListItemIcon,
  // ListItemText,
  Checkbox,
  FormControlLabel,
  Grid,
  Box,
} from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
// import { DragSharedIcon } from '@/assets/icons';
import { styles } from './CustomizeColumns.style';
import React from 'react';

import { DragIcon } from '@/assets/icons';

import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import useCustomizeColumn from './useCustomizeColumn';

const CustomizeColumns = ({ open, onClose }: any) => {
  const {
    // QuoteCustomzieCol,
    handleChackboxChange,
    handleUpdateColumns,
    // columnsData,
    selected,
    theme,
    order,
    onDragEnd,
  } = useCustomizeColumn({ open, onClose });
  return (
    <CommonDrawer
      isDrawerOpen={open}
      onClose={onClose}
      title={'Edit Columns'}
      footer
      okText={'Apply'}
      isOk
      cancelText={'Cancel'}
      submitHandler={handleUpdateColumns}
    >
      {/* <List sx={styles?.columnsList}>
        {columns?.map((col: any) => {
          if (col?.id === 'cellCheckbox') {
            return null;
          }
          return (
            <ListItem key={col?.id} disablePadding>
              <ListItemButton
                className={
                  checkedColumns?.indexOf(col?.id) !== -1 ? 'selected' : ''
                }
                role={undefined}
                onClick={handleToggleColumns(col?.id)}
                dense
              >
                <ListItemIcon>
                  <DragSharedIcon />
                </ListItemIcon>
                <ListItemText primary={col?.header} />
                <Checkbox
                  edge="start"
                  checked={checkedColumns?.indexOf(col?.id) !== -1}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List> */}
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

export default CustomizeColumns;
