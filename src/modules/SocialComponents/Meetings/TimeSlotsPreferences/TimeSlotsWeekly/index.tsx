import React from 'react';
import {
  Box,
  Checkbox,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { Delete, MoreVert } from '@mui/icons-material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { RHFTimePicker } from '@/components/ReactHookForm';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { useTimeSlotsWeekly } from './useTimeSlotsWeekly';
import { timeSlotsWeeklyData } from './TimeSlotWeekly.data';

const TimeSlotsWeekly = () => {
  const { timeSlotsData, theme, fields, remove, addNewField } =
    useTimeSlotsWeekly();

  return (
    <>
      <Box
        border={`1.5px solid ${theme?.palette?.custom?.border_grayish_blue}`}
        borderRadius={3}
        mt={1}
      >
        {timeSlotsWeeklyData?.map((slot: any, index: number) => (
          <Grid container key={slot?._id} py={1.5} gap={1}>
            <Grid item xs={12} display={'flex'} alignItems={'center'} gap={1}>
              <Box display={'flex'} alignItems={'center'} width={'100px'}>
                <Checkbox
                  icon={<CheckboxIcon />}
                  checkedIcon={<CheckboxCheckedIcon />}
                />
                <Typography>{slot?.day}</Typography>
              </Box>
              {fields?.map((item: any, dayIndex: number) => {
                if (item?.dayIndex === index) {
                  return (
                    <Box
                      key={item?._id}
                      display={'flex'}
                      alignItems={'center'}
                      gap={1}
                    >
                      <Box display={'flex'} gap={1}>
                        <RHFTimePicker
                          name={`${slot?.day}-start-${dayIndex}`}
                        />
                        <RHFTimePicker name={`${slot?.day}-end-${dayIndex}`} />
                      </Box>
                      <IconButton onClick={() => remove(dayIndex)}>
                        <Delete />
                      </IconButton>
                    </Box>
                  );
                }
                return null;
              })}
              <Box mr={1} display={'flex'} alignItems={'center'}>
                <IconButton onClick={() => addNewField(index, fields?.length)}>
                  <AddCircleIcon />
                </IconButton>
                <SingleDropdownButton
                  dropdownOptions={timeSlotsData}
                  dropdownName={<MoreVert />}
                  hasEndIcon={false}
                  btnVariant="text"
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
          </Grid>
        ))}
      </Box>
    </>
  );
};

export default TimeSlotsWeekly;
