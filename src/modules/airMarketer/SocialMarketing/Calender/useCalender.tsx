import React, { useRef, useState } from 'react';
import dayjs from 'dayjs';
import { Checkbox, Switch } from '@mui/material';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { airMarketingCalendar } from '@/routesConstants/paths';

const useCalender = () => {
  const fullCalendarRef = useRef<any>(null);

  // const [isSelectedUser, setIsSelectedUser] = useState<boolean>(true);
  // const [workScheduleObj, setWorkScheduleObj] = useState({});
  const [selectedUserData, setSelectedUserData] = useState<any>({});

  const [nonScheduledUser, setNonScheduledUser] = useState(false);

  const currentDate = dayjs().format('D MMMM YYYY');
  const [calendarDate, setCalendarDate] = useState(currentDate);

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

  const NonSchedulerWorkScheduleEvent =
    filterNonScheduledUsers &&
    filterNonScheduledUsers?.map((ele: any) => {
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
        shiftEnd:
          ele?.userShift?.shift?.shiftEndTime || ele?.shift?.shiftEndTime,
        effiectiveHours:
          ele?.userShift?.shift?.minEffectiveHours ||
          ele?.shift?.minEffectiveHours,
      };
    });

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
      MorningTest: '#FF6A6C',
      EveningTest: '#37B4A4',
      NightTest: '#FDCA64',
    };

    // let shiftColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    return (
      <>
        <div className="absent-grid d-flex justify-between h-100">
          <div
            className="absent-grid-item w-100 d-flex"
            style={{
              backgroundColor:
                backgroundColor[event?.extendedProps?.shift] || '#37B4A4',
            }}
          >
            <span className="absent-line"></span>
            <div className="absent-grid-content ">
              <h2 className="fs-14 fw-400 m-0">{event.title}</h2>
              <div className="absent-grid-circle d-flex align-center">
                <span
                  style={{ backgroundColor: event?.extendedProps?.shift }}
                ></span>
                <p className="fs-12 fw-500 m-0">
                  {event?.extendedProps?.shift}
                </p>
              </div>
              <div className="working-grid">
                <h3 className="fs-12 fw-500 m-0">
                  Working Hours : {event?.extendedProps?.total}
                </h3>
                <p className="fs-14 fw-600 m-0">
                  {event?.extendedProps?.shiftStart} to&nbsp;
                  {event?.extendedProps?.shiftEnd}
                </p>
              </div>
            </div>
          </div>
        </div>
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

  const handleResourceHeaderContent = () => {
    return (
      <>
        <div className="resource-user">
          <h2 className="fs-12 fw-500 m-0 black-color">Users</h2>

          <div className="d-flex align-center" style={{ gap: '20px' }}>
            <p className="fs-12 fw-400 line-height-18 m-0">Show unschedule</p>
            <Switch
              defaultChecked
              size="small"
              onChange={() =>
                setNonScheduledUser(
                  (prevNonScheduledUser) => !prevNonScheduledUser,
                )
              }
            />
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

  return {
    fullCalendarRef,
    nonScheduledUser,
    WorkScheduleEvent,
    NonSchedulerWorkScheduleEvent,
    WorkScheduleUser,
    nonSchedulerWorkScheduleUser,
    eventContentHandler,
    handleSlotContent,
    handleResourceRender,
    handleResourceHeaderContent,
    currentDate,
    calendarDate,
    handlePrevClick,
    handleNextClick,
    calendarDateClick,
  };
};

export default useCalender;
