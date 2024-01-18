import { Grid, Box, Typography } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';

import { dataArray, defaultValues, validationSchema } from './EditTask.data';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { v4 as uuidv4 } from 'uuid';

export default function EditTask({
  onClose,
  isOpenDrawer,
  initialValueProps = defaultValues,
}: any) {
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValueProps,
  });

  const { handleSubmit } = methods;

  const onSubmit = async () => {
    enqueueSnackbar('Task Updated Successfully', {
      variant: 'success',
    });
  };

  return (
    <CommonDrawer
      isDrawerOpen={isOpenDrawer?.isToggle}
      onClose={() => onClose(false)}
      title={isOpenDrawer?.type === 'create' ? 'Create Task' : 'Edit Task'}
      okText={isOpenDrawer?.type === 'create' ? 'Create' : 'Update'}
      isOk
      cancelText={'Cancel'}
      footer
      submitHandler={handleSubmit(onSubmit)}
    >
      <Box mt={1}>
        <FormProvider methods={methods}>
          <Grid container spacing={2}>
            {dataArray()?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                {item?.componentProps?.heading && (
                  <Typography variant={item?.variant}>
                    {item?.componentProps?.heading}
                  </Typography>
                )}
                <item.component {...item?.componentProps} size={'small'}>
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
}
