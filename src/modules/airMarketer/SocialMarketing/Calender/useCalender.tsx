import React, { useRef, useState } from 'react';
import dayjs from 'dayjs';
import { Avatar, Box, Checkbox, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { airMarketingCalendar } from '@/routesConstants/paths';
import { AvatarImage } from '@/assets/images';
import {
  FacebookRoundIcon,
  InstagramRoundIcon,
  YoutubeRoundIcon,
} from '@/assets/icons';

const useCalender = () => {
  const fullCalendarRef = useRef<any>(null);

  // const [isSelectedUser, setIsSelectedUser] = useState<boolean>(true);
  // const [workScheduleObj, setWorkScheduleObj] = useState({});
  const [selectedUserData, setSelectedUserData] = useState<any>({});
  const [selectedEventData, setSelectedEventData] = useState<any>({});
  const [modalEvents, setModalEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const currentDate = dayjs().format('D MMMM YYYY');
  const [calendarDate, setCalendarDate] = useState(currentDate);

  const theme = useTheme();

  const SocailMediaEvent = [
    {
      title: 'However rare effects obse....',
      SocailMedia: 'facebook',
      start: '2023-11-06T10:00:00',
      end: '2023-11-06T12:00:00',
    },
    {
      title: 'However rare effects obse....',
      SocailMedia: 'youtube',
      start: '2023-11-06T10:00:00',
      end: '2023-11-06T12:00:00',
    },
    {
      title: 'However rare effects obse....',
      SocailMedia: 'facebook',
      start: '2023-11-06T10:00:00',
      end: '2023-11-06T12:00:00',
    },
    {
      title: 'However rare effects obse....',
      SocailMedia: 'facebook',
      start: '2023-11-06T10:00:00',
      end: '2023-11-06T12:00:00',
    },
    {
      title: 'i am always growing, learning....',
      SocailMedia: 'instagram',
      start: '2023-11-07T10:00:00',
      end: '2023-11-07T12:00:00',
    },
    {
      title: 'Nobody got a guided tour....',
      SocailMedia: 'youtube',
      start: '2023-11-20T10:00:00',
      end: '2023-11-20T12:00:00',
    },
  ];

  let workSchedule: any;
  const router = useRouter();
  // const data: any = [];
  const getAllActiveUsers: any = [];

  // workSchedule = data;

  const workScheduleEventMap = workSchedule;

  const filterNonScheduledUsers: any =
    !!getAllActiveUsers?.data?.length &&
    getAllActiveUsers?.data[0]?.filter(
      (item: any) =>
        !workScheduleEventMap?.some(
          (eventUser: any) => eventUser?.user?.id === item?.id,
        ),
    );

  const handleCheckbox = (e: any, selectedUserData: any) => {
    // e.target.checked === true
    //   ? setIsSelectedUser(false)
    //   : setIsSelectedUser(true);

    setSelectedUserData(!!e.target.checked ? selectedUserData : {});
  };

  const WorkScheduleEvent = workScheduleEventMap?.map((ele: any) => {
    return {
      id: ele?.userShift?.id || ele?.id,
      title: ele?.userShift?.shift?.name || ele?.shift?.name,
      resourceIds: [ele?.userShift?.user?.id || ele?.user?.id],
      start: ele?.userShift?.effectiveFrom || ele?.effectiveFrom,
      end: ele?.userShift?.effectiveTo || ele?.effectiveTo,
      shift: ele?.userShift?.shift?.name || ele?.shift?.name,
      total: ele?.userShift?.shift?.totalHours || ele?.shift?.totalHours,
      shiftStart:
        ele?.userShift?.shift?.shiftStartTime || ele?.shift?.shiftStartTime,
      shiftEnd: ele?.userShift?.shift?.shiftEndTime || ele?.shift?.shiftEndTime,
      effiectiveHours:
        ele?.userShift?.shift?.minEffectiveHours ||
        ele?.shift?.minEffectiveHours,
    };
  });

  // const NonSchedulerWorkScheduleEvent =
  //   filterNonScheduledUsers &&
  //   filterNonScheduledUsers?.map((ele: any) => {
  //     return {
  //       id: ele?.userShift?.id || ele?.id,
  //       title: ele?.userShift?.shift?.name || ele?.shift?.name,
  //       resourceIds: [ele?.userShift?.user?.id || ele?.user?.id],
  //       start: ele?.userShift?.effectiveFrom || ele?.effectiveFrom,
  //       end: ele?.userShift?.effectiveTo || ele?.effectiveTo,
  //       shift: ele?.userShift?.shift?.name || ele?.shift?.name,
  //       total: ele?.userShift?.shift?.totalHours || ele?.shift?.totalHours,
  //       shiftStart:
  //         ele?.userShift?.shift?.shiftStartTime || ele?.shift?.shiftStartTime,
  //       shiftEnd:
  //         ele?.userShift?.shift?.shiftEndTime || ele?.shift?.shiftEndTime,
  //       effiectiveHours:
  //         ele?.userShift?.shift?.minEffectiveHours ||
  //         ele?.shift?.minEffectiveHours,
  //     };
  //   });

  const WorkScheduleUser = workScheduleEventMap?.map((ele: any) => {
    // const userImage = <img src={ele?.user?.profileImageName} alt={`${ele?.user?.firstName} ${ele?.user?.lastName}`} style={{ borderRadius: '50%' }} />;
    const title = `${
      (ele?.user?.firstName?.charAt(0)?.toUpperCase() ||
        ele?.userShift?.user?.firstName?.charAt(0)?.toUpperCase()) +
      (ele?.user?.firstName?.slice(1) ||
        ele?.userShift?.user?.firstName?.slice(1))
    } ${
      (ele?.user?.lastName?.charAt(0)?.toUpperCase() ||
        ele?.userShift?.user?.lastName?.charAt(0)?.toUpperCase()) +
      (ele?.user?.lastName?.slice(1) ||
        ele?.userShift?.user?.lastName?.slice(1))
    }`;

    return {
      id: ele?.userShift?.user?.id || ele?.user?.id,
      // title: userImage + " " + title,
      title,
    };
  });

  const nonSchedulerWorkScheduleUser =
    filterNonScheduledUsers &&
    filterNonScheduledUsers?.map((ele: any) => {
      // const userImage = <img src={ele?.user?.profileImageName || ""} alt={`${ele?.user?.firstName} ${ele?.user?.lastName}`} style={{ borderRadius: '50%' }} />
      const title = `${
        ele?.firstName?.charAt(0)?.toUpperCase() + ele?.firstName?.slice(1)
      } ${ele?.lastName?.charAt(0)?.toUpperCase() + ele?.lastName?.slice(1)}`;
      return {
        id: ele?.id,
        // title: userImage + " " + title,
        title,
      };
    });

  const calendarDateClick = () => {
    // const clickedDate = arg.date;
    // const formattedDate = clickedDate.toISOString();
    router.push(`${airMarketingCalendar?.create_post}`);
  };

  // const handleEventClick = () => {

  //     // setIsEventModal(true);
  //     // const eventId = +e.event?._def?.publicId;

  //     // const scheduleObj = workScheduleEventMap?.find(
  //     //   (ele: any) => ele?.id === eventId
  //     // );

  //     // setWorkScheduleObj(scheduleObj);
  //     // setEventModalData(e);
  //     // setIsActionType("edit");
  //   };

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
                src={AvatarImage.src}
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

  const handleSlotContent = (slotEvent: any) => {
    return (
      <>
        <div className="slot-event-wrapper">
          <div className="d-flex align-center" style={{ gap: '5px' }}>
            <div>
              <p className="fs-14 fw-400 line-height-20 m-0">
                {dayjs(slotEvent.date).format('dddd')}
              </p>
            </div>
          </div>
        </div>
      </>
    );
  };

  const handleResourceRender = (info: any) => {
    const resource = info.resource._resource;

    return (
      <>
        <div className="resource-render-wrapper d-flex align-center">
          <Checkbox
            onChange={(e: any) => handleCheckbox(e, resource)}
            className={`resource-render-checked ${
              selectedUserData && 'user-is-checked'
            }`}
            name={`${resource.id}`}
            id={`${resource.id}`}
          ></Checkbox>

          <div
            className="resource-render-content d-flex align-center cursor-pointer"
            style={{ marginLeft: '25px' }}
          >
            <Image src={resource.extendedProps.imageUrl} alt="" />
            <label
              className="grey-color fs-14 fw-400 line-height-20 cursor-pointer"
              htmlFor={`${resource.id}`}
            >
              {resource.title}
            </label>
          </div>
        </div>
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
    const newDate = dayjs(calendarDate).add(1, 'day').format('D MMMM YYYY');
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

  return {
    fullCalendarRef,
    WorkScheduleEvent,
    WorkScheduleUser,
    nonSchedulerWorkScheduleUser,
    eventContentHandler,
    handleSlotContent,
    handleResourceRender,
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
    SocailMediaEvent,
    handleMoreLinkClick,
    modalEvents,
    setModalEvents,
    theme,
  };
};

export default useCalender;
