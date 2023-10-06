import React from 'react';

import { useForm } from 'react-hook-form';

import { v4 as uuidv4 } from 'uuid';

import { Grid } from '@mui/material';

import { FormProvider } from '@/components/ReactHookForm';

import { yupResolver } from '@hookform/resolvers/yup';

import CommonDrawer from '@/components/CommonDrawer';

import { addUsersArray, defaultValues, validationSchema } from './AddUser.data';

const AddUser = (props: any) => {
  const { openAddUserDrawer, setOpenAddUserDrawer } = props;
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async () => {
    setOpenAddUserDrawer(false);
  };

  return (
    <CommonDrawer
      isDrawerOpen={openAddUserDrawer}
      onClose={() => {
        setOpenAddUserDrawer(false);
      }}
      title="Add User"
      okText="Add"
      isOk={true}
      submitHandler={handleSubmit(onSubmit)}
      footer
    >
      <FormProvider methods={methods}>
        <Grid container spacing={4}>
          {addUsersArray?.map((item: any) => (
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
    </CommonDrawer>
  );
};

export default AddUser;
