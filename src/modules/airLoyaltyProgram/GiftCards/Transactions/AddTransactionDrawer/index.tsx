import CommonDrawer from '@/components/CommonDrawer';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import {
  addTransactionDrawerData,
  defaultValues,
  validationSchema,
} from './AddTranscationDrawer.data';
import { FormProvider } from '@/components/ReactHookForm';

export const AddTransactionDrawer = ({ openDrawer, setOpenDrawer }: any) => {
  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer);
  };
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });
  const { handleSubmit, reset } = methods;
  const onSubmit = async () => {
    enqueueSnackbar('Saved Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    reset();
  };
  return (
    <Box>
      <CommonDrawer
        isDrawerOpen={openDrawer}
        onClose={handleOpenDrawer}
        title={'Add Transcation'}
        okText={'Create'}
        isOk
        cancelText={'Cancel'}
        footer
        submitHandler={handleSubmit(onSubmit)}
      >
        <Box>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              {addTransactionDrawerData?.map((item) => (
                <Grid item xs={12} md={item?.md} key={item?.id}>
                  <item.component {...item?.componentProps} size={'small'} />
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </Box>
  );
};
