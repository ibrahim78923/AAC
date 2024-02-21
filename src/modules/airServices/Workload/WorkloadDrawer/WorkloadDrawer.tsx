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
import { Fragment } from 'react';
import dayjs from 'dayjs';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';
import { UpdateWorkloadTask } from '../UpdateWorkloadTask';
import { IMG_URL } from '@/config';
import NoData from '@/components/NoData';
import { AssociationsImage } from '@/assets/images';
import useWorkloadDrawer from './useWorkloadDrawer';

const WorkloadDrawer = ({
  setOpenDrawer,
  openDrawer,
  dateRange,
  onChangeDateHandler,
  dataArray,
  state,
  setDateRange,
  isLoading,
  isFetching,
  isError,
  setModifiedRange,
  modifiedRange,
  onChangeModifiedHandler,
}: any) => {
  const {
    user,
    data,
    handleClick,
    id,
    open,
    anchorEl,
    handleClose,
    handleClickDate,
    handleClickModified,
    idDate,
    openDate,
    anchorElDate,
    handleCloseDate,
    theme,
    idModified,
    openModified,
    anchorElModified,
    handleCloseModified,
    setOnClickEvent,
    onClickEvent,
  } = useWorkloadDrawer({
    state,
    openDrawer,
    setModifiedRange,
    setDateRange,
  });

  return (
    <Fragment>
      <Drawer
        open={openDrawer}
        onClose={() => {
          setOpenDrawer(false);
        }}
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
                src={`${IMG_URL}${user?.avatar?.url}`}
              >
                {user?.firstName?.[0] ?? '-'}
                {user?.lastName?.[0]}
              </Avatar>
              <Box>
                <Typography
                  color={'custom.main'}
                  variant="body2"
                  textTransform={'capitalize'}
                >
                  {`${user?.firstName ?? '-'} ${user?.lastName}'s Workload`}
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  Manage open and in progress work
                </Typography>
                <Typography variant="body2">
                  {data?.length} in Total
                  {state === 'UNPLANNED' ? (
                    <Chip
                      label={`Unplanned ${dataArray?.length}`}
                      sx={{
                        color: 'success.main',
                        ml: 2,
                      }}
                    />
                  ) : state === 'PLANNED' ? (
                    <Chip
                      label={`Planned ${dataArray?.length}`}
                      sx={{
                        color: 'warning.main',
                        ml: 2,
                      }}
                    />
                  ) : state === 'DELAYED' ? (
                    <Chip
                      label={`Delayed ${dataArray?.length}`}
                      sx={{
                        color: 'custom.bright',
                        ml: 2,
                      }}
                    />
                  ) : null}
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
                <Button
                  startIcon={<CalendarMonthIcon />}
                  color={'secondary'}
                  onClick={handleClickModified}
                >
                  Last Modified Date
                </Button>
              </Box>
            </Popover>
            {/* Date Range Popover */}
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
                onChange={onChangeDateHandler}
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
                color={theme?.palette?.primary?.main}
                rangeColors={[theme?.palette?.primary?.main]}
              />
            </Popover>
            {/* Modified Range Popover */}
            <Popover
              id={idModified}
              open={openModified}
              anchorEl={anchorElModified}
              onClose={handleCloseModified}
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
                onChange={onChangeModifiedHandler}
                moveRangeOnFirstSelection={false}
                ranges={modifiedRange}
                color={theme?.palette?.primary?.main}
                rangeColors={[theme?.palette?.primary?.main]}
              />
            </Popover>
          </Box>
          <Divider />
          {isLoading || isFetching ? (
            <SkeletonTable />
          ) : isError ? (
            <ApiErrorState />
          ) : !dataArray?.length ? (
            <NoData message="No data is available" image={AssociationsImage} />
          ) : (
            <Fragment>
              {dataArray?.map((item: any) => (
                <Fragment key={item}>
                  <Box
                    px={4}
                    py={2}
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    gap={2}
                  >
                    <Box>
                      <Grid container gap={1} alignItems={'center'}>
                        <TicketBannerIcon />
                        <Typography
                          variant="h6"
                          fontWeight={600}
                          display={'flex'}
                          alignItems={'center'}
                          gap={0.5}
                        >
                          #TSK-
                          {item?.extendedProps?.data?._id?.slice(-3) ?? '-'}
                          {item?.extendedProps?.data?.description ? (
                            <>
                              <Box
                                component={'span'}
                                dangerouslySetInnerHTML={{
                                  __html:
                                    item?.extendedProps?.data?.description?.slice(
                                      0,
                                      20,
                                    ),
                                }}
                              />
                              ...
                            </>
                          ) : (
                            '-'
                          )}
                        </Typography>
                      </Grid>
                      <Grid container alignItems={'center'} ml={3} mt={1}>
                        <Typography variant="body2" color={'custom.main'}>
                          {item?.start?.length
                            ? dayjs(item?.start)?.format('MM/DD/YYYY')
                            : 'Planned Start Date Not Set'}
                        </Typography>
                        <HorizontalRuleIcon sx={{ color: 'custom.main' }} />
                        <Typography variant="body2" color={'custom.main'}>
                          {item?.end?.length
                            ? dayjs(item?.end)?.format('MM/DD/YYYY')
                            : 'Planned End Date Not Set'}
                        </Typography>
                        <FiberManualRecordIcon
                          sx={{ color: 'custom.main', fontSize: '12px', mx: 1 }}
                        />
                        <Typography variant="body2" color={'custom.main'}>
                          {item?.extendedProps?.data?.plannedEffort?.length
                            ? item?.extendedProps?.data?.plannedEffort
                            : 'Planned Effort Not Set'}
                        </Typography>
                      </Grid>
                    </Box>
                    <Box>
                      <IconButton
                        sx={{
                          height: '50px',
                          width: '50px',
                          borderRadius: 2,
                          boxShadow: 2,
                        }}
                        onClick={() => {
                          setOnClickEvent({
                            open: true,
                            data: item,
                          });
                        }}
                      >
                        <EditGreyIcon />
                      </IconButton>
                    </Box>
                  </Box>
                  <Divider />
                </Fragment>
              ))}
            </Fragment>
          )}
        </Box>
      </Drawer>

      {onClickEvent?.open && (
        <UpdateWorkloadTask
          openDrawer={onClickEvent?.open}
          onClose={() => setOnClickEvent({ open: null, data: null })}
          data={onClickEvent?.data}
          edit
        />
      )}
    </Fragment>
  );
};

export default WorkloadDrawer;
