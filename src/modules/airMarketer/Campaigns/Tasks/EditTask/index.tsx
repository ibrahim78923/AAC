import { Grid, Box, Typography } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { dataArray, defaultValues } from './EditTask.data';
import useEditTask from './useEditTask';
import { DRAWER_TYPES } from '@/constants/strings';

export default function EditTask({
  onClose,
  isOpenDrawer,
  isType,
  initialValueProps = defaultValues,
  setIsOpenEditTaskDrawer,
  selectedRec,
}: any) {
  const {
    handleSubmit,
    onSubmit,
    methods,
    postTaskLoading,
    updateTaskLoading,
    CAMPAIGN_ID,
  } = useEditTask({
    initialValueProps,
    setIsOpenEditTaskDrawer,
    selectedRec,
    isType,
  });

  return (
    <CommonDrawer
      isDrawerOpen={isOpenDrawer}
      onClose={() => onClose(false)}
      title={isType === DRAWER_TYPES?.ADD ? 'Create Task' : 'Edit Task'}
      okText={isType === DRAWER_TYPES?.ADD ? 'Create' : 'Update'}
      submitHandler={handleSubmit(onSubmit)}
      isLoading={
        isType === DRAWER_TYPES?.ADD ? postTaskLoading : updateTaskLoading
      }
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
                    isType === DRAWER_TYPES?.EDIT
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
