import { Grid, Box, Typography } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';

import {
  dataArray,
  dataArraySelectedReports,
  defaultValues,
  validationSchema,
} from './Email.data';

import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup';
import { v4 as uuidv4 } from 'uuid';
const Email = ({ isOpenDrawer, onClose }: any) => {
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });
  const { handleSubmit, watch } = methods;

  const onSubmit = async () => {
    enqueueSnackbar('Ticket Updated Successfully', {
      variant: 'success',
    });
  };
  const watchFields = watch(['reportsInExport']);

  return (
    <CommonDrawer
      isDrawerOpen={isOpenDrawer}
      onClose={() => onClose(false)}
      title={'Emailthis dashboard'}
      okText={'Send'}
      isOk
      cancelText={'Cancel'}
      footer
      submitHandler={handleSubmit(onSubmit)}
    >
      <Box mt={1}>
        <FormProvider methods={methods}>
          <Grid container spacing={4}>
            {dataArray?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                {item?.componentProps?.heading && (
                  <Typography variant="h5">
                    {item?.componentProps?.heading}
                  </Typography>
                )}
                {item?.componentProps?.name === 'reportsInExport' &&
                watchFields[0] === 'Include selected reports' ? (
                  <Grid item container>
                    <item.component
                      {...item?.componentProps}
                      size={'small'}
                    ></item.component>
                    {dataArraySelectedReports?.map((item: any) => (
                      <Grid item xs={12} key={uuidv4()}>
                        <item.component
                          {...item?.componentProps}
                          size={'small'}
                        >
                          {item?.componentProps?.select &&
                            item?.options?.map((option: any) => (
                              <option value={option?.value} key={uuidv4()}>
                                {option?.label}
                              </option>
                            ))}
                        </item.component>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <item.component {...item?.componentProps} size={'small'}>
                    {item?.componentProps?.select &&
                      item?.options?.map((option: any) => (
                        <option value={option?.value} key={uuidv4()}>
                          {option?.label}
                        </option>
                      ))}
                  </item.component>
                )}
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
};
export default Email;
