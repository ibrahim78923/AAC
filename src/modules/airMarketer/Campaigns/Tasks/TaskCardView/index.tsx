import React, { useEffect, useState } from 'react';

import { Box, Checkbox, Theme, Typography, useTheme } from '@mui/material';

import { taskCardViewData } from './TaskCardView.data';

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';

const TaskViewCard = () => {
  const theme: any = useTheme<Theme>();
  const [taskCardData, setTaskCardData] = useState<any[]>([]);

  useEffect(() => {
    setTaskCardData([
      ...taskCardViewData.map((column: any) => ({
        mainTitle: column.mainTitle,
        cardData: [...column.cardData],
      })),
    ]);
  }, []);

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
    <>
      {/* <Box mb={1} sx={{ cursor: 'pointer' }} onClick={() => router.back()}>
        <BackArrIcon />
      </Box> */}
      <Box
        sx={{
          display: 'flex',
          columnGap: '2rem',
          overflowX: 'scroll',
        }}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          {taskCardData?.map((column, columnIndex) => (
            <Box
              key={uuidv4()}
              sx={{
                border: `1px solid ${theme?.palette?.grey[700]}`,
                borderRadius: '10px',
              }}
            >
              <Droppable
                key={uuidv4()}
                droppableId={`column-${columnIndex}`}
                direction="vertical"
              >
                {(provided) => (
                  <Box
                    ref={provided?.innerRef}
                    {...provided?.droppableProps}
                    sx={{ width: '282px' }}
                  >
                    <Box
                      sx={{
                        boxShadow: '0px 3px 6px 0px #6B72801A',
                        borderRadius: '10px 10px 0px 0px',
                        padding: '8px',
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: `${theme?.palette?.blue?.main}`,
                          fontWeight: 600,
                        }}
                      >
                        {column?.mainTitle}
                      </Typography>
                    </Box>
                    {column?.cardData.map((items: any, index: number) => (
                      <Box
                        key={uuidv4()}
                        sx={{
                          background: `${theme?.palette?.grey[100]}`,
                          height: '100%',
                        }}
                      >
                        <Draggable
                          key={uuidv4()}
                          draggableId={`taskCard-${columnIndex}-${index}`}
                          index={index}
                        >
                          {(provided) => (
                            <Box
                              ref={provided?.innerRef}
                              {...provided?.draggableProps}
                              {...provided?.dragHandleProps}
                              sx={{
                                border: `1px solid ${theme?.palette?.grey[700]}`,
                                padding: '10px',
                                borderRadius: '8px',
                                margin: '10px',
                                background: `${theme?.palette?.common?.white}`,
                                cursor: 'grabbing',
                              }}
                            >
                              <Box>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: `${theme?.palette?.slateBlue?.main}`,
                                    fontWeight: 700,
                                  }}
                                >
                                  {items?.subTitle}
                                </Typography>
                                <Box
                                  sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                  }}
                                >
                                  <Typography
                                    variant="subtitle2"
                                    sx={{
                                      color: `${theme?.palette?.grey[900]}`,
                                      fontWeight: 400,
                                    }}
                                  >
                                    {items?.date}
                                  </Typography>
                                  <Checkbox />
                                </Box>
                              </Box>

                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                }}
                              >
                                <Typography
                                  variant="subtitle2"
                                  sx={{
                                    color: `${theme?.palette?.custom?.main}`,
                                    fontWeight: 400,
                                  }}
                                >
                                  Linked Company
                                </Typography>
                                <Typography
                                  variant="subtitle2"
                                  sx={{
                                    color: `${theme?.palette?.blue?.main}`,
                                    fontWeight: 600,
                                  }}
                                >
                                  {items?.linkdCompany}
                                </Typography>
                              </Box>
                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                }}
                              >
                                <Typography
                                  variant="subtitle2"
                                  sx={{
                                    color: `${theme?.palette?.custom?.main}`,
                                    fontWeight: 400,
                                  }}
                                >
                                  Assigned User
                                </Typography>
                                <Typography
                                  variant="subtitle2"
                                  sx={{
                                    color: `${theme?.palette?.blue?.main}`,
                                    fontWeight: 600,
                                  }}
                                >
                                  {items?.assignUser}
                                </Typography>
                              </Box>
                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                }}
                              >
                                <Typography
                                  variant="subtitle2"
                                  sx={{
                                    color: `${theme?.palette?.custom?.main}`,
                                    fontWeight: 400,
                                  }}
                                >
                                  Task Status
                                </Typography>
                                <Typography
                                  variant="subtitle2"
                                  sx={{
                                    color:
                                      items?.status === 'Inprogress'
                                        ? `${theme?.palette?.warning?.main}`
                                        : items?.status === 'Pending'
                                        ? `${theme?.palette?.error?.main}`
                                        : items?.status === 'Complete'
                                        ? `${theme?.palette?.success?.main}`
                                        : '',
                                    fontWeight: 600,
                                  }}
                                >
                                  {items?.status}
                                </Typography>
                              </Box>
                            </Box>
                          )}
                        </Draggable>
                      </Box>
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </Box>
          ))}
        </DragDropContext>
      </Box>
    </>
  );
};

export default TaskViewCard;
