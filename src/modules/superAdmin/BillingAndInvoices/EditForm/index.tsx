import CommonDrawer from '@/components/CommonDrawer';

// import { FormProvider } from '@/components/ReactHookForm';

import { Grid, Box } from '@mui/material';

import { useForm } from 'react-hook-form';

import { dataArray, defaultValues, validationSchema } from './EditForm.data';

import { yupResolver } from '@hookform/resolvers/yup';

import { v4 as uuidv4 } from 'uuid';

import { enqueueSnackbar } from 'notistack';
import { FormProvider } from '@/components/ReactHookForm';

export default function EditForm({
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
    // console.log(data);

    // try {

    //   const res: any = await onSubmitHandler(data).unwrap();

    enqueueSnackbar('Ticket Updated Successfully', {
      variant: 'success',
    });

    // } catch (error: any) {

    //   const errMsg = error?.data?.message;

    //   enqueueSnackbar(errMsg ?? "Something Went Wrong!", { variant: "error" });

    // }
  };

  return (
    <CommonDrawer
      isDrawerOpen={isOpenDrawer}
      onClose={() => onClose(false)}
      title={'Edit Ticket'}
      okText={'Update Ticket'}
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
                <item.component {...item.componentProps} size={'small'}>
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
