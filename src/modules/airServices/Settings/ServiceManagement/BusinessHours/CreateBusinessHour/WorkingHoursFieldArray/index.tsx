import { Box } from '@mui/material';
import { RHFTimePicker } from '@/components/ReactHookForm';
import { CopyPrimaryColorIcon, TrashIcon } from '@/assets/icons';
import { useFieldArray } from 'react-hook-form';
import { CustomGrid } from '@/components/Grids/CustomGrid';
import { ARRAY_INDEX } from '@/constants/strings';

export const WorkingHoursFieldArray = ({ control, name }: any) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <>
      <Box
        p={{ sm: 2.5, xs: 1 }}
        borderRadius={2}
        border="0.06rem solid"
        borderColor="custom.light_grayish_blue"
        bgcolor="primary.lighter"
        mb={2}
      >
        {fields?.map((item, index) => (
          <CustomGrid
            key={item?.id}
            isContainer
            customStyles={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
            spacing={1}
          >
            <CustomGrid sm={5}>
              <RHFTimePicker
                name={`${name}.${index}.startTime`}
                size="small"
                ampm={false}
              />
            </CustomGrid>
            <CustomGrid sm={1}>to</CustomGrid>
            <CustomGrid sm={5}>
              <RHFTimePicker
                name={`${name}.${index}.endTime`}
                size="small"
                ampm={false}
              />
            </CustomGrid>
            <CustomGrid xs={1}>
              {index === ARRAY_INDEX?.ZERO ? (
                <Box
                  sx={{ cursor: 'pointer' }}
                  onClick={() => append({ startTime: null, endTime: null })}
                >
                  <CopyPrimaryColorIcon />
                </Box>
              ) : (
                <Box sx={{ cursor: 'pointer' }} onClick={() => remove(index)}>
                  <TrashIcon />
                </Box>
              )}
            </CustomGrid>
          </CustomGrid>
        ))}
      </Box>
    </>
  );
};
