import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Avatar, Box, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { airMarketingCalendar } from '@/routesConstants/paths';
import { AvatarImage } from '@/assets/images';
import {
  FacebookRoundIcon,
  InstagramRoundIcon,
  YoutubeRoundIcon,
} from '@/assets/icons';

const useCalender = () => {
  const [selectedEventData, setSelectedEventData] = useState<any>({});
  const [modalEvents, setModalEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const currentDate = dayjs().format('D MMMM YYYY');
  const [calendarDate, setCalendarDate] = useState(currentDate);

  const theme = useTheme();

  const router = useRouter();
  const calendarDateClick = () => {
    router?.push(`${airMarketingCalendar?.create_post}`);
  };

  const eventContentHandler = (eventInfo: any) => {
    const event = eventInfo?.event?._def;
    const backgroundColor: any = {
      facebook: '#F0F5FF ',
      instagram: '#FFEEF4',
      youtube: '#FFE9E9',
    };

    const Color: any = {
      facebook: '#47639D',
      instagram: '#992F53',
      youtube: '#D74646',
    };

    return (
      <>
        <Box
          sx={{
            backgroundColor:
              backgroundColor[event?.extendedProps?.SocailMedia] || '#FFE9E9',
            padding: '6px',
            borderRadius: '4px',
            width: '100%',
            margin: '0 10px',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ position: 'relative' }}>
              <Avatar
                style={{
                  border: 'none',
                }}
                sx={{
                  '& .MuiAvatar-img': {
                    width: '75%',
                    height: '75%',
                    border: `2px solid ${
                      Color[event?.extendedProps?.SocailMedia] || '#D74646'
                    }`,
                    borderRadius: '50%',
                  },
                }}
                alt="Instagram Image"
                src={AvatarImage?.src}
              />
              <Box sx={{ position: 'absolute', right: '0', bottom: '-2px' }}>
                {event?.extendedProps?.SocailMedia === 'youtube' && (
                  <YoutubeRoundIcon />
                )}
                {event?.extendedProps?.SocailMedia === 'instagram' && (
                  <InstagramRoundIcon />
                )}
                {event?.extendedProps?.SocailMedia === 'facebook' && (
                  <FacebookRoundIcon />
                )}
              </Box>
            </Box>

            <Typography
              variant="body4"
              sx={{
                color: Color[event?.extendedProps?.SocailMedia] || '#D74646',
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
      .subtract(1, 'day')
      .format('D MMMM YYYY');

    setCalendarDate(newDate);
  };

  const handleNextClick = () => {
    const newDate = dayjs(calendarDate)?.add(1, 'day')?.format('D MMMM YYYY');
    setCalendarDate(newDate);
  };

  const handleEventClick = (info: any) => {
    setSelectedEventData(info?.event);
    setIsModalOpen(true);
  };

  const handleMoreLinkClick = (info: any) => {
    setModalEvents(info?.allSegs);
    setIsModalOpen(true);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [isDelete, setIsDelete] = useState(false);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return {
    eventContentHandler,
    currentDate,
    calendarDate,
    handlePrevClick,
    handleNextClick,
    calendarDateClick,
    router,
    handleEventClick,
    isModalOpen,
    setIsModalOpen,
    selectedEventData,
    handleMoreLinkClick,
    modalEvents,
    setModalEvents,
    theme,
    handleClose,
    handleClick,
    setIsDelete,
    anchorEl,
    isDelete,
  };
};

export default useCalender;
