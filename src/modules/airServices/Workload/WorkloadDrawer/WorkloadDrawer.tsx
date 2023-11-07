import { EditGreyIcon, FilterIcon, TicketBannerIcon } from '@/assets/icons';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Popover,
  Typography,
} from '@mui/material';
import { Fragment, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

const WorkloadDrawer = ({
  setOpenDrawer,
  openDrawer,
  dateRange,
  setDateRange,
  dataArray,
}: any) => {
  // Popover open Filter
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  // Popover open Date
  const [anchorElDate, setAnchorElDate] = useState<HTMLButtonElement | null>(
    null,
  );

  const handleClickDate = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElDate(event.currentTarget);
  };

  const handleCloseDate = () => {
    setAnchorElDate(null);
  };

  const openDate = Boolean(anchorElDate);
  const idDate = openDate ? 'simple-popover' : undefined;

  return (
    <Drawer
      open={openDrawer}
      onClose={() => setOpenDrawer(false)}
      anchor="right"
    >
      <Box
        sx={{
          width: { xs: '100vw', md: '40vw' },
        }}
      >
        <Box display={'flex'} justifyContent={'space-between'} p={4}>
          <Box display={'flex'} gap={1}>
            <Avatar
              sx={{
                bgcolor: 'primary.lighter',
                color: 'primary.main',
              }}
            >
              A
            </Avatar>
            <Box>
              <Typography color={'custom.main'} variant="body2">
                Alex Lexes Workload
              </Typography>
              <Typography variant="body2">5 June 2023</Typography>
              <Typography variant="body2">
                2 in Total
                <Chip
                  label="Unplanned"
                  sx={{
                    color: 'success.main',
                    ml: 2,
                  }}
                />
              </Typography>
            </Box>
          </Box>
          <IconButton
            aria-label="filter"
            sx={{
              height: '50px',
              width: '50px',
              borderRadius: 2,
              boxShadow: 2,
            }}
            onClick={handleClick}
          >
            <FilterIcon />
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Box width={200} p={1}>
              <Button
                startIcon={<EditCalendarIcon />}
                color={'secondary'}
                onClick={handleClickDate}
              >
                Created Date
              </Button>
              <Button startIcon={<CalendarMonthIcon />} color={'secondary'}>
                Last Modified Date
              </Button>
            </Box>
          </Popover>
          <Popover
            id={idDate}
            open={openDate}
            anchorEl={anchorElDate}
            onClose={handleCloseDate}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <DateRange
              editableDateInputs={true}
              onChange={(item: any) => setDateRange([item?.selection])}
              moveRangeOnFirstSelection={false}
              ranges={dateRange}
            />
          </Popover>
        </Box>
        <Divider />
        {dataArray?.map((item: any) => (
          <Fragment key={uuidv4()}>
            <Box
              px={4}
              py={2}
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Box>
                <Grid container gap={1} alignItems={'center'}>
                  <TicketBannerIcon />
                  <Typography variant="h6" fontWeight={600}>
                    {item?.ticketNo} {item?.description}
                  </Typography>
                </Grid>
                <Grid container alignItems={'center'} ml={3} mt={1}>
                  <Typography variant="body2" color={'custom.main'}>
                    {item?.startDate?.length
                      ? dayjs(item?.startDate)?.format('MM/DD/YYYY')
                      : 'Planned Start Date Not Set'}
                  </Typography>
                  <HorizontalRuleIcon sx={{ color: 'custom.main' }} />
                  <Typography variant="body2" color={'custom.main'}>
                    {item?.endDate?.length
                      ? dayjs(item?.endDate)?.format('MM/DD/YYYY')
                      : 'Planned End Date Not Set'}
                  </Typography>
                  <FiberManualRecordIcon
                    sx={{ color: 'custom.main', fontSize: '12px', mx: 1 }}
                  />
                  <Typography variant="body2" color={'custom.main'}>
                    {item?.plannedEffort?.length
                      ? item?.plannedEffort
                      : 'Planned End Date Not Set'}
                  </Typography>
                </Grid>
              </Box>
              <Box display={'flex'} gap={2}>
                <IconButton
                  sx={{
                    height: '50px',
                    width: '50px',
                    borderRadius: 2,
                    boxShadow: 2,
                  }}
                >
                  <EditGreyIcon />
                </IconButton>
                <IconButton
                  sx={{
                    height: '50px',
                    width: '50px',
                    borderRadius: 2,
                    boxShadow: 2,
                  }}
                >
                  <PersonRoundedIcon sx={{ color: 'custom.main' }} />
                </IconButton>
              </Box>
            </Box>
            <Divider />
          </Fragment>
        ))}
      </Box>
    </Drawer>
  );
};

export default WorkloadDrawer;
