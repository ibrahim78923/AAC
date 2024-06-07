// SetBusinessHours.js
import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  Typography,
  useTheme,
} from '@mui/material';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { styles } from './styles';
import { RHFTimePicker } from '@/components/ReactHookForm';
import PlusSharedIconColor from '@/assets/icons/shared/plus-shared-color';

const SetBusinessHours = () => {
  const { control, watch, setValue } = useFormContext();

  const workingDays = watch('workingDays', []);
  const slots = watch('slots', {});

  const handleDaysChange = (event: any, newDays: any) => {
    setValue('workingDays', newDays);
    newDays.forEach((day: any) => {
      if (!slots[day]) {
        setValue(`slots.${day}`, ['']);
      }
    });
  };

  const addSlot = (day: any) => {
    setValue(`slots.${day}`, [...(slots[day] || []), '']);
  };

  const deleteSlot = (day: any, index: any) => {
    const updatedSlots = slots[day]?.filter((_: any, i: any) => i !== index);
    setValue(`slots.${day}`, updatedSlots);
  };
  const theme = useTheme();
  return (
    <Box>
      <Box sx={styles?.label}>Select The Working Hours</Box>
      <ToggleButtonGroup
        color="primary"
        value={workingDays}
        onChange={handleDaysChange}
        sx={styles?.btnGroup}
      >
        <ToggleButton value="monday">Mon</ToggleButton>
        <ToggleButton value="tuesday">Tue</ToggleButton>
        <ToggleButton value="wednesday">Wed</ToggleButton>
        <ToggleButton value="thursday">Thu</ToggleButton>
        <ToggleButton value="friday">Fri</ToggleButton>
        <ToggleButton value="saturday">Sat</ToggleButton>
        <ToggleButton value="sunday">Sun</ToggleButton>
      </ToggleButtonGroup>

      <Box sx={{ pt: '24px' }}>
        <Box sx={styles?.label}>Enter The Working Hours</Box>
        <Box>
          You can add multiple working hour slots for a day. The gap between two
          slots will be considered as a break.
        </Box>
        <Box
          sx={{
            mt: '24px',

            maxWidth: '600px',
          }}
        >
          {workingDays?.map((day: any) => (
            <Box key={day}>
              {(slots[day] || [])?.map((_: any, index: any) => (
                <Box sx={styles?.slot} key={`${day}`}>
                  <Box sx={styles?.content}>
                    <Box sx={styles?.slotLabel}>
                      {index === 0 ? (
                        <Typography variant="h6">{day}</Typography>
                      ) : (
                        <Typography variant="h6">{''}</Typography>
                      )}
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                      <Box sx={styles?.timeField}>
                        <Controller
                          name={`slots.${day}[${index}].start`}
                          control={control}
                          render={({ field }) => (
                            <RHFTimePicker {...field} size="small" />
                          )}
                        />
                      </Box>
                      <Box sx={styles?.toString}>To</Box>
                      <Box sx={styles?.timeField}>
                        <Controller
                          name={`slots.${day}[${index}].end`}
                          control={control}
                          render={({ field }) => (
                            <RHFTimePicker {...field} size="small" />
                          )}
                        />
                      </Box>
                    </Box>
                  </Box>
                  <Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',

                        gap: '10px',
                      }}
                    >
                      {index > 0 && (
                        <DeleteOutlineIcon
                          onClick={() => deleteSlot(day, index)}
                        />
                      )}
                      {index === (slots[day]?.length || 0) - 1 && (
                        <Button
                          color="inherit"
                          sx={{
                            background: 'transparent',
                            color: theme?.palette?.primary?.main,
                            width: '150px',
                            '&hover': {
                              background: 'inherit',
                              color: theme?.palette?.primary?.main,
                              boxShadow: theme?.shadows[16],
                              borderRadius: '16px',
                              border: '2px solid',
                              transition: {
                                duration: '1s',
                                ease: 'ease-in-out',
                              },
                            },
                          }}
                          startIcon={
                            <PlusSharedIconColor
                              color={theme?.palette?.primary?.main}
                            />
                          }
                          onClick={() => addSlot(day)}
                        >
                          Add More
                        </Button>
                      )}
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default SetBusinessHours;
