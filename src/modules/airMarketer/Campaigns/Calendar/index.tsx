import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import ResourcePlugin from '@fullcalendar/resource';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import useCalendar from './useCalendar';
import { taskEvents } from './Calendar.data';
import CommonDrawer from '@/components/CommonDrawer';
import { generateImage } from '@/utils/avatarUtils';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import { AlertModals } from '@/components/AlertModals';
import { v4 as uuidv4 } from 'uuid';
import { styles } from './Calendar.style';
import EditTask from './EditTask';
import { TrashIcon } from '@/assets/icons';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';

const Calendar = () => {
  const {
    eventContentHandler,
    campaignsTaskConstants,
    handleMoreLinkClick,
    compaignsTasksData,
    handleEventClick,
    allCampaignsData,
    setIsDrawerOpen,
    handlePrevClick,
    handleNextClick,
    handleDateClick,
    renderDayCell,
    setCreateTask,
    calendarDate,
    isDrawerOpen,
    monthsArray,
    setIsDelete,
    currentDate,
    clickedDate,
    yearsArray,
    createTask,
    isDelete,
    theme,
    calendarRef,
    taskLoading,
    campaignsLoading,
    campaignDetailsData,
    campaignDetailsLoading,
    handleDeleteModal,
    deleteTaskLoading,
    selectedEventData,
    campaignTasksData,
    campaignsTaskLoading,
    calanderDrawerType,
    handleEditClick,
  } = useCalendar();

  const renderLoader = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  };

  if (taskLoading || campaignsLoading) {
    return renderLoader();
  }

  return (
    <>
      <Box sx={styles}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <FormControl sx={{ width: '100px' }}>
            <InputLabel id="demo-simple-select-label">Year</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Year"
            >
              {yearsArray?.map((item: any) => (
                <MenuItem key={uuidv4()} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ width: '100px' }}>
            <InputLabel id="demo-simple-select-label">Month</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Month"
            >
              {monthsArray?.map((item: any) => (
                <MenuItem key={uuidv4()} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <FullCalendar
          ref={calendarRef}
          dateClick={handleDateClick}
          dayCellContent={renderDayCell}
          schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
          plugins={[
            resourceTimelinePlugin,
            interactionPlugin,
            dayGridPlugin,
            ResourcePlugin,
          ]}
          headerToolbar={{
            left: '',
            center: 'Prev today Next',
            right: '',
          }}
          customButtons={{
            today: {
              text: calendarDate,
              click: function () {},
            },
            Prev: {
              icon: 'chevron-left',
              text: '',
              click: handlePrevClick,
            },
            Next: {
              icon: 'chevron-right',
              text: '',
              click: handleNextClick,
            },
          }}
          buttonText={{
            today: currentDate,
          }}
          titleFormat={{
            month: 'short',
            day: 'numeric',
            weekday: 'short',
          }}
          initialView="dayGridMonth"
          noEventsText="No Events to Show"
          events={taskEvents(theme, compaignsTasksData, allCampaignsData)}
          dayMaxEventRows={3}
          moreLinkClick={handleMoreLinkClick}
          editable={true}
          droppable={true}
          slotMinWidth={200}
          resourceAreaWidth={200}
          eventMinWidth={100}
          eventContent={eventContentHandler}
          slotDuration="24:00:00"
          slotLabelFormat={[
            { day: '2-digit', month: 'long', year: 'numeric', weekday: 'long' },
          ]}
          eventClick={(info) =>
            handleEventClick(info, compaignsTasksData, allCampaignsData)
          }
        />
      </Box>

      {isDrawerOpen?.isToggled && (
        <CommonDrawer
          isDrawerOpen={isDrawerOpen?.isToggled}
          onClose={() => {
            setIsDrawerOpen({ ...isDrawerOpen, isToggled: false });
          }}
          title={`Calendar ${isDrawerOpen?.type} detail`}
          okText=""
          isOk
          footer={false}
        >
          {isDrawerOpen?.type === calanderDrawerType?.TASKS ? (
            campaignsTaskLoading ? (
              <SkeletonTable />
            ) : (
              campaignTasksData?.map((item: any) => {
                const key = Object?.keys(item)[0];
                const value = item[key];
                return (
                  <Stack
                    direction={{ md: 'row', sm: 'column' }}
                    justifyContent="space-between"
                    py={2}
                    key={uuidv4()}
                    sx={{
                      borderBottom: `1px solid ${theme?.palette?.custom?.off_white_three}`,
                    }}
                  >
                    <Typography sx={{ color: theme?.palette?.custom?.main }}>
                      {key}
                    </Typography>
                    {key === campaignsTaskConstants?.ASSIGNED_TO ||
                    key === campaignsTaskConstants?.CREATED_BY ? (
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                        }}
                      >
                        <Avatar
                          alt="user_avatar"
                          src={generateImage(value?.avatar)}
                        >
                          <Typography
                            variant="body1"
                            fontWeight={500}
                            sx={{
                              color: theme?.palette?.custom?.dim_grey,
                              textTransform: 'upperCase',
                            }}
                          >
                            {value?.name?.charAt(0)}
                          </Typography>
                        </Avatar>
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 500,
                              color: `${theme?.palette?.blue?.dull_blue}`,
                            }}
                          >
                            {value?.name ?? 'N/A'}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 400,
                              color: `${theme?.palette?.custom?.light}`,
                            }}
                          >
                            {value?.email ?? 'N/A'}
                          </Typography>
                        </Box>
                      </Box>
                    ) : (
                      <Typography
                        sx={{
                          color: theme?.palette?.slateBlue?.main,
                          fontWeight: 500,
                        }}
                      >
                        {value}
                      </Typography>
                    )}
                  </Stack>
                );
              })
            )
          ) : campaignDetailsLoading ? (
            <SkeletonTable />
          ) : (
            campaignDetailsData?.map((item: any) => {
              const key = Object?.keys(item)[0];
              const value = item[key];
              return (
                <Stack
                  direction={{ md: 'row', sm: 'column' }}
                  justifyContent="space-between"
                  py={2}
                  key={uuidv4()}
                  sx={{
                    borderBottom: `1px solid ${theme?.palette?.custom?.off_white_three}`,
                  }}
                >
                  <Typography sx={{ color: theme?.palette?.custom?.main }}>
                    {key}
                  </Typography>
                  <Typography
                    sx={{
                      color: theme?.palette?.slateBlue?.main,
                      fontWeight: 500,
                    }}
                  >
                    {value}
                  </Typography>
                </Stack>
              );
            })
          )}
          <Box sx={{ display: 'flex', gap: '10px', paddingTop: '1rem' }}>
            {isDrawerOpen?.type === calanderDrawerType?.TASKS ? (
              <>
                <Button
                  variant="outlined"
                  startIcon={<AddCircle />}
                  color="inherit"
                  className="small"
                  onClick={() => handleEditClick(selectedEventData?.id)}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => setIsDelete(true)}
                  variant="outlined"
                  startIcon={<TrashIcon />}
                  color="inherit"
                  className="small"
                >
                  Delete
                </Button>
              </>
            ) : (
              <Button
                onClick={() => {}}
                variant="outlined"
                color="inherit"
                className="small"
              >
                Details
              </Button>
            )}
          </Box>
        </CommonDrawer>
      )}

      {createTask?.isToggle && (
        <EditTask
          createTask={createTask}
          isType={createTask?.type}
          setCreateTask={setCreateTask}
          clickedDate={clickedDate}
          onClose={() => {
            setCreateTask({ ...createTask, isToggle: false });
          }}
        />
      )}

      {isDelete && (
        <AlertModals
          message={'Are you sure you want to delete this campaign?'}
          type={'delete'}
          open={isDelete}
          submitBtnText="Delete"
          cancelBtnText="Cancel"
          handleClose={() => setIsDelete(false)}
          handleSubmitBtn={() => handleDeleteModal(selectedEventData?.id)}
          loading={deleteTaskLoading}
        />
      )}
    </>
  );
};

export default Calendar;
