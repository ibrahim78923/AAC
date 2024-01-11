import React, { useEffect, useState } from 'react';

import { Box, Checkbox, Typography, useTheme } from '@mui/material';

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import BoardCard from '..';

const taskCardViewData: any = [
  {
    mainTitle: 'All',
    cardData: [
      {
        subTitle: 'Verification',
        date: 'Last Date: 21-3-2023',
        linkdCompany: 'Apple',
        assignUser: 'John Doe',
        status: 'Inprogress',
      },
      {
        subTitle: 'Verification',
        date: 'Last Date: 21-3-2023',
        linkdCompany: 'Apple',
        assignUser: 'John Doe',
        status: 'Pending',
      },
      {
        subTitle: 'Verification',
        date: 'Last Date: 21-3-2023',
        linkdCompany: 'Apple',
        assignUser: 'John Doe',
        status: 'Complete',
      },
    ],
  },
  {
    mainTitle: 'Pending',
    cardData: [
      {
        subTitle: 'Verification',
        date: 'Last Date: 21-3-2023',
        linkdCompany: 'Apple',
        assignUser: 'John Doe',
        status: 'Pending',
      },
      {
        subTitle: 'Verification',
        date: 'Last Date: 21-3-2023',
        linkdCompany: 'Apple',
        assignUser: 'John Doe',
        status: 'Pending',
      },
    ],
  },
  {
    mainTitle: 'Inprogress',
    cardData: [
      {
        subTitle: 'Verification',
        date: 'Last Date: 21-3-2023',
        linkdCompany: 'Apple',
        assignUser: 'John Doe',
        status: 'Inprogress',
      },
      {
        subTitle: 'Verification',
        date: 'Last Date: 21-3-2023',
        linkdCompany: 'Apple',
        assignUser: 'John Doe',
        status: 'Inprogress',
      },
    ],
  },
  {
    mainTitle: 'Completed',
    cardData: [
      {
        subTitle: 'Verification',
        date: 'Last Date: 21-3-2023',
        linkdCompany: 'Apple',
        assignUser: 'John Doe',
        status: 'Complete',
      },
      {
        subTitle: 'Verification',
        date: 'Last Date: 21-3-2023',
        linkdCompany: 'Apple',
        assignUser: 'John Doe',
        status: 'Complete',
      },
    ],
  },
];

const TaskViewCard = ({}: any) => {
  const theme = useTheme();
  const [taskCardData, setTaskCardData] = useState<any[]>([]);

  useEffect(() => {
    setTaskCardData([
      ...taskCardViewData?.map((column: any) => ({
        mainTitle: column?.mainTitle,
        cardData: [...column?.cardData],
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
    <Box
      sx={{
        display: 'flex',
        columnGap: '2rem',
        overflowX: 'scroll',
      }}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        {taskCardData?.map((column, columnIndex) => (
          <BoardCard
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
                <Box ref={provided?.innerRef} {...provided?.droppableProps}>
                  <Box
                    sx={{
                      boxShadow: `0px 3px 6px 0px ${theme?.palette?.custom?.custom_shadow}`,
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
                  {column?.cardData?.map((items: any, index: number) => (
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
                  {provided?.placeholder}
                </Box>
              )}
            </Droppable>
          </BoardCard>
        ))}
      </DragDropContext>
    </Box>
  );
};

export default TaskViewCard;
