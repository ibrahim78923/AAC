import { EditGreyIcon, FilterIcon, TicketBannerIcon } from '@/assets/icons';
import {
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  IconButton,
  Popover,
  Typography,
} from '@mui/material';
import { Fragment } from 'react';
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
import NoData from '@/components/NoData';
import useWorkloadDrawer from './useWorkloadDrawer';
import { fullNameInitial, truncateText } from '@/utils/avatarUtils';
import { DATE_TIME_FORMAT } from '@/constants';
import { UpdateWorkloadTicket } from '../UpdateWorkloadTicket';
import { otherDateFormat } from '@/lib/date-time';
import { workloadDefaultDateRange } from '../Workload.data';
import { Autorenew } from '@mui/icons-material';
import { CustomAvatar } from '@/components/Avatars/CustomAvatar';

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
    addPlannedTicketEffort,
    setAddPlannedTicketEffort,
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
        <Box width={{ lg: '520px', sm: '500px', xs: '100vw' }}>
          <Box display={'flex'} justifyContent={'space-between'} p={4}>
            <Box display={'flex'} gap={1}>
              <CustomAvatar
                avatarSize={{
                  width: 40,
                  height: 40,
                }}
                avatarSrc={user?.avatar?.url}
                nameInitial={fullNameInitial(user?.firstName, user?.lastName)}
              />
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
                <Typography variant="body2" component={'div'}>
                  {data?.length ?? 0} in Total
                  {state === 'UNPLANNED' ? (
                    <Chip
                      label={`Unplanned ${dataArray?.length ?? 0}`}
                      sx={{
                        color: 'success.main',
                        ml: 2,
                      }}
                    />
                  ) : state === 'PLANNED' ? (
                    <Chip
                      label={`Planned ${dataArray?.length ?? 0}`}
                      sx={{
                        color: 'warning.main',
                        ml: 2,
                      }}
                    />
                  ) : state === 'DELAYED' ? (
                    <Chip
                      label={`Delayed ${dataArray?.length ?? 0}`}
                      sx={{
                        color: 'custom.bright',
                        ml: 2,
                      }}
                    />
                  ) : null}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <IconButton
                aria-label="reset"
                sx={{
                  height: '50px',
                  width: '50px',
                  borderRadius: 2,
                  boxShadow: 2,
                }}
                onClick={() => {
                  setDateRange(workloadDefaultDateRange);
                  setModifiedRange(workloadDefaultDateRange);
                }}
              >
                <Autorenew />
              </IconButton>
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
            </Box>
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
            <NoData message="No data is available" />
          ) : (
            <Fragment>
              {dataArray?.map((item: any) => (
                <Fragment
                  key={
                    item?.extendedProps?.ticketIdParent ??
                    item?.extendedProps?._id
                  }
                >
                  <Box
                    px={4}
                    py={2}
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    gap={2}
                  >
                    <Box>
                      <Box display="flex" gap={1} alignItems={'center'}>
                        <TicketBannerIcon />
                        <Typography
                          variant={'h6'}
                          fontWeight={600}
                          display={'flex'}
                          alignItems={'center'}
                          gap={0.5}
                        >
                          <Typography
                            variant={'h6'}
                            textTransform={'uppercase'}
                            component={'span'}
                            fontWeight={600}
                          >
                            {item?.extendedProps?.taskId ??
                              item?.extendedProps?.ticketIdNumber}
                          </Typography>

                          {truncateText(
                            item?.extendedProps?.subject ??
                              item?.extendedProps?.title,
                          )}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems={'center'} ml={3} mt={1}>
                        <Typography variant="body2" color={'custom.main'}>
                          {item?.start
                            ? otherDateFormat(
                                item?.start,
                                DATE_TIME_FORMAT?.FORMAT_24_HOUR,
                              )
                            : 'No Date'}
                        </Typography>
                        <HorizontalRuleIcon sx={{ color: 'custom.main' }} />
                        <Typography variant="body2" color={'custom.main'}>
                          {item?.end
                            ? otherDateFormat(
                                item?.end,
                                DATE_TIME_FORMAT?.FORMAT_24_HOUR,
                              )
                            : 'No Date'}
                        </Typography>
                        <FiberManualRecordIcon
                          sx={{ color: 'custom.main', fontSize: '12px', mx: 1 }}
                        />
                        <Typography variant="body2" color={'custom.main'}>
                          {item?.extendedProps?.plannedEffort?.length
                            ? item?.extendedProps?.plannedEffort
                            : 'Effort Not Set'}
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <IconButton
                        sx={{
                          height: '50px',
                          width: '50px',
                          borderRadius: 2,
                          boxShadow: 2,
                        }}
                        onClick={() =>
                          item?.extendedProps?.taskId
                            ? setOnClickEvent({
                                open: true,
                                data: item,
                              })
                            : setAddPlannedTicketEffort({
                                open: true,
                                data: item,
                              })
                        }
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
        />
      )}

      {addPlannedTicketEffort?.open && (
        <UpdateWorkloadTicket
          openDrawer={addPlannedTicketEffort?.open}
          onClose={() => setAddPlannedTicketEffort({ open: null, data: null })}
          data={addPlannedTicketEffort?.data}
        />
      )}
    </Fragment>
  );
};

export default WorkloadDrawer;
