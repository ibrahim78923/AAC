import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Avatar, Box, Button, Grid, Modal, Typography } from '@mui/material';
import ResourcePlugin from '@fullcalendar/resource';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import useCalender from './useCalender';
import Filters from './Filters';
import { PlusIcon } from '@/assets/icons';
import { styles } from './Calendar.style';
import { v4 as uuidv4 } from 'uuid';
import { AvatarImage, EventImage } from '@/assets/images';
import Image from 'next/image';

const Calender = () => {
  const {
    fullCalendarRef,
    WorkScheduleUser,
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
  } = useCalender();
  return (
    <>
      <Box className="apply-work-wrapper">
        <Button
          startIcon={<PlusIcon />}
          sx={{ float: 'right', marginBottom: '25px' }}
          variant="contained"
          className="small"
          onClick={() =>
            router.push('/air-marketer/social-marketing/create-post')
          }
        >
          Create Post
        </Button>
        <Filters />

        <FullCalendar
          ref={fullCalendarRef}
          schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
          plugins={[
            resourceTimelinePlugin,
            interactionPlugin,
            dayGridPlugin,
            ResourcePlugin,
          ]}
          headerToolbar={{
            left: `Prev today Next`,
            right: '',
            center: '',
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
          resources={WorkScheduleUser}
          events={SocailMediaEvent}
          dayMaxEventRows={3}
          moreLinkClick={handleMoreLinkClick}
          editable={true}
          droppable={true}
          slotMinWidth={200}
          resourceAreaWidth={240}
          eventMinWidth={200}
          eventContent={eventContentHandler}
          resourceLabelContent={handleResourceRender}
          slotDuration="24:00:00"
          slotLabelContent={handleSlotContent}
          slotLabelFormat={[
            { day: '2-digit', month: 'long', year: 'numeric', weekday: 'long' },
          ]}
          dateClick={calendarDateClick}
          // dateClick={()=>router.push('/air-marketer/social-marketing/create-post')}
          eventClick={handleEventClick}
        />
      </Box>

      <Modal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setModalEvents([]);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.parentBox}>
          {selectedEventData?._def?.title}

          {modalEvents?.length > 0 && (
            <>
              <Typography
                variant="h3"
                sx={{ color: theme?.palette?.grey[600] }}
              >
                12 Sep , 2023
              </Typography>

              <Grid container spacing={2} sx={{ marginY: '20px' }}>
                <Grid item xs={3}>
                  <Box
                    sx={{
                      backgroundColor: '#F5FFF8',
                      borderRadius: '8px',
                      textAlign: 'center',
                      borderBottom: `2px solid ${theme?.palette?.success?.main}`,
                      paddingY: '20px',
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ color: theme?.palette?.success?.main }}
                      fontWeight={theme?.typography?.fontWeightMedium}
                    >
                      {' '}
                      08{' '}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: theme?.palette?.success?.main }}
                      fontWeight={theme?.typography?.fontWeightMedium}
                    >
                      {' '}
                      Posted{' '}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <Box
                    sx={{
                      backgroundColor: '#FFFBF0',
                      borderRadius: '8px',
                      textAlign: 'center',
                      borderBottom: `2px solid ${theme?.palette?.warning?.main}`,
                      paddingY: '20px',
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ color: theme?.palette?.warning?.main }}
                      fontWeight={theme?.typography?.fontWeightMedium}
                    >
                      {' '}
                      03{' '}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: theme?.palette?.warning?.main }}
                      fontWeight={theme?.typography?.fontWeightMedium}
                    >
                      {' '}
                      Scheduled{' '}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <Box
                    sx={{
                      backgroundColor: '#F6FAFF',
                      borderRadius: '8px',
                      textAlign: 'center',
                      borderBottom: `2px solid ${theme?.palette?.blue?.lighter}`,
                      paddingY: '20px',
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ color: theme?.palette?.blue?.light }}
                      fontWeight={theme?.typography?.fontWeightMedium}
                    >
                      {' '}
                      12{' '}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: theme?.palette?.blue?.light }}
                      fontWeight={theme?.typography?.fontWeightMedium}
                    >
                      {' '}
                      Drafts{' '}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </>
          )}

          <Grid container spacing={2} sx={{ marginY: '20px' }}>
            {modalEvents?.map((event: any) => (
              <Grid item xs={3} key={uuidv4()}>
                <Box
                  sx={{
                    border: '1px solid rgba(233, 234, 239, 0.50)',
                    borderRadius: '6px',
                    padding: '10px',
                  }}
                >
                  <Image
                    src={EventImage}
                    alt="EventImage"
                    style={{ borderRadius: '5px', width: '100%' }}
                  />

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      marginY: '10px',
                    }}
                  >
                    <Box>
                      <Avatar alt="Instagram Image" src={AvatarImage.src} />
                    </Box>
                    <Box sx={{ marginLeft: '10px' }}>
                      <Typography
                        variant="body4"
                        fontWeight={theme?.typography?.fontWeightMedium}
                        sx={{ color: theme?.palette?.secondary?.main }}
                      >
                        Brooklyn{' '}
                      </Typography>
                      <Typography
                        fontWeight={theme?.typography?.fontWeightRegular}
                        sx={{
                          color: theme?.palette?.secondary?.main,
                          fontSize: '10px',
                        }}
                      >
                        16/03/2023{' '}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography
                    variant="body4"
                    fontWeight={theme?.typography?.fontWeightRegular}
                    sx={{ color: theme?.palette?.blue?.lighter }}
                  >
                    {event?.event?.title}
                  </Typography>
                  <Typography>
                    {event?.event?.extendedProps?.SocialMedia}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      marginY: '10px',
                    }}
                  >
                    <Button
                      variant="outlined"
                      sx={{
                        fontSize: '12px',
                        backgroundColor: theme?.palette?.success?.main,
                        border: 'none',
                        color: 'White',
                        ':hover': {
                          backgroundColor: theme?.palette?.success?.main,
                        },
                      }}
                    >
                      Duplicate{' '}
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{
                        marginLeft: '10px',
                        fontSize: '12px',
                        backgroundColor: theme?.palette?.grey[100],
                        border: 'none',
                        color: theme?.palette?.grey[900],
                      }}
                    >
                      Visit Page{' '}
                    </Button>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Modal>
    </>
  );
};
export default Calender;
