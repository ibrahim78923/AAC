import {
  ArrowBoxedIcon,
  ExportFilledIcon,
  LeftArrowIcon,
} from '@/assets/icons';
import { CardBGBubbles } from '@/assets/images';
import CommonDrawer from '@/components/CommonDrawer';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import CustomAudioPlayer from './customAudioPlayer';
import { useState } from 'react';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
  timelineItemClasses,
} from '@mui/lab';
import { networkLogs, timeLineData } from './callsDetailsDrawer.data';

import { v4 as uuidv4 } from 'uuid';

const CallsDetailsDrawer = ({
  isCallDetailsDrawerOpen,
  setIsCallDetailsDrawerOpen,
}: any) => {
  const theme = useTheme();

  const [value, setValue] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <CommonDrawer
      isDrawerOpen={isCallDetailsDrawerOpen}
      onClose={() => setIsCallDetailsDrawerOpen(false)}
      title={'Call Details for john'}
      okText={'Create'}
      isOk
      cancelText={'Cancel'}
      footer={false}
      submitHandler={() => setIsCallDetailsDrawerOpen(false)}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        sx={{
          padding: '0',
          marginLeft: '-25px',
          '@media (max-width:599px)': {
            marginLeft: '0px',
          },
          '& .MuiTab-root': {
            marginRight: '30px',
          },
        }}
      >
        <Tab label="Call Summary" />
        <Tab label="Call Lifecycle" />
        <Tab label="Call Transcription" />
        <Tab label="Network Log" />
      </Tabs>

      <Box>
        <Box
          sx={{
            background: theme?.palette?.custom?.mid_grey,
            height: '122px',
            borderRadius: '4px',
            padding: '15px',
            mt: 2,
            position: 'relative',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              right: '0',
              top: '0',
            }}
          >
            <Image src={CardBGBubbles} alt="card-bg" />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              mb: 2,
              position: 'relative',
            }}
          >
            {value === 2 ? null : (
              <Typography variant="body4" fontWeight={400}>
                Incoming call From +12013409847 (Medicines & Pharmacy)
              </Typography>
            )}
            <Typography variant="body4" fontWeight={400}>
              07 feb 21,2:15
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '90%',
              margin: '0 auto',
            }}
          >
            {/* to */}
            <Box>
              <Typography variant="body2" textAlign={'center'} fontWeight={400}>
                Jhon
              </Typography>
              <Typography variant="body2" textAlign={'center'} fontWeight={400}>
                Skynet Services
              </Typography>
            </Box>
            <Box>
              {' '}
              <LeftArrowIcon />{' '}
            </Box>
            {/* form  */}
            <Box>
              <Typography variant="body2" textAlign={'center'} fontWeight={400}>
                Jhon
              </Typography>
              <Typography variant="body2" textAlign={'center'} fontWeight={400}>
                Skynet Services
              </Typography>
            </Box>
          </Box>
        </Box>
        {value === 2 || value === 3 ? null : (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
              variant="contained"
              id="demo-positioned-button"
              aria-controls={open ? 'demo-positioned-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              startIcon={<ExportFilledIcon />}
              size="medium"
            >
              Export
            </Button>
          </Box>
        )}
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem key={1}>
            <Typography
              variant="body2"
              fontWeight={500}
              color={theme?.palette?.grey?.[600]}
            >
              CSV
            </Typography>
          </MenuItem>
          <MenuItem
            key={2}
            sx={{
              '&.MuiMenuItem-root': {
                paddingRight: 4,
              },
            }}
          >
            <Typography
              variant="body2"
              fontWeight={500}
              color={theme?.palette.grey?.[600]}
            >
              Excel
            </Typography>
          </MenuItem>
        </Menu>
        {value === 1 || value === 2 || value === 3 ? null : (
          <Box
            sx={{
              background: theme?.palette?.custom?.mid_grey,
              borderRadius: '4px',
              padding: '15px',
              mt: 2,
            }}
          >
            <Typography variant="body4">Call Recording/Voicemail</Typography>
            <CustomAudioPlayer />
          </Box>
        )}
        {value === 3 ? null : (
          <Box sx={{ maxHeight: '40vh', overflow: 'scroll', mt: 2 }}>
            <Timeline
              sx={{
                [`& .${timelineItemClasses.root}:before`]: {
                  flex: 0,
                  padding: 0,
                },
              }}
            >
              {timeLineData?.map((item: any) => (
                <TimelineItem key={uuidv4()}>
                  <TimelineSeparator>
                    <TimelineDot
                      sx={{ background: theme?.palette?.primary?.main }}
                    />
                    <TimelineConnector
                      sx={{ background: theme?.palette?.primary?.main }}
                    />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Box>
                      <Typography variant="body4" sx={{ fontWeight: '500' }}>
                        {item?.label}
                      </Typography>
                    </Box>
                    <Typography variant="body4" sx={{ fontWeight: '400' }}>
                      {item?.content}
                    </Typography>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </Box>
        )}
        {value === 3 && (
          <Box sx={{ mt: 2 }}>
            {networkLogs?.map((item: any) => (
              <Accordion
                key={uuidv4()}
                sx={{
                  '.css-1sg5mra-MuiButtonBase-root-MuiAccordionSummary-root': {
                    // backgroundColor: "red",
                    borderRadius: '8px',
                    flexDirection: 'row-reverse',
                    boxShadow: 'rgb(0 0 0 / 7%) -1px 1px 4px 2px',
                    height: '62px',
                    mt: 2,
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ArrowBoxedIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Box
                    sx={{
                      borderLeft: `1px solid ${theme?.palette?.grey[700]}`,
                      ml: 2,
                      pl: 2,
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                  >
                    <Typography sx={{ fontWeight: '600' }}>
                      {item?.title}
                    </Typography>
                    <Typography variant="body2">{item?.time}</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    padding: '15px 0px 0px 0px',
                  }}
                >
                  <Box
                    sx={{
                      background: theme?.palette?.primary?.light,
                      padding: '18px',
                      borderRadius: '15px',
                    }}
                  >
                    {item?.content?.map((ele: any) => (
                      <Box sx={{ mb: 1 }} key={uuidv4()}>
                        <Typography
                          sx={{
                            color: theme?.palette?.primary?.main,
                            fontWeight: '500',
                          }}
                        >
                          {ele?.label}
                        </Typography>
                        <Typography sx={{ fontWeight: '500' }}>
                          {ele?.content}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        )}
      </Box>
    </CommonDrawer>
  );
};

export default CallsDetailsDrawer;
