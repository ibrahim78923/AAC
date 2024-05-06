import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import AddDateOverrides from '../AddDateOverrides';
import { useDateOverrides } from './useDateOverrides';
import dayjs from 'dayjs';
import { DATE_TIME_FORMAT, TIME_FORMAT } from '@/constants';

const DateOverrides = (props: any) => {
  const { theme, disabled } = props;
  const {
    openModule,
    setOpenModule,
    showData,
    setShowData,
    methods,
    handleSubmit,
    onSubmit,
    submittedData,
  } = useDateOverrides();
  return (
    <>
      <Typography variant="h3">Date Overrides</Typography>
      {disabled === false ? (
        <Box
          border={`1.5px solid ${theme?.palette?.custom?.border_grayish_blue}`}
          borderRadius={3}
          mt={1}
          height={460}
          textAlign={'center'}
        >
          {showData === false ? (
            <Typography p={3} textAlign={'center'}>
              Add dates when your availability changes from your weekly hours
            </Typography>
          ) : (
            <>
              {submittedData && (
                <Box>
                  <Box
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    gap={2}
                    p={1}
                  >
                    <Typography>
                      {submittedData?.overrideDate
                        ? dayjs(submittedData?.overrideDate)?.format(
                            DATE_TIME_FORMAT?.DMY,
                          )
                        : ''}
                    </Typography>
                    <Box>
                      {submittedData?.overrides?.map((time: any) => (
                        <Typography key={time?._id}>
                          {`${dayjs(time?.start)?.format(
                            TIME_FORMAT?.UI,
                          )} - ${dayjs(time?.end)?.format(TIME_FORMAT?.UI)}`}
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                </Box>
              )}
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
      )}
      <AddDateOverrides
        methods={methods}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        openModule={openModule}
        setOpenModule={setOpenModule}
        setShowData={setShowData}
      />
    </>
  );
};

export default DateOverrides;
