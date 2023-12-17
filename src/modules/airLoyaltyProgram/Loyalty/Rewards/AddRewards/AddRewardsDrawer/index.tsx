import { Grid, Box } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';

import { yupResolver } from '@hookform/resolvers/yup';

import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import {
  addRewardsDrawerData,
  defaultValues,
  validationSchema,
} from './AddRewardsDrawer.data';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export default function AddRewardsdrawer({
  isDrawerOpen,
  onClose,
  actionType,
  initialValueProps = defaultValues,
}: any) {
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValueProps,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async () => {
    enqueueSnackbar('Saved Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    reset();
  };

  return (
    <CommonDrawer
      isDrawerOpen={isDrawerOpen}
      onClose={() => onClose(false)}
      title={'Add Rewards'}
      okText={'Save'}
      isOk
      cancelText={'Close'}
      footer
      submitHandler={handleSubmit(onSubmit)}
    >
      <Box mt={1}>
        <FormProvider methods={methods}>
          <Grid container spacing={4}>
            {addRewardsDrawerData
              ?.filter((fields) => fields?.type?.includes(actionType))
              ?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={item?.id}>
                  <item.component {...item?.componentProps} size={'small'} />
                </Grid>
              ))}
          </Grid>
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
}
