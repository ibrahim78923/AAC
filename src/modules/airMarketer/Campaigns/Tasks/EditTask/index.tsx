import { Grid, Box, Typography } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { dataArray, defaultValues } from './EditTask.data';
import useEditTask from './useEditTask';

export default function EditTask({
  onClose,
  isOpenDrawer,
  isType,
  initialValueProps = defaultValues,
}: any) {
  const { handleSubmit, onSubmit, methods } = useEditTask(initialValueProps);

  return (
    <CommonDrawer
      isDrawerOpen={isOpenDrawer}
      onClose={() => onClose(false)}
      title={isType === 'add' ? 'Create Task' : 'Edit Task'}
      okText={isType === 'add' ? 'Create' : 'Update'}
      isOk
      cancelText={'Cancel'}
      footer
      submitHandler={handleSubmit(onSubmit)}
    >
      <Box mt={1}>
        <FormProvider methods={methods}>
          <Grid container spacing={2}>
            {dataArray()?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={item?.componentProps?.name}>
                {item?.componentProps?.heading && (
                  <Typography variant={item?.variant}>
                    {item?.componentProps?.heading}
                  </Typography>
                )}
                <item.component {...item?.componentProps} size={'small'}>
                  {item?.componentProps?.select &&
                    item?.options?.map((option: any) => (
                      <option key={option?.value} value={option?.value}>
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
}
