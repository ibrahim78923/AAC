import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Modal,
  StepLabel,
  Stepper,
  SvgIcon,
  Typography,
} from '@mui/material';
import ResourcePlugin from '@fullcalendar/resource';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import useCalender from './useCalender';
import Filters from './Filters';
import {
  ActionsIcon,
  BiAcivityIcon,
  CloseModalIcon,
  CommentIcon,
  FillCheckboxIcon,
  LikeIcon,
  MultipleUserIcon,
  PlusIcon,
  ShareIcon,
} from '@/assets/icons';
import { styles } from './Calender.style';
import { v4 as uuidv4 } from 'uuid';
import {
  AvatarImage,
  EventImage,
  NatureFreekImage,
  SeaImage,
} from '@/assets/images';
import Image from 'next/image';
import { airMarketingCalendar } from '@/routesConstants/paths';
import { SocailMediaEvent } from './Calender.data';
import { postBoxSteps } from '@/mock/modules/airMarketer/SocialMarketing';

const Calender = () => {
  const {
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
  } = useCalender();
  return (
    <>
      <Box sx={{ backgroundColor: 'white', padding: '20px' }}>
        <Button
          startIcon={<PlusIcon />}
          sx={{ float: 'right', marginBottom: '25px' }}
          variant="contained"
          className="small"
          onClick={() => router?.push(`${airMarketingCalendar?.create_post}`)}
        >
          Create Post
        </Button>
        <Filters />

        <FullCalendar
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
          events={SocailMediaEvent}
          dayMaxEventRows={3}
          moreLinkClick={handleMoreLinkClick}
          editable={true}
          droppable={true}
          slotMinWidth={200}
          resourceAreaWidth={240}
          eventMinWidth={200}
          eventContent={eventContentHandler}
          slotDuration="24:00:00"
          slotLabelFormat={[
            { day: '2-digit', month: 'long', year: 'numeric', weekday: 'long' },
          ]}
          dateClick={calendarDateClick}
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
          {modalEvents?.length === 0 && (
            <>
              {selectedEventData?._def?.title}
              <Box mt="-20px" textAlign="end">
                <SvgIcon
                  onClick={() => setIsModalOpen(false)}
                  sx={{ cursor: 'pointer' }}
                >
                  <CloseModalIcon />
                </SvgIcon>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'end', mb: '25px' }}>
                <Typography variant="h5">
                  Posted <FillCheckboxIcon />
                </Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={8} borderRadius="8px" border="1px solid #DADDE1">
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    padding="15px"
                  >
                    <Box display="flex" gap={1.5}>
                      <Box>
                        <Image src={NatureFreekImage} alt="image" />
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: '15px', fontWeight: 700 }}>
                          Nature Freek
                        </Typography>
                        <Box
                          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                        >
                          <Typography variant="body4">5 min .</Typography>
                          <MultipleUserIcon />
                        </Box>
                      </Box>
                    </Box>
                    <Box>
                      <SvgIcon>
                        <ActionsIcon />
                      </SvgIcon>
                    </Box>
                  </Box>
                  <Box sx={{ padding: '10px' }}>
                    <Typography sx={{ color: '#1D2129' }}>
                      {`Hey guys! I really love the city pop hit Plastic Love and I'm
                working on a new cover of it! 😊😊😊😊`}
                    </Typography>
                    <Typography sx={{ color: '#50ABF1' }}>
                      @zackben#nature #beauty #mountain #travel
                    </Typography>
                  </Box>

                  <Image src={SeaImage} alt="image" />

                  <Divider sx={{ my: '10px' }} />

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      mb: '10px',
                      alignItems: 'center',
                    }}
                  >
                    <Button
                      disableRipple
                      sx={{ color: '#606770', fontSize: '500' }}
                      startIcon={<LikeIcon />}
                    >
                      3.6 k
                    </Button>
                    <Button
                      sx={{ color: '#606770', fontSize: '500' }}
                      startIcon={<CommentIcon />}
                    >
                      2.1 k
                    </Button>
                    <Button
                      sx={{ color: '#606770', fontSize: '500' }}
                      startIcon={<ShareIcon />}
                    >
                      2.6 k
                    </Button>
                  </Box>
                </Grid>

                <Grid item xs={4}>
                  <Typography>
                    {' '}
                    <BiAcivityIcon /> Activity
                  </Typography>
                  <Box sx={{ maxWidth: 400 }}>
                    <Box sx={{ maxWidth: 400 }}>
                      <Stepper activeStep={6} orientation="vertical">
                        {postBoxSteps?.map((step: any) => (
                          <StepLabel
                            key={uuidv4()}
                            sx={{ display: 'flex' }}
                            icon={step?.icon}
                          >
                            <Box
                              sx={{
                                display: 'flex',
                                gap: 8,
                                mt: '15px',
                                color: theme?.palette?.custom?.steel_blue,
                              }}
                            >
                              <Typography variant="body4">
                                {step?.label}
                              </Typography>
                              <Typography variant="body4">
                                {step?.time}
                              </Typography>
                            </Box>
                            <Typography
                              sx={{ color: '#4E4B66' }}
                              variant="body4"
                            >
                              {step?.description(theme)}
                            </Typography>
                          </StepLabel>
                        ))}
                      </Stepper>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </>
          )}
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
                      <Avatar alt="Instagram Image" src={AvatarImage?.src} />
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
