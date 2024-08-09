import { Box, Checkbox, FormControlLabel, Grid } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { v4 as uuidv4 } from 'uuid';
import { DragIcon } from '@/assets/icons';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { styles } from './CustomizeColumns.style';
import useCustomizeColumn from './useCustomizeColumn';
import { CustomizeColumnsI } from '../Quotes.interface';

const CustomizeColumns = ({ open, onClose }: CustomizeColumnsI) => {
  const {
    onDragEnd,
    order,
    theme,
    selected,
    handleChackboxChange,
    handleUpdateColumns,
    loadingColumns,
  } = useCustomizeColumn({ onClose });

  return (
    <>
      <CommonDrawer
        isDrawerOpen={open}
        onClose={onClose}
        title="Customize Columns"
        okText="Save"
        submitHandler={handleUpdateColumns}
        isOk
        footer
        isLoading={loadingColumns}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            key={uuidv4()}
            droppableId={`columnWrapper`}
            direction="vertical"
          >
            {(provided: any) => (
              <Box
                sx={{ userSelect: 'none', width: '100%' }}
                ref={provided?.innerRef}
                {...provided?.droppableProps}
              >
                <Box sx={{ paddingTop: '1rem', width: '100%' }}>
                  <Grid container>
                    {order?.map((col: any, i: number) => (
                      <Draggable
                        key={uuidv4()}
                        draggableId={col?.slug}
                        index={i}
                      >
                        {(provided: any) => (
                          <Box
                            ref={provided?.innerRef}
                            {...provided?.draggableProps}
                            {...provided?.dragHandleProps}
                            sx={{
                              cursor: 'grabbing',
                              width: '100%',
                            }}
                          >
                            <Grid item xs={12} key={uuidv4()}>
                              <Box
                                sx={{
                                  ...styles?.column(
                                    theme?.palette,
                                    col?.active,
                                  ),
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
                                    key={uuidv4()}
                                    checked={selected?.includes(col?.slug)}
                                    classes={{
                                      root: '_root',
                                      label: '_label',
                                    }}
                                    name={col?.attributes}
                                    onChange={({ target }: any) =>
                                      handleChackboxChange(
                                        target.checked,
                                        col,
                                        i,
                                      )
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
    </>
  );
};

export default CustomizeColumns;
