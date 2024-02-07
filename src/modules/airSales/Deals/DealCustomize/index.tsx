import { Box, Typography } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';

import ColumnsWrapper from './CoumnsWrapper';

import { v4 as uuidv4 } from 'uuid';
import { columnsData } from './DealCustomize.data';

import { AddCircleBlackIcon, EditProfilelLineIcon } from '@/assets/icons';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useState } from 'react';

const DealCustomize = ({ open, onClose, columns, setColumns }: any) => {
  const [taskCardData, setTaskCardData] = useState(columnsData);
  const onDragEnd = (result: any) => {
    if (!result?.destination) return;
    const sourceIndex = result?.source?.index;
    const destinationIndex = result?.destination?.index;
    const newTaskCardData = [...taskCardData];
    const [draggedItem] = newTaskCardData?.splice(sourceIndex, 1);

    newTaskCardData?.splice(destinationIndex, 0, draggedItem);
    setTaskCardData(newTaskCardData);
  };
  return (
    <CommonDrawer
      isDrawerOpen={open}
      onClose={onClose}
      footer
      isOk
      submitHandler={onClose}
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
              sx={{ userSelect: 'none' }}
              ref={provided?.innerRef}
              {...provided?.droppableProps}
            >
              {taskCardData?.map((items: any, index: number) => (
                <Draggable
                  key={uuidv4()}
                  draggableId={`taskCard-${index}`}
                  index={index}
                >
                  {(provided) => (
                    <Box
                      ref={provided?.innerRef}
                      {...provided?.draggableProps}
                      {...provided?.dragHandleProps}
                      sx={{
                        cursor: 'grabbing',
                      }}
                    >
                      <ColumnsWrapper
                        key={uuidv4()}
                        title={items?.title}
                        checkboxProps={{
                          checked: columns?.includes(items?.id),
                          onChange: (e: any) => {
                            if (e?.target?.checked) {
                              setColumns([...columns, items?.id]);
                            } else {
                              setColumns(
                                columns?.filter((id: any) => id != items?.id),
                              );
                            }
                          },
                        }}
                      />
                    </Box>
                  )}
                </Draggable>
              ))}
            </Box>
          )}
        </Droppable>
      </DragDropContext>

      <Box display="flex" alignItems="center" gap={1}>
        <AddCircleBlackIcon />
        <Typography>Add Columns</Typography>
        <EditProfilelLineIcon />
      </Box>
    </CommonDrawer>
  );
};

export default DealCustomize;
