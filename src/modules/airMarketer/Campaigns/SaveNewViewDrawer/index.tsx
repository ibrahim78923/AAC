import { Grid, Box, useTheme, Typography } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';

import { yupResolver } from '@hookform/resolvers/yup';

import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { v4 as uuidv4 } from 'uuid';
import {
  dataArray,
  defaultValues,
  validationSchema,
} from './SaveNewViewDrawer.data';

export default function SaveNewViewDrawer({
  isOpenDrawer,
  onClose,
  initialValueProps = defaultValues,
}: any) {
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValueProps,
  });

  const { handleSubmit } = methods;

  const onSubmit = async () => {
    enqueueSnackbar('Export Campaign Exported Successfully', {
      variant: 'success',
    });
  };
  const theme = useTheme();
  // const { accessValue, handleChangeAccessValue } = useSaveAndNewViewDrawer();
  return (
    <CommonDrawer
      isDrawerOpen={isOpenDrawer}
      onClose={() => onClose(false)}
      title={'Save New View'}
      okText={'Save'}
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
                  <Typography variant="h5">
                    {item?.componentProps?.heading}
                    <Typography
                      component="span"
                      sx={{ color: theme?.palette?.error?.main }}
                    >
                      *
                    </Typography>
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
