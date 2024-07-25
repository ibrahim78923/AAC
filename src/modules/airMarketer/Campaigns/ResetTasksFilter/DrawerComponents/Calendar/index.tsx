import { AnnoucementIcon, RefreshTasksIcon } from '@/assets/icons';
import SwitchableDatepicker from '@/components/SwitchableDatepicker';
import {
  Box,
  Button,
  Card,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { DATE_FORMAT, DATE_TIME_FORMAT, indexNumbers } from '@/constants';
import useCalander from './useCalander';
import dayjs from 'dayjs';

interface taskFilters {
  campaignId: string;
  assignedTo: string;
  status: string;
  taskType: string;
  startDate: string;
  endDate: string;
}
interface Props {
  setTaskFilters: (value: taskFilters) => void;
  setCurrentTabVal: (value: number) => void;
  setIsOpen: (value: boolean) => void;
  taskFilters: taskFilters;
}

const Calander = ({
  setCurrentTabVal,
  setIsOpen,
  taskFilters,
  setTaskFilters,
}: Props) => {
  const {
    theme,
    datePickerVal,
    setDatePickerVal,
    campaignsTasksData,
    isLoading,
  } = useCalander({ taskFilters });

  return (
    <>
      <Box sx={{ mt: 1, height: '420px' }}>
        <Typography
          variant="body1"
          fontWeight={500}
          sx={{
            color: theme?.palette?.primary?.main,
            mb: 1,
            cursor: 'pointer',
          }}
          onClick={() => {
            setIsOpen(false);
            setCurrentTabVal(1);
          }}
        >
          View full calendar
        </Typography>
        <SwitchableDatepicker
          cancelText="Reset"
          isCalendarOpen
          dateValue={datePickerVal}
          setDateValue={setDatePickerVal}
          handleDateSubmit={() => {
            setTaskFilters({
              ...taskFilters,
              startDate: datePickerVal[indexNumbers?.ZERO],
              endDate: datePickerVal[indexNumbers?.ONE],
            });
          }}
        />
      </Box>
      <Box>
        <Stack direction="row" justifyContent="space-between" mb={1}>
          {isLoading ? (
            <Skeleton height={36} width={150} animation="wave" />
          ) : (
            <Typography variant="body1" fontWeight={600}>
              {taskFilters?.startDate
                ? dayjs(datePickerVal[indexNumbers?.ZERO])?.format(
                    DATE_TIME_FORMAT?.ddddDDMMMYYYY,
                  )
                : 'All Tasks'}
            </Typography>
          )}
          {isLoading ? (
            <Skeleton height={36} width={150} animation="wave" />
          ) : (
            <Typography fontWeight={600} variant="body2">
              {campaignsTasksData?.length < 10
                ? `0${campaignsTasksData?.length}`
                : campaignsTasksData?.length}{' '}
              Events
            </Typography>
          )}
          {taskFilters?.startDate && (
            <Tooltip title={'Refresh Filter'}>
              <Button
                sx={{ width: { xs: '100%', sm: '50px' } }}
                variant="outlined"
                color="inherit"
                className="small"
                onClick={() => {
                  setTaskFilters({
                    ...taskFilters,
                    startDate: '',
                    endDate: '',
                  });
                }}
              >
                <RefreshTasksIcon />
              </Button>
            </Tooltip>
          )}
        </Stack>
        {campaignsTasksData?.length > 0 ? (
          campaignsTasksData?.map((item: any) => {
            return isLoading ? (
              <Skeleton height={66} animation="wave" />
            ) : (
              <Card
                sx={{
                  padding: 2,
                  borderLeft: `3px solid ${theme?.palette?.primary?.main}`,
                  mb: 1,
                }}
              >
                <Stack direction="row" gap={2} alignItems="center">
                  <AnnoucementIcon />
                  <Stack direction="column">
                    <Typography variant="body2">
                      {item?.taskName ?? 'N/A'}
                    </Typography>
                    <Typography variant="body2">
                      {dayjs(item?.startDate)?.format(DATE_TIME_FORMAT?.HHMMA)}-
                      {dayjs(item?.startDate)?.format(DATE_FORMAT?.UI)}
                    </Typography>
                  </Stack>
                </Stack>
              </Card>
            );
          })
        ) : (
          <Typography variant="body1">No data found</Typography>
        )}
      </Box>
    </>
  );
};

export default Calander;
