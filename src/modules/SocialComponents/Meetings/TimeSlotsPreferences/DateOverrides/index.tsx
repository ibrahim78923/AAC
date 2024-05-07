import React from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import AddDateOverrides from '../AddDateOverrides';
import { useDateOverrides } from './useDateOverrides';
import { dateData } from './DateOverrides.data';

const DateOverrides = (props: any) => {
  const { theme, disabled } = props;
  const {
    openModule,
    setOpenModule,
    fields,
    remove,
    addDateOverride,
    showData,
    setShowData,
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
            <Typography p={3}>
              Add dates when your availability changes from your weekly
              hours....
            </Typography>
          ) : (
            <>
              {dateData?.map((ele: any, index: number) => (
                <React.Fragment key={ele?._id}>
                  <Box
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    gap={2}
                    p={1}
                  >
                    <Typography>{ele?.date}</Typography>
                    <Box>
                      {ele?.times?.map((time: any) => (
                        <Typography key={time?._id}>{time}</Typography>
                      ))}
                    </Box>
                  </Box>
                  {index !== dateData?.length - 1 && (
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                  )}
                </React.Fragment>
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
            Add dates when your availability changes from your weekly hours....
          </Typography>
        </Box>
      )}
      <AddDateOverrides
        openModule={openModule}
        setOpenModule={setOpenModule}
        remove={remove}
        fields={fields}
        addDateOverride={addDateOverride}
        setShowData={setShowData}
      />
    </>
  );
};

export default DateOverrides;
