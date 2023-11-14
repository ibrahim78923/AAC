import React from 'react';
import { Box, MenuItem, Typography, useTheme } from '@mui/material';
import { v4 as uuid4 } from 'uuid';
import { FormProvider } from '@/components/ReactHookForm';
import { useTask } from '../../useTask';
import { matchColumnsData } from '../../Task.data';
import { styles } from '../Import.style';

const StepTwo = () => {
  const theme = useTheme();
  const { head, title } = styles(theme);

  const { stepTwoMethods, stepTwoSubmit, StepTwoHandleSubmit } = useTask();
  return (
    <Box>
      <Typography sx={head}>Match Columns</Typography>
      <FormProvider
        methods={stepTwoMethods}
        handleSubmit={StepTwoHandleSubmit(stepTwoSubmit)}
      >
        {matchColumnsData?.map((obj) => (
          <Box key={uuid4()} my={'24px'}>
            <Typography sx={title}>{obj?.title}</Typography>
            <obj.component
              size={'small'}
              SelectProps={{
                sx: { borderRadius: '8px' },
              }}
              {...obj.componentProps}
            >
              {obj.componentProps.select
                ? obj.options?.map((option) => (
                    <MenuItem key={uuid4()} value={option?.value}>
                      {option?.label}
                    </MenuItem>
                  ))
                : null}
            </obj.component>
          </Box>
        ))}
      </FormProvider>
    </Box>
  );
};

export default StepTwo;
