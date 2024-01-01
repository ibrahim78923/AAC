// import { Fragment, useEffect, useState } from 'react';

// import {
//   Box,
//   Typography,
//   Avatar,
//   Checkbox,
//   AvatarGroup,
//   useTheme,
// } from '@mui/material';

// import { useGetDealsGridViewQuery } from '@/services/airSales/deals';

// import { styles } from './DealCard.style';

// import {
//   CallIcon,
//   EmailDealsIcon,
//   MeetingDealsIcon,
//   NotesDealsIcon,
//   TaskDealsIcon,
// } from '@/assets/icons';

// import dayjs from 'dayjs';
// import { v4 as uuidv4 } from 'uuid';
// import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
// interface Props {
//   handleCheckboxChange?: (event: any, id: string) => void;
//   checkedGridView?: string[];
//   search?: string;
//   filterVal?: any;
//   handleCheckedGrid?: any;
// }

// const DealCard = (props: Props) => {
//   const { handleCheckedGrid, checkedGridView, search, filterVal } = props;
//   const theme = useTheme();
//   const params = {
//     search: search ? search : undefined,
//     dealPiplineId: filterVal?.dealPiplineId
//       ? filterVal?.dealPiplineId
//       : undefined,
//     dealOwnerId: filterVal?.dealOwnerId ? filterVal?.dealOwnerId : undefined,
//     dealStageId: filterVal?.dealStageId ? filterVal?.dealStageId : undefined,
//     dateEnd: filterVal?.closeDate
//       ? dayjs(filterVal?.closeDate)?.toISOString()
//       : undefined,
//   };
//   const { data } = useGetDealsGridViewQuery(params);
//   const [taskCardData, setTaskCardData] = useState([]);
//   useEffect(() => {
//     setTaskCardData(data?.data?.new);
//   }, [data?.data]);
//   const [selectedDraggableIds, setSelectedDraggableIds] = useState<string[]>(
//     [],
//   );

//   const onDragStart = (start: any) => {
//     const selectedIds = taskCardData
//       .slice(start.source.index, start.source.index + start.source.length)
//       .map((item: any) => item._id);
//     setSelectedDraggableIds(selectedIds);
//   };

//   const onDragEnd = (result: any) => {
//     setSelectedDraggableIds([]);
//     if (!result.destination) return;

//     const sourceIndex = result.source.index;
//     const destinationIndex = result.destination.index;
//     const newTaskCardData: any = [...taskCardData];

//     const [removed]: any = newTaskCardData.splice(
//       sourceIndex,
//       selectedDraggableIds.length,
//     );
//     newTaskCardData?.splice(destinationIndex, 0, ...removed);

//     setTaskCardData(newTaskCardData);
//   };

//   const [tasks, setTasks] = useState([
//     { id: 'task-1', content: 'Task 1' },
//     { id: 'task-2', content: 'Task 2' },
//     { id: 'task-3', content: 'Task 3' },
//   ]);

//   const handleDragEnd = (result:any) => {
//     if (!result.destination) return;

//     const updatedTasks = [...tasks];
//     const [removed] = updatedTasks.splice(result.source.index, 1);
//     updatedTasks.splice(result.destination.index, 0, removed);

//     setTasks(updatedTasks);
//   };
//   return (
//     <>
//       <DragDropContext onDragEnd={handleDragEnd}>
//         <Droppable droppableId="board">
//           {(provided) => (
//             <div {...provided.droppableProps} ref={provided.innerRef}>
//               {tasks.map((task, index) => (
//                 <Draggable key={task.id} draggableId={task.id} index={index}>
//                   {(provided) => (
//                     <div
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                       ref={provided.innerRef}
//                     >
//                       {task.content}
//                     </div>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//             </div>
//           )}
//         </Droppable>
//       </DragDropContext>
//     </>

//     // <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
//     //   <Droppable key={uuidv4()} droppableId={`list`} direction="vertical">
//     //     {(provided) => (
//     //       <Box
//     //         sx={{ userSelect: 'none' }}
//     //         ref={provided?.innerRef}
//     //         {...provided?.droppableProps}
//     //       >
//     //         {taskCardData?.map((item: any, index: number) => (
//     //           <Box
//     //             key={uuidv4()}
//     //             sx={{
//     //               background: `${theme?.palette?.grey[100]}`,
//     //               height: '100%',
//     //             }}
//     //           >
//     //             <Draggable
//     //               key={uuidv4()}
//     //               draggableId={`taskCard-${index}`}
//     //               index={index}
//     //             >
//     //               {(provided) => (
//     //                 <Box
//     //                   ref={provided?.innerRef}
//     //                   {...provided?.draggableProps}
//     //                   {...provided?.dragHandleProps}
//     //                   sx={{
//     //                     border: `1px solid ${theme?.palette?.grey[700]}`,
//     //                     padding: '10px',
//     //                     borderRadius: '8px',
//     //                     margin: '10px 0px',
//     //                     background: `${theme?.palette?.common?.white}`,
//     //                     cursor: 'grabbing',
//     //                   }}
//     //                 >
//     //                   <Fragment key={item?._id}>
//     //                     <Box sx={styles?.cardHeader}>
//     //                       <Box sx={styles?.dealOwner}>
//     //                         <Avatar
//     //                           sx={styles.avatar}
//     //                           alt="Remy Sharp"
//     //                           src={item?.AvatarImage}
//     //                         >
//     //                           R
//     //                         </Avatar>
//     //                         <Box>
//     //                           <Typography sx={styles?.ownerName}>
//     //                             {item?.name ?? 'N/A'}
//     //                           </Typography>
//     //                           <Box sx={styles?.orgName}>
//     //                             {item?.name ?? 'N/A'}
//     //                           </Box>
//     //                         </Box>
//     //                       </Box>
//     //                       <Box>
//     //                         {/* <Checkbox
//     //                           onChange={({ target }) => {
//     //                             handleSelectAllCompanies(target.checked);
//     //                           }}
//     //                           checked={
//     //                             companiesData?.data?.companies?.length &&
//     //                             checkedRows?.length ===
//     //                               companiesData?.data?.companies?.length
//     //                           }
//     //                         /> */}
//     //                         <Checkbox
//     //                           checked={checkedGridView?.includes(item?._id)}
//     //                           onChange={({ target }) => {
//     //                             handleCheckedGrid(target.checked,item?._id);
//     //                           }}
//     //                         />
//     //                       </Box>
//     //                     </Box>
//     //                     <Box sx={styles?.cardBody}>
//     //                       <Box sx={styles?.spaceBetween}>
//     //                         <Typography sx={styles?.label} variant="body3">
//     //                           Amount
//     //                         </Typography>
//     //                         <Typography sx={styles?.title} variant="body3">
//     //                           {item?.amount}
//     //                         </Typography>
//     //                       </Box>
//     //                       <Box sx={styles?.spaceBetween}>
//     //                         <Typography sx={styles?.label} variant="body3">
//     //                           Close Date
//     //                         </Typography>
//     //                         <Typography sx={styles?.title} variant="body3">
//     //                           {dayjs(item?.closeDate).format('YYYY/MM/DD')}
//     //                         </Typography>
//     //                       </Box>
//     //                       <Box sx={styles?.spaceBetween}>
//     //                         <Typography sx={styles?.label} variant="body3">
//     //                           Priority
//     //                         </Typography>
//     //                         <Typography
//     //                           sx={{
//     //                             fontWeight: '600',
//     //                             color: `${
//     //                               item?.priority === 'High'
//     //                                 ? 'red'
//     //                                 : 'warning.main'
//     //                             }`,
//     //                           }}
//     //                           variant="body3"
//     //                         >
//     //                           {item?.priority}
//     //                         </Typography>
//     //                       </Box>
//     //                     </Box>
//     //                     <Box sx={styles?.cardFooter}>
//     //                       <Box component="ul" sx={styles?.activities}>
//     //                         <Box component="li">
//     //                           <EmailDealsIcon />
//     //                         </Box>
//     //                         <Box component="li">
//     //                           <CallIcon />
//     //                         </Box>
//     //                         <Box component="li">
//     //                           <MeetingDealsIcon />
//     //                         </Box>
//     //                         <Box component="li">
//     //                           <NotesDealsIcon />
//     //                         </Box>
//     //                         <Box component="li">
//     //                           <TaskDealsIcon />
//     //                         </Box>
//     //                       </Box>
//     //                       <Box>
//     //                         <AvatarGroup sx={styles?.avatarGroup} max={2}>
//     //                           <Avatar sx={{ backgroundColor: '#000' }}>
//     //                             A
//     //                           </Avatar>
//     //                           <Avatar>A</Avatar>
//     //                         </AvatarGroup>
//     //                       </Box>
//     //                     </Box>
//     //                   </Fragment>
//     //                 </Box>
//     //               )}
//     //             </Draggable>
//     //           </Box>
//     //         ))}
//     //         {provided.placeholder}
//     //       </Box>
//     //     )}
//     //   </Droppable>
//     // </DragDropContext>
//   );
// };

// export default DealCard;

import React, { useEffect, useState } from 'react';

import { Box, Checkbox, Theme, Typography, useTheme } from '@mui/material';

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
  const theme = useTheme<Theme>();
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
