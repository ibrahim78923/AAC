import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import AddDateOverrides from '../AddDateOverrides';
import { useDateOverrides } from './useDateOverrides';
import dayjs from 'dayjs';
import { DATE_TIME_FORMAT, TIME_FORMAT } from '@/constants';

const DateOverrides = (props: any) => {
  const { theme, disabled, submittedData, timeSlotsData } = props;
  const {
    openModule,
    setOpenModule,
    showData,
    setShowData,
    handleSubmit,
    onSubmit,
    methods,
    control,
  } = useDateOverrides(props);

  return (
    <>
      <Typography variant="h3">Date Overrides</Typography>
      {!disabled ? (
        <Box
          border={`1.5px solid ${theme?.palette?.custom?.border_grayish_blue}`}
          borderRadius={3}
          mt={1}
          height={460}
          textAlign={'center'}
        >
          {!showData ? (
            <>
              {!timeSlotsData?.dateOverrides ? (
                <Typography p={3} textAlign={'center'}>
                  Add dates when your availability changes from your weekly
                  hours
                </Typography>
              ) : (
                <>
                  {timeSlotsData?.dateOverrides?.map(
                    (data: any, index: number) => (
                      <Box key={data?._id}>
                        <Box
                          display={'flex'}
                          justifyContent={'center'}
                          alignItems={'center'}
                          gap={2}
                          p={1}
                        >
                          <Typography>
                            {data?.date
                              ? dayjs(data?.overrideDate)?.format(
                                  DATE_TIME_FORMAT?.DMY,
                                )
                              : ''}
                          </Typography>
                          <Box>
                            {data?.timeRanges?.map((time: any) => (
                              <Typography key={time?._id}>
                                {`${time?.startHour} - ${time?.endHour}`}
                              </Typography>
                            ))}
                          </Box>
                        </Box>
                        {index !== submittedData?.dateOverrides?.length - 1 && (
                          <Grid item xs={12}>
                            <Divider />
                          </Grid>
                        )}
                      </Box>
                    ),
                  )}
                </>
              )}
            </>
          ) : (
            <>
              {submittedData?.dateOverrides?.map((data: any, index: number) => (
                <Box key={data?._id}>
                  <Box
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    gap={2}
                    p={1}
                  >
                    <Typography>
                      {data?.date
                        ? dayjs(data?.overrideDate)?.format(
                            DATE_TIME_FORMAT?.DMY,
                          )
                        : ''}
                    </Typography>
                    <Box>
                      {data?.timeRanges?.map((time: any) => (
                        <Typography key={time?._id}>
                          {`${dayjs(time?.startHour)?.format(
                            TIME_FORMAT?.UI,
                          )} - ${dayjs(time?.endHour)?.format(
                            TIME_FORMAT?.UI,
                          )}`}
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                  {index !== submittedData?.dateOverrides?.length - 1 && (
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                  )}
                </Box>
              ))}
            </>
          )}
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Box display={'flex'} justifyContent={'center'} mt={3}>
            <Button
              onClick={() => setOpenModule(true)}
              startIcon={<AddCircleIcon />}
            >
              Add a date override
            </Button>
          </Box>
        </Box>
      ) : (
        <>
          {!timeSlotsData?.dateOverrides ? (
            <Box
              border={`1.5px solid ${theme?.palette?.custom?.border_grayish_blue}`}
              borderRadius={3}
              mt={1}
              height={460}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
            >
              <Typography width={'310px'}>
                Add dates when your availability changes from your weekly hours
              </Typography>
            </Box>
          ) : (
            <>
              <Box
                border={`1.5px solid ${theme?.palette?.custom?.border_grayish_blue}`}
                borderRadius={3}
                mt={1}
                height={460}
                textAlign={'center'}
              >
                {timeSlotsData?.dateOverrides?.map(
                  (data: any, index: number) => (
                    <Box key={data?._id}>
                      <Box
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        gap={2}
                        p={1}
                      >
                        <Typography>
                          {data?.date
                            ? dayjs(data?.overrideDate)?.format(
                                DATE_TIME_FORMAT?.DMY,
                              )
                            : ''}
                        </Typography>
                        <Box>
                          {data?.timeRanges?.map((time: any) => (
                            <Typography key={time?._id}>
                              {`${time?.startHour} - ${time?.endHour}`}
                            </Typography>
                          ))}
                        </Box>
                      </Box>
                      {index !== submittedData?.dateOverrides?.length - 1 && (
                        <Grid item xs={12}>
                          <Divider />
                        </Grid>
                      )}
                    </Box>
                  ),
                )}
              </Box>
            </>
          )}
        </>
      )}
      <AddDateOverrides
        methods={methods}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        openModule={openModule}
        setOpenModule={setOpenModule}
        setShowData={setShowData}
        control={control}
      />
    </>
  );
};

export default DateOverrides;
