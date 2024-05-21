import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Box, Theme, Typography, useTheme } from '@mui/material';

import {
  useGetCampaignsQuery,
  useGetCampaignsTasksQuery,
} from '@/services/airMarketer/campaigns';
import dayjs from 'dayjs';
import { AddPlusIcon } from '@/assets/icons';

const useCalendar = () => {
  const calendarRef = useRef<any>(null);
  const theme = useTheme<Theme>();
  const router = useRouter();

  const [selectedEventData, setSelectedEventData] = useState<any>({});
  const [modalEvents, setModalEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const currentDate = dayjs().format('MMMM YYYY');
  const [calendarDate, setCalendarDate] = useState(currentDate);
  const [isDelete, setIsDelete] = useState(false);
  const [clickedDate, setClickedDate] = useState(null);
  const [createTask, setCreateTask] = useState({ isToggle: false, type: '' });

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

  const handlePrevClick = () => {
    const calendarApi = calendarRef?.current?.getApi();
    calendarApi?.prev();
    const newDate = dayjs(calendarApi?.getDate())?.format('MMMM YYYY');
    setCalendarDate(newDate);
  };

  const handleNextClick = () => {
    const calendarApi = calendarRef?.current?.getApi();
    calendarApi?.next();
    const newDate = dayjs(calendarApi?.getDate())?.format('MMMM YYYY');
    setCalendarDate(newDate);
  };

  const handleEventClick = (info: any) => {
    setSelectedEventData(info?.event);
    setIsDrawerOpen(true);
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
    setCreateTask({ isToggle: true, type: 'add' });
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

  return {
    handlePlusButtonClick,
    eventContentHandler,
    handleMoreLinkClick,
    compaignsTasksData,
    selectedEventData,
    handleEventClick,
    allCampaignsData,
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
    clickedDate,
    yearsArray,
    createTask,
    taskLoading,
    campaignsLoading,
    isDelete,
    router,
    theme,
    calendarRef,
  };
};

export default useCalendar;
