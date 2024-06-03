import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Box, Theme, Typography, useTheme } from '@mui/material';

import {
  useDeleteCampaignTasksMutation,
  useGetCampaignsByIdQuery,
  useGetCampaignsQuery,
  useGetCampaignsTaskByIdQuery,
  useGetCampaignsTasksQuery,
} from '@/services/airMarketer/campaigns';
import dayjs from 'dayjs';
import { AddPlusIcon } from '@/assets/icons';
import { CALANDER_DATE_FORMAT, DATE_FORMAT } from '@/constants';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

const useCalendar = () => {
  const calendarRef = useRef<any>(null);
  const theme = useTheme<Theme>();
  const router = useRouter();

  const [selectedEventData, setSelectedEventData] = useState<any>({});
  const [modalEvents, setModalEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState({
    isToggled: false,
    type: '',
    data: {},
  });
  const currentDate = dayjs().format(CALANDER_DATE_FORMAT?.UI);
  const [calendarDate, setCalendarDate] = useState(currentDate);
  const [isDelete, setIsDelete] = useState(false);
  const [clickedDate, setClickedDate] = useState(null);
  const [createTask, setCreateTask] = useState({
    isToggle: false,
    type: '',
    id: '',
    startDate: null,
  });

  const calanderDrawerType = {
    TASKS: 'Tasks',
    CAMPAIGNS: 'Campaigns',
  };

  const campaignsTaskConstants = {
    ASSIGNED_TO: 'Assigned to',
    CREATED_BY: 'Created by',
  };

  const { data: getCampaignsTasks, isLoading: taskLoading } =
    useGetCampaignsTasksQuery({});
  const compaignsTasksData = getCampaignsTasks?.data?.campaigntasks;

  const { data: campaignsData, isLoading: campaignsLoading } =
    useGetCampaignsQuery({});
  const allCampaignsData = campaignsData?.data?.campaigns;

  const eventContentHandler = (eventInfo: any) => {
    const event = eventInfo?.event?._def;
    return (
      <>
        <Box
          sx={{
            backgroundColor: eventInfo?.event?.extendedProps?.bgColor,
            border: eventInfo.borderColor
              ? `1px solid ${eventInfo.borderColor}`
              : '',
            padding: '4px 10px 4px 10px',
            borderRadius: '16px',
            margin: '3px 10px',
            width: 'fit-content',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Image
              src={event?.extendedProps?.SocailMedia}
              alt="dd"
              width={16}
              height={16}
            />
            <Typography
              variant="body4"
              sx={{
                color: eventInfo?.textColor,
                whiteSpace: 'initial',
                fontWeight: '600',
              }}
            >
              {event?.title}
            </Typography>
          </Box>
        </Box>
      </>
    );
  };

  const { data: getCampaignsById, isLoading: campaignDetailsLoading } =
    useGetCampaignsByIdQuery({ id: selectedEventData?.id });
  const campaignDetails = getCampaignsById?.data;

  const campaignDetailsData = [
    { 'Campaign Owner': campaignDetails?.owner ?? 'N/A' },
    { 'Campaign Goal': campaignDetails?.campaignGoal ?? 'N/A' },
    {
      'Campaign start date':
        dayjs(campaignDetails?.startDate)?.format(DATE_FORMAT?.UI) ?? 'N/A',
    },
    {
      'Campaign end date':
        dayjs(campaignDetails?.endDate)?.format(DATE_FORMAT?.UI) ?? 'N/A',
    },
    { 'Campaign Notes': campaignDetails?.description ?? 'N/A' },
  ];

  const { data: getCampaignsTaskById, isLoading: campaignsTaskLoading } =
    useGetCampaignsTaskByIdQuery(selectedEventData?.id);
  const campaignsTaskDetails = getCampaignsTaskById?.data[0];
  const campaignTasksData = [
    { Type: campaignsTaskDetails?.taskType ?? 'N/A' },
    { Campaign: campaignsTaskDetails?.campaignDetails[0]?.title ?? 'N/A' },
    {
      'Created by': {
        name:
          `${campaignsTaskDetails?.createdBy[0]?.firstName} ${campaignsTaskDetails?.createdBy[0]?.lastName}` ??
          'N/A',
        email: campaignsTaskDetails?.createdBy[0]?.email,
        avatar: campaignsTaskDetails?.createdBy[0]?.avatar?.url ?? 'N/A',
      },
    },
    {
      'Assigned to': {
        name:
          `${campaignsTaskDetails?.assignedTo[0]?.firstName} ${campaignsTaskDetails?.assignedTo[0]?.lastName}` ??
          'N/A',
        email: campaignsTaskDetails?.assignedTo[0]?.email ?? 'N/A',
        // avatar: '',
      },
    },
    {
      'Due Date':
        dayjs(campaignsTaskDetails?.dueDate)?.format(DATE_FORMAT?.UI) ?? 'N/A',
    },
    { Notes: campaignsTaskDetails?.note ?? 'N/A' },
  ];

  const [deleteTasks, { isLoading: deleteTaskLoading }] =
    useDeleteCampaignTasksMutation();

  const handleDeleteModal = async (id: any) => {
    try {
      await deleteTasks({ ids: id });
      enqueueSnackbar('Task Deleted Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error: any) {
      const errMsg = error?.data?.message;
      const errMessage = Array?.isArray(errMsg) ? errMsg[0] : errMsg;
      enqueueSnackbar(errMessage ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
    setIsDelete(false);
    setIsDrawerOpen({ ...isDrawerOpen, isToggled: false });
  };

  const handlePrevClick = () => {
    const calendarApi = calendarRef?.current?.getApi();
    calendarApi?.prev();
    const newDate = dayjs(calendarApi?.getDate())?.format(
      CALANDER_DATE_FORMAT?.UI,
    );
    setCalendarDate(newDate);
  };

  const handleNextClick = () => {
    const calendarApi = calendarRef?.current?.getApi();
    calendarApi?.next();
    const newDate = dayjs(calendarApi?.getDate())?.format(
      CALANDER_DATE_FORMAT?.UI,
    );
    setCalendarDate(newDate);
  };

  const handleEventClick = (
    info: any,
    compaignsTasksData: any,
    allCampaignsData: any,
  ) => {
    const eventType = info?.event?.extendedProps?.type;
    setSelectedEventData(info.event);
    setIsDrawerOpen({
      isToggled: true,
      type: eventType === 'task' ? 'Tasks' : 'Campaigns',
      data: eventType === 'task' ? compaignsTasksData : allCampaignsData,
    });
  };

  const handleMoreLinkClick = (info: any) => {
    setModalEvents(info?.allSegs);
  };

  const currentYear = new Date()?.getFullYear();
  const yearsArray = Array?.from(
    { length: 10 },
    (_, index) => (currentYear + index)?.toString(),
  );
  const monthsArray = Array?.from({ length: 12 }, (_, index) =>
    (index + 1).toString(),
  );

  const handleDateClick = (arg: any) => {
    setClickedDate(arg?.date.getDate());
  };

  const handlePlusButtonClick = (date: any) => {
    setCreateTask({
      ...createTask,
      isToggle: true,
      type: 'add',
      startDate: date,
    });
    setClickedDate(date);
  };

  const renderDayCell = (arg: any) => {
    const isClickedDate = clickedDate === arg?.date?.getDate();
    return (
      <Box className="day-cell">
        <span>{arg?.dayNumberText}</span>
        <Box className="plus-button-container">
          {isClickedDate && (
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => handlePlusButtonClick(arg?.date)}
            >
              <AddPlusIcon />
            </Box>
          )}
        </Box>
      </Box>
    );
  };

  const handleEditClick = (id: any) => {
    setIsDrawerOpen({ ...isDrawerOpen, isToggled: false });
    setCreateTask({ ...createTask, isToggle: true, type: 'edit', id: id });
  };

  return {
    campaignDetailsLoading,
    handlePlusButtonClick,
    campaignsTaskConstants,
    campaignsTaskLoading,
    eventContentHandler,
    campaignDetailsData,
    calanderDrawerType,
    compaignsTasksData,
    handleMoreLinkClick,
    handleDeleteModal,
    campaignTasksData,
    deleteTaskLoading,
    selectedEventData,
    campaignsLoading,
    handleEventClick,
    allCampaignsData,
    handleEditClick,
    handleNextClick,
    handlePrevClick,
    setIsDrawerOpen,
    handleDateClick,
    setIsModalOpen,
    setModalEvents,
    renderDayCell,
    setCreateTask,
    isDrawerOpen,
    calendarDate,
    currentDate,
    isModalOpen,
    monthsArray,
    modalEvents,
    setIsDelete,
    taskLoading,
    clickedDate,
    calendarRef,
    yearsArray,
    createTask,
    isDelete,
    router,
    theme,
  };
};

export default useCalendar;
