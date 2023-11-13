import CommonDrawer from '@/components/CommonDrawer';
import React from 'react';
import { dataArray, defaultValues } from './UpdateWorkloadTask.data';
import { v4 as uuidv4 } from 'uuid';
import { Box, Grid, Typography } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useUpdateWorkloadTask } from './useUpdateWorkloadTask';

export const UpdateWorkloadTask = ({
  openDrawer,
  onClose,
  initialValueProps = defaultValues,
  data,
}: any) => {
  const { handleSubmit, onSubmit, methods } = useUpdateWorkloadTask({
    onClose,
    initialValueProps,
  });

  return (
    <CommonDrawer
      isDrawerOpen={openDrawer}
      onClose={() => onClose(false)}
      title={`#${data?.extendedProps?.ticketNo}`}
      okText={'Save'}
      isOk
      cancelText={'Cancel'}
      footer
      submitHandler={handleSubmit(onSubmit)}
    >
      <Typography variant={'h4'}>{data?.extendedProps?.description}</Typography>
      <Box mt={1}>
        <FormProvider methods={methods}>
          <Grid container spacing={2}>
            {dataArray?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                <item.component {...item?.componentProps} size={'small'}>
                  {item?.heading}
                  {item?.componentProps?.select &&
                    item?.options?.map((option: any) => (
                      <option key={uuidv4()} value={option?.value}>
                        {option?.label}
                      </option>
                    ))}
                </item.component>
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
};
