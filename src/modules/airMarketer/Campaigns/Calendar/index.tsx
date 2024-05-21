import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import ResourcePlugin from '@fullcalendar/resource';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import useCalendar from './useCalendar';
import { taskEvents } from './Calendar.data';
import CommonDrawer from '@/components/CommonDrawer';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { AvatarImage } from '@/assets/images';
import { AddCircle } from '@mui/icons-material';
import { AlertModals } from '@/components/AlertModals';
import { v4 as uuidv4 } from 'uuid';
import { styles } from './Calendar.style';
import EditTask from './EditTask';

const Calendar = () => {
  const {
    eventContentHandler,
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
          eventClick={handleEventClick}
        />
      </Box>

      {isDrawerOpen && (
        <CommonDrawer
          isDrawerOpen={isDrawerOpen}
          onClose={() => {
            setIsDrawerOpen(false);
          }}
          title={'Calendar task detail'}
          okText=""
          isOk
          footer={false}
        >
          <Table>
            <TableBody>
              <TableRow
                sx={{
                  borderBottom: `1px solid ${theme?.palette?.custom?.off_white_three}`,
                }}
              >
                <TableCell>Type</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
              <TableRow
                sx={{
                  borderBottom: `1px solid ${theme?.palette?.custom?.off_white_three}`,
                }}
              >
                <TableCell>Campaign</TableCell>
                <TableCell>Promoted an online event</TableCell>
              </TableRow>
              <TableRow
                sx={{
                  borderBottom: `1px solid ${theme?.palette?.custom?.off_white_three}`,
                }}
              >
                <TableCell>Created by</TableCell>
                <TableCell>
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                  >
                    <Image
                      src={AvatarImage?.src}
                      alt="avatar"
                      width={40}
                      height={40}
                    />
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 500,
                          color: `${theme?.palette?.blue?.dull_blue}`,
                        }}
                      >
                        Sophie Anderson
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 400,
                          color: `${theme?.palette?.custom?.light}`,
                        }}
                      >
                        Sophie@airapplecart.co.uk
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow
                sx={{
                  borderBottom: `1px solid ${theme?.palette?.custom?.off_white_three}`,
                }}
              >
                <TableCell>Assigned to</TableCell>
                <TableCell>
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                  >
                    <Image
                      src={AvatarImage.src}
                      alt="dd"
                      width={40}
                      height={40}
                    />
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 500,
                          color: `${theme?.palette?.blue?.dull_blue}`,
                        }}
                      >
                        Lilly Drew
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 400,
                          color: `${theme?.palette?.custom?.light}`,
                        }}
                      >
                        L_drew@airapplecart.co.uk
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow
                sx={{
                  borderBottom: `1px solid ${theme?.palette?.custom?.off_white_three}`,
                }}
              >
                <TableCell>Due Date</TableCell>
                <TableCell>May 31st. 2023</TableCell>
              </TableRow>
              <TableRow
                sx={{
                  borderBottom: `1px solid ${theme?.palette?.custom?.off_white_three}`,
                }}
              >
                <TableCell>Notes</TableCell>
                <TableCell>Testing</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Box sx={{ display: 'flex', gap: '10px', paddingTop: '1rem' }}>
            <Button
              variant="outlined"
              startIcon={<AddCircle />}
              color="inherit"
              className="small"
            >
              Edit
            </Button>
            <Button
              onClick={() => setIsDelete(true)}
              variant="outlined"
              startIcon={<AddCircle />}
              color="inherit"
              className="small"
            >
              Delete
            </Button>
          </Box>
        </CommonDrawer>
      )}

      {createTask?.isToggle && (
        <EditTask
          createTask={createTask?.isToggle}
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
          handleSubmitBtn={() => {}}
        />
      )}
    </>
  );
};

export default Calendar;
