import { Fragment, useEffect, useState } from 'react';

import {
  Box,
  Typography,
  Avatar,
  Checkbox,
  AvatarGroup,
  useTheme,
} from '@mui/material';

import { useGetDealsGridViewQuery } from '@/services/airSales/deals';

import { styles } from './DealCard.style';

import {
  CallIcon,
  EmailDealsIcon,
  MeetingDealsIcon,
  NotesDealsIcon,
  TaskDealsIcon,
} from '@/assets/icons';

import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
interface Props {
  handleCheckboxChange?: (event: any, id: string) => void;
  selectedIds?: string[];
  search?: string;
  filterVal?: any;
}

const DealCard = (props: Props) => {
  const {
    handleCheckboxChange = () => {},
    selectedIds,
    search,
    filterVal,
  } = props;
  const theme = useTheme();
  const params = {
    search: search ? search : undefined,
    dealPiplineId: filterVal?.dealPiplineId
      ? filterVal?.dealPiplineId
      : undefined,
    dealOwnerId: filterVal?.dealOwnerId ? filterVal?.dealOwnerId : undefined,
    dealStageId: filterVal?.dealStageId ? filterVal?.dealStageId : undefined,
    dateEnd: filterVal?.closeDate
      ? dayjs(filterVal?.closeDate)?.toISOString()
      : undefined,
  };
  const { data } = useGetDealsGridViewQuery(params);
  const [taskCardData, setTaskCardData] = useState([]);
  useEffect(() => {
    setTaskCardData(data?.data?.new);
  }, [data?.data]);
  const [selectedDraggableIds, setSelectedDraggableIds] = useState<string[]>(
    [],
  );

  const onDragStart = (start: any) => {
    const selectedIds = taskCardData
      .slice(start.source.index, start.source.index + start.source.length)
      .map((item: any) => item._id);
    setSelectedDraggableIds(selectedIds);
  };

  const onDragEnd = (result: any) => {
    setSelectedDraggableIds([]);
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    const newTaskCardData: any = [...taskCardData];

    const [removed]: any = newTaskCardData.splice(
      sourceIndex,
      selectedDraggableIds.length,
    );
    newTaskCardData?.splice(destinationIndex, 0, ...removed);

    setTaskCardData(newTaskCardData);
  };

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <Droppable key={uuidv4()} droppableId={`list`} direction="vertical">
        {(provided) => (
          <Box
            sx={{ userSelect: 'none' }}
            ref={provided?.innerRef}
            {...provided?.droppableProps}
          >
            {taskCardData?.map((item: any, index: number) => (
              <Box
                key={uuidv4()}
                sx={{
                  background: `${theme?.palette?.grey[100]}`,
                  height: '100%',
                }}
              >
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
                        border: `1px solid ${theme?.palette?.grey[700]}`,
                        padding: '10px',
                        borderRadius: '8px',
                        margin: '10px 0px',
                        background: `${theme?.palette?.common?.white}`,
                        cursor: 'grabbing',
                      }}
                    >
                      <Fragment key={item?._id}>
                        <Box sx={styles?.cardHeader}>
                          <Box sx={styles?.dealOwner}>
                            <Avatar
                              sx={styles.avatar}
                              alt="Remy Sharp"
                              src={item?.AvatarImage}
                            >
                              R
                            </Avatar>
                            <Box>
                              <Typography sx={styles?.ownerName}>
                                {item?.name ?? 'N/A'}
                              </Typography>
                              <Box sx={styles?.orgName}>
                                {item?.name ?? 'N/A'}
                              </Box>
                            </Box>
                          </Box>
                          <Box>
                            <Checkbox
                              name={item?._id}
                              checked={selectedIds?.includes(item?._id)}
                              onChange={(event) =>
                                handleCheckboxChange(event, item?._id)
                              }
                            />
                          </Box>
                        </Box>
                        <Box sx={styles?.cardBody}>
                          <Box sx={styles?.spaceBetween}>
                            <Typography sx={styles?.label} variant="body3">
                              Amount
                            </Typography>
                            <Typography sx={styles?.title} variant="body3">
                              {item?.amount}
                            </Typography>
                          </Box>
                          <Box sx={styles?.spaceBetween}>
                            <Typography sx={styles?.label} variant="body3">
                              Close Date
                            </Typography>
                            <Typography sx={styles?.title} variant="body3">
                              {dayjs(item?.closeDate).format('YYYY/MM/DD')}
                            </Typography>
                          </Box>
                          <Box sx={styles?.spaceBetween}>
                            <Typography sx={styles?.label} variant="body3">
                              Priority
                            </Typography>
                            <Typography
                              sx={{
                                fontWeight: '600',
                                color: `${
                                  item?.priority === 'High'
                                    ? 'red'
                                    : 'warning.main'
                                }`,
                              }}
                              variant="body3"
                            >
                              {item?.priority}
                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={styles?.cardFooter}>
                          <Box component="ul" sx={styles?.activities}>
                            <Box component="li">
                              <EmailDealsIcon />
                            </Box>
                            <Box component="li">
                              <CallIcon />
                            </Box>
                            <Box component="li">
                              <MeetingDealsIcon />
                            </Box>
                            <Box component="li">
                              <NotesDealsIcon />
                            </Box>
                            <Box component="li">
                              <TaskDealsIcon />
                            </Box>
                          </Box>
                          <Box>
                            <AvatarGroup sx={styles?.avatarGroup} max={2}>
                              <Avatar sx={{ backgroundColor: '#000' }}>
                                A
                              </Avatar>
                              <Avatar>A</Avatar>
                            </AvatarGroup>
                          </Box>
                        </Box>
                      </Fragment>
                    </Box>
                  )}
                </Draggable>
              </Box>
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DealCard;
