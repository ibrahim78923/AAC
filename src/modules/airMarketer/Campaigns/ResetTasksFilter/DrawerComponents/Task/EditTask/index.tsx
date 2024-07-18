import { Grid, Box, Typography } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { dataArray, defaultValues } from './EditTask.data';
import useEditTask from './useEditTask';
import { DRAWER_TYPES } from '@/constants/strings';

export default function EditTask({
  initialValueProps = defaultValues,
  setIsOpenEditTaskDrawer,
  isOpenDrawer,
  selectedRec,
  onClose,
  type,
}: any) {
  const { updateTaskLoading, handleSubmit, CAMPAIGN_ID, onSubmit, methods } =
    useEditTask({
      setIsOpenEditTaskDrawer,
      initialValueProps,
      selectedRec,
    });

  return (
    <CommonDrawer
      isDrawerOpen={isOpenDrawer}
      onClose={() => onClose(false)}
      title={'Edit Task'}
      okText={'Update'}
      submitHandler={handleSubmit(onSubmit)}
      isLoading={updateTaskLoading}
      cancelText={'Cancel'}
      footer
      isOk
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
                <item.component
                  disabled={
                    item?.componentProps?.name === CAMPAIGN_ID &&
                    type === DRAWER_TYPES?.EDIT
                  }
                  {...item?.componentProps}
                  size={'small'}
                >
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
