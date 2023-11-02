import { Grid } from '@mui/material';

import { FormProvider } from '@/components/ReactHookForm';

import CommonDrawer from '@/components/CommonDrawer';

import {
  usersFilterArray,
  defaultValues,
  userFilterValSchema,
} from './FilterUser.data';

import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { v4 as uuidv4 } from 'uuid';

import { enqueueSnackbar } from 'notistack';

const FilterUser = ({ isOpenDrawer, onClose }: any) => {
  const methods: any = useForm({
    resolver: yupResolver(userFilterValSchema),
    defaultValues: defaultValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async () => {
    enqueueSnackbar('User Added Successfully', {
      variant: 'success',
    });
    reset();
  };

  return (
    <CommonDrawer
      isDrawerOpen={isOpenDrawer}
      onClose={onClose}
      title="Filters"
      okText="Apply"
      isOk={true}
      submitHandler={handleSubmit(onSubmit)}
      footer
    >
      <FormProvider methods={methods}>
        <Grid container spacing={4} sx={{ my: '5px' }}>
          {usersFilterArray?.map((item: any) => {
            return (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                <item.component {...item.componentProps} size={'small'}>
                  {item?.componentProps?.select &&
                    item?.options?.map((option: any) => (
                      <option key={uuidv4()} value={option?.value}>
                        {option?.label}
                      </option>
                    ))}
                </item.component>
              </Grid>
            );
          })}
        </Grid>
      </FormProvider>
    </CommonDrawer>
  );
};

export default FilterUser;
