import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { styles } from './styles';
import PlusShared from '@/assets/icons/shared/plus-shared';
import { RHFTimePicker } from '@/components/ReactHookForm';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const Slot = ({ value }: any) => {
  type SlotsType = {
    [key: string]: string[];
  };

  const [slots, setSlots] = useState<SlotsType>(() => {
    const savedSlots = localStorage?.getItem('workingSlots');
    return savedSlots ? JSON?.parse(savedSlots) : {};
  });

  const handleAddMore = (day: string) => {
    setSlots((prevSlots: SlotsType) => {
      const updatedSlots = {
        ...prevSlots,
        [day]: [...(prevSlots[day] || []), ''],
      };
      localStorage?.setItem('workingSlots', JSON.stringify(updatedSlots));
      return updatedSlots;
    });
  };

  const handleDelete = (day: string, index: number) => {
    setSlots((prevSlots: SlotsType) => {
      const updatedSlots = {
        ...prevSlots,
        [day]: prevSlots[day]?.filter((slot, i) => i !== index),
      };
      localStorage?.setItem('workingSlots', JSON.stringify(updatedSlots));
      return updatedSlots;
    });
  };

  useEffect(() => {
    setSlots((prevSlots: SlotsType) => {
      const newSlots = { ...prevSlots };
      const valueSet = new Set(value);
      for (const day in newSlots) {
        if (!valueSet?.has(day)) {
          delete newSlots[day];
        }
      }
      value.forEach((day: any) => {
        if (!newSlots[day]) {
          newSlots[day] = [''];
        }
      });
      localStorage?.setItem('workingSlots', JSON?.stringify(newSlots));
      return newSlots;
    });
  }, [value]);

  return (
    <>
      {Object?.keys(slots)?.map((day) => (
        <div key={day}>
          {slots[day]?.map((item: any, index: any) => (
            <Box sx={styles?.slot} key={`${day}-${item}`}>
              <Box sx={styles?.content}>
                <Box sx={styles?.slotLabel}>
                  {index === 0 ? (
                    <Typography variant="h6">{day}</Typography>
                  ) : (
                    <Typography variant="h6">{''}</Typography>
                  )}
                </Box>
                <Box>
                  <Box sx={{ display: 'flex' }}>
                    <Box sx={styles?.timeField}>
                      <RHFTimePicker
                        name={`timeStart-${day}-${index}`}
                        size="small"
                      />
                    </Box>
                    <Box sx={styles?.toString}>To</Box>
                    <Box sx={styles?.timeField}>
                      <RHFTimePicker
                        name={`timeEnd-${day}-${index}`}
                        size="small"
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    width: '200px',
                    gap: '10px',
                    padding: '0px 20px',
                    alignItems: 'center',
                  }}
                >
                  {index > 0 ? (
                    <DeleteOutlineIcon
                      onClick={() => handleDelete(day, index)}
                    />
                  ) : null}
                  {index === slots[day]?.length - 1 && (
                    <Button
                      variant="outlined"
                      className="small"
                      startIcon={<PlusShared />}
                      onClick={() => handleAddMore(day)}
                    >
                      Add More
                    </Button>
                  )}
                </Box>
              </Box>
            </Box>
          ))}
        </div>
      ))}
    </>
  );
};

export default Slot;
