import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { RHFDropZone } from '@/components/ReactHookForm';
import { FormProvider } from '@/components/ReactHookForm';
import { useTask } from '../../useTask';
import { styles } from '../Import.style';

const StepOne = () => {
  const { head, desc, list_ul, sampleFile, import_step1 } = styles(useTheme());
  const { stepOneSubmit, StepOneHandleSubmit, stepOneMethods } = useTask();

  const list = ['task name', 'task status', 'task type', 'last date'];

  return (
    <Box sx={import_step1}>
      <Typography sx={head}>Instructions</Typography>
      <Typography sx={desc}>
        Please ensure that your file contain following columns
      </Typography>
      <Typography component={'ul'} sx={list_ul}>
        {list.map((text) => (
          <Typography component={'li'} key={text}>
            {text}
          </Typography>
        ))}
      </Typography>
      <Typography sx={sampleFile}>See Sample File</Typography>
      <FormProvider
        methods={stepOneMethods}
        onSubmit={StepOneHandleSubmit(stepOneSubmit)}
      >
        <RHFDropZone name={'multipleFileDropZone'} />
      </FormProvider>
    </Box>
  );
};

export default StepOne;
