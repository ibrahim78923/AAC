'use client';
import { DATE_FORMAT } from '@/constants';
import { useGetDealsGridViewQuery } from '@/services/airSales/deals';
import {
  Avatar,
  Box,
  Checkbox,
  Grid,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';

const TaskViewCard = () => {
  const theme = useTheme();
  const { data: dealsGridViewData } = useGetDealsGridViewQuery({});

  // const [selected, setSelected] = useState<any[]>([]);

  const [order, setOrder] = useState([
    dealsGridViewData?.data,
    // { mainTitle: 'dafdf', cardData: [{_id:'safsdfsdf'}] },
  ]);

  // const handlePatch = () => {
  // };

  const onDragEnd = (result: any, index: number) => {
    const newOrder = [...order];
    const cardData = [...newOrder[index]?.cardData];
    const items = Array.from(cardData);
    const [reOrderItem] = items.splice(result?.source?.index, 1);
    items.splice(result?.destination?.index, 0, reOrderItem);
    newOrder[index] = { ...newOrder[index], cardData: items };
    setOrder(newOrder);
    // handlePatch(reOrderItem?._id);
  };

  // const handleChackboxChange = (checked: boolean, col: any, i: number) => {
  // const newArr = [...columns];
  // if (checked) {
  //   setSelected((prevSelected) => [...prevSelected, col?.slug]);
  //   newArr[i].active = checked;
  // } else if (selected?.includes(col?.slug)) {
  //   setSelected(
  //     (prevSelected) =>
  //       prevSelected?.filter((val: string) => val !== col?.slug),
  //   );
  //   newArr[i].active = false;
  // }
  // setColumns(newArr);
  // };

  useEffect(() => {
    if (dealsGridViewData?.data?.length > 0)
      setOrder(JSON.parse(JSON.stringify(dealsGridViewData?.data)));
  }, [dealsGridViewData]);

  return (
    <Grid container spacing={2}>
      {order?.map((obj: any, index: number) => (
        <Grid item lg={3} key={uuidv4()}>
          <Box
            sx={{
              background: alpha(theme?.palette?.grey[700], 0.3),
              border: '1px solid',
              borderRadius: '5px',
              overflow: 'hidden',
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              flexWrap="wrap"
              gap={0.6}
              sx={{ background: theme?.palette?.common?.white, p: '10px 16px' }}
            >
              <Box display="flex" gap="10px" alignItems="center">
                <Typography>{obj?.mainTitle}</Typography>
                <Typography
                  sx={{
                    background: 'red',
                    p: 0.5,
                    borderRadius: '4px',
                    color: 'white',
                  }}
                  component="span"
                >
                  {obj?.quantity < 10 ? `0${obj?.quantity}` : obj?.quantity}
                </Typography>
              </Box>
              <Box textAlign="end">
                <Typography>Total: £{obj?.amount}</Typography>
                <Typography>(0%)</Typography>
              </Box>
            </Box>
            <Box p="16px">
              <DragDropContext
                onDragEnd={(events: any) => {
                  onDragEnd(events, index);
                }}
              >
                <Droppable
                  key={uuidv4()}
                  droppableId={`div-${index}`}
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
                          {obj?.cardData?.map((col: any, i: number) => (
                            <Draggable
                              key={uuidv4()}
                              draggableId={col?._id}
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
                                    background: theme?.palette?.common?.white,
                                    mb: '16px',
                                    borderRadius: '8px',
                                    border: '1px solid',
                                    p: '11px 10px',
                                    '&:last-child': {
                                      mb: '0px',
                                    },
                                  }}
                                >
                                  <Grid item xs={12} key={uuidv4()}>
                                    <Box
                                      sx={{
                                        display: 'flex',
                                        alignItems: 'baseline',
                                        mb: '9px',
                                      }}
                                    >
                                      <Box
                                        display="flex"
                                        alignItems="center"
                                        gap="8px"
                                        flex={1}
                                      >
                                        <Avatar
                                          src=""
                                          sx={{ height: 38, width: 38 }}
                                        >
                                          SM
                                        </Avatar>
                                        <Box>
                                          <Typography fontWeight={700}>
                                            {col?.dealOwner?.name}
                                          </Typography>
                                          <Typography fontSize="12px">
                                            Air Apple Cart
                                          </Typography>
                                        </Box>
                                      </Box>
                                      <Checkbox name={col?.name} />
                                    </Box>
                                    <Box
                                      display="flex"
                                      alignItems="center"
                                      justifyContent="space-between"
                                      mb="4px"
                                    >
                                      <Typography>Close Date</Typography>
                                      <Typography>£{col?.amount}</Typography>
                                    </Box>
                                    <Box
                                      display="flex"
                                      alignItems="center"
                                      justifyContent="space-between"
                                      mb="4px"
                                    >
                                      <Typography>Amount</Typography>
                                      <Typography>
                                        {dayjs(col?.closeDate).format(
                                          DATE_FORMAT?.UI,
                                        )}
                                      </Typography>
                                    </Box>
                                    <Box
                                      display="flex"
                                      alignItems="center"
                                      justifyContent="space-between"
                                      mb="8px"
                                    >
                                      <Typography>Priority</Typography>
                                      <Typography
                                        sx={{
                                          color:
                                            col?.priority?.toLowerCase() ===
                                            'low'
                                              ? theme?.palette?.success?.main
                                              : col?.priority?.toLowerCase() ===
                                                'medium'
                                              ? theme?.palette?.warning?.main
                                              : col?.priority?.toLowerCase() ===
                                                'high'
                                              ? theme?.palette?.error?.main
                                              : '',
                                        }}
                                      >
                                        {col?.priority}
                                      </Typography>
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
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default TaskViewCard;
