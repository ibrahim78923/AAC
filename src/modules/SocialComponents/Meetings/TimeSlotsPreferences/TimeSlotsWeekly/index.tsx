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
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { Permissions } from '@/constants/permissions';

const TimeSlotsWeekly = ({ disabled, theme }: any) => {
  const { timeSlotsData, fields, remove, addNewField, fieldsAdded } =
    useTimeSlotsWeekly();

  return (
    <>
      <Typography variant="h3">Weekly Hours</Typography>
      {disabled === false ? (
        <Box
          border={`1.5px solid ${theme?.palette?.custom?.border_grayish_blue}`}
          borderRadius={3}
          mt={1}
        >
          {timeSlotsWeeklyData?.map((slot: any, index: number) => (
            <Grid
              container
              key={slot?._id}
              py={1.5}
              gap={1}
              alignItems={'center'}
              flexWrap={'wrap'}
            >
              <Grid item xs={2} display={'flex'} alignItems={'center'} gap={1}>
                <Checkbox
                  icon={<CheckboxIcon />}
                  checkedIcon={<CheckboxCheckedIcon />}
                />
                <Typography>{slot?.day}</Typography>
              </Grid>
              {fieldsAdded?.has(index) ? (
                <Grid item xs={12} lg={7.5}>
                  {fields
                    ?.filter((item: any) => item?.dayIndex === index)
                    ?.map((item: any, dayIndex: any) => (
                      <Grid
                        key={item?._id}
                        display="flex"
                        alignItems="center"
                        gap={1}
                      >
                        <Box display="flex" gap={1}>
                          <RHFTimePicker
                            name={`${slot?.day}-start-${dayIndex}`}
                          />
                          <RHFTimePicker
                            name={`${slot?.day}-end-${dayIndex}`}
                          />
                        </Box>
                        <IconButton onClick={() => remove(index)}>
                          <Delete />
                        </IconButton>
                      </Grid>
                    ))}
                </Grid>
              ) : (
                <Grid item lg={7} xs={9} textAlign={'center'}>
                  <Typography>Unavailable</Typography>
                </Grid>
              )}
              <Grid item xs={12} lg={2}>
                <IconButton onClick={() => addNewField(index, fields?.length)}>
                  <AddCircleIcon />
                </IconButton>
                <PermissionsGuard
                  permissions={Permissions?.SOCIAL_COMPONENTS_EMAIL}
                >
                  <SingleDropdownButton
                    dropdownOptions={timeSlotsData}
                    dropdownName={<MoreVert />}
                    hasEndIcon={false}
                    btnVariant="text"
                  />
                </PermissionsGuard>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </Grid>
          ))}
        </Box>
      ) : (
        <Box
          border={`1.5px solid ${theme?.palette?.custom?.border_grayish_blue}`}
          borderRadius={3}
          mt={1}
        >
          {timeSlotsWeeklyData?.map((slot: any) => (
            <Grid
              container
              key={slot?._id}
              py={1.5}
              gap={1}
              alignItems={'center'}
            >
              <Grid item xs={2} width={'100px'} pl={2}>
                <Typography>{slot?.day}</Typography>
              </Grid>
              <Grid item lg={7.5} xs={9} textAlign={'center'}>
                <Typography>Unavailable</Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </Grid>
          ))}
        </Box>
      )}
    </>
  );
};

export default TimeSlotsWeekly;
