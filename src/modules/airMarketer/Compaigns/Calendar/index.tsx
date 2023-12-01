import React from 'react';
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

const Calendar = () => {
  const {
    eventContentHandler,
    currentDate,
    calendarDate,
    handlePrevClick,
    handleNextClick,
    calendarDateClick,
    handleEventClick,
    handleMoreLinkClick,
    isDrawerOpen,
    setIsDrawerOpen,
    yearsArray,
    monthsArray,
    isDelete,
    setIsDelete,
    theme,
  } = useCalendar();
  return (
    <>
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
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Image src={AvatarImage} alt="dd" width={40} height={40} />
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 500, color: '#111827' }}
                    >
                      Sophie Anderson
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 400, color: '#667085' }}
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
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Image src={AvatarImage} alt="dd" width={40} height={40} />
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 500, color: '#111827' }}
                    >
                      Lilly Drew
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 400, color: '#667085' }}
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
            sx={{
              border: `1px solid ${theme?.palette?.grey[100]}`,
              color: `${theme?.palette?.custom?.main}`,
              fontWeight: 500,
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <AddCircle sx={{ fontSize: '18px' }} />
            Edit
          </Button>
          <Button
            onClick={() => setIsDelete(true)}
            variant="outlined"
            sx={{
              border: `1px solid ${theme?.palette?.grey[100]}`,
              color: `${theme?.palette?.custom?.main}`,
              fontWeight: 500,
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <AddCircle sx={{ fontSize: '18px' }} />
            Delete
          </Button>
        </Box>
      </CommonDrawer>
      <Box sx={{ paddingTop: '1rem' }}>
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
          schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
          plugins={[
            resourceTimelinePlugin,
            interactionPlugin,
            dayGridPlugin,
            ResourcePlugin,
          ]}
          headerToolbar={{
            left: ``,
            right: '',
            center: 'Prev today Next',
          }}
          customButtons={{
            today: {
              text: calendarDate,
              click: function () {},
            },
            Prev: {
              text: '<',
              click: handlePrevClick,
            },
            Next: {
              text: '>',
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
          events={taskEvents}
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
          dateClick={calendarDateClick}
          eventClick={handleEventClick}
        />
      </Box>
      <AlertModals
        message={'Are you sure you want to delete this campaign?'}
        type={'delete'}
        open={isDelete}
        submitBtnText="Delete"
        cancelBtnText="Cancel"
        handleClose={() => setIsDelete(false)}
        handleSubmitBtn={() => {}}
      />
    </>
  );
};

export default Calendar;
