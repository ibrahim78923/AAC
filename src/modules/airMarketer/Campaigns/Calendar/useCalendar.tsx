import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Box, Theme, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { CALENDAR_FORMAT, DATE_FORMAT } from '@/constants';

const useCalendar = () => {
  const [selectedEventData, setSelectedEventData] = useState<any>({});
  const [modalEvents, setModalEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const currentDate = dayjs().format('MMMM YYYY');
  const todayDate = dayjs().format(DATE_FORMAT?.API);
  const [calendarDate, setCalendarDate] = useState(currentDate);
  const [isDelete, setIsDelete] = useState(false);

  const theme = useTheme<Theme>();

  const router = useRouter();

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
            margin: '0 10px',
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
    const newDate = dayjs(calendarDate)
      ?.subtract(1, 'day')
      ?.format(CALENDAR_FORMAT?.UI);

    setCalendarDate(newDate);
  };

  const handleNextClick = () => {
    const newDate = dayjs(calendarDate)
      ?.add(1, 'day')
      ?.format(CALENDAR_FORMAT?.UI);
    setCalendarDate(newDate);
  };

  const handleEventClick = (info: any) => {
    setSelectedEventData(info?.event);
    setIsDrawerOpen(true);
  };

  const handleMoreLinkClick = (info: any) => {
    setModalEvents(info?.allSegs);
    setIsDrawerOpen(true);
  };

  const currentYear = new Date().getFullYear();
  const yearsArray = Array.from({ length: 10 }, (_, index) =>
    (currentYear + index).toString(),
  );
  const monthsArray = Array.from({ length: 12 }, (_, index) =>
    (index + 1).toString(),
  );

  return {
    eventContentHandler,
    currentDate,
    calendarDate,
    handlePrevClick,
    handleNextClick,
    router,
    handleEventClick,
    isModalOpen,
    setIsModalOpen,
    selectedEventData,
    handleMoreLinkClick,
    modalEvents,
    setModalEvents,
    theme,
    isDrawerOpen,
    setIsDrawerOpen,
    yearsArray,
    monthsArray,
    isDelete,
    setIsDelete,
    todayDate,
  };
};

export default useCalendar;
