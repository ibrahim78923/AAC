import React, { useEffect, useState } from 'react';

import { Box, Typography, useTheme } from '@mui/material';

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import BoardCard from '..';
import {
  useGetDealsGridViewQuery,
  // useUpdatedGridDealsMutation,
  // useUpdatedGridDealsMutation,
} from '@/services/airSales/deals';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
// import {
//   AccociatedCompanyIcon,
//   AccociatedContactIcon,
//   DealPhoneIcon,
//   EmailDealsIcon,
//   MeetingDealsIcon,
//   NotesDealsIcon,
//   TaskDealsIcon,
// } from '@/assets/icons';
// import Link from 'next/link';
// import { AIR_SALES } from '@/routesConstants/paths';
// import { useRouter } from 'next/router';

const TaskViewCard = ({}: any) => {
  // const route = useRouter();
  const { data: dealsGridViewData } = useGetDealsGridViewQuery({});
  // const [updatedGridDeals] = useUpdatedGridDealsMutation();
  // console.log(dealsGridViewData?.data, 'dealsGridViewData');

  const tasCardData = dealsGridViewData?.data?.map((item: any) => ({
    mainTitle: item?.mainTitle,
    cardData: item?.cardData?.map((obj: any) => ({
      subTitle: obj?.name,
      amount: obj?.amount,
      closeDate: dayjs(obj?.closeDate).format(DATE_FORMAT?.API),
      priority: obj?.priority,
    })),
  }));

  const theme = useTheme();
  const [taskCardData, setTaskCardData] = useState<any[]>([]);

  useEffect(() => {
    setTaskCardData(tasCardData);
  }, [dealsGridViewData]);

  // console.log(taskCardData, 'taskCardData');

  const [order, setOrder] = useState(tasCardData);

  const onDragEnd = (result: any) => {
    if (!result?.destination) return;
    const items = Array?.from(order);
    const [reOrderItem] = items?.splice(result?.source?.index, 1);
    items.splice(result?.destination?.index, 0, reOrderItem);
    setOrder(items);
  };

  // const updateOrderOnServer = async () => {
  //   try {
  //     await updatedGridDeals({
  //       // body: {},
  //     });
  //   } catch (error) {
  //     console.error('Error updating order:', error);
  //   }
  // };

  // console.log('indexOfBananaindexana', taskCardData, indexOfBanana);
  // const body={
  //   dealStageId:
  // }
  // updatedGridDeals()

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
            title={column?.mainTitle}
          >
            <Droppable
              key={uuidv4()}
              droppableId={`column-${columnIndex}`}
              direction="vertical"
            >
              {(provided) => (
                <Box ref={provided?.innerRef} {...provided?.droppableProps}>
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
                                    color: `${theme?.palette?.custom?.main}`,
                                    fontWeight: 400,
                                  }}
                                >
                                  Close Date
                                </Typography>
                                <Typography
                                  variant="subtitle2"
                                  sx={{
                                    color: `${theme?.palette?.grey[900]}`,
                                    fontWeight: 400,
                                  }}
                                >
                                  {items?.date}
                                </Typography>
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
