import React, { useState } from 'react';

import { Grid } from '@mui/material';

import { FormProvider, RHFSelect } from '@/components/ReactHookForm';

import CommonDrawer from '@/components/CommonDrawer';

import {
  addUsersArray,
  defaultValues,
  options,
  validationSchema,
} from './AddUser.data';

import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { v4 as uuidv4 } from 'uuid';

const AddUser = (props: any) => {
  const { isOpenAddUserDrawer, setIsOpenAddUserDrawer } = props;
  const [userType, setUserType] = useState();

  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async () => {
    setIsOpenAddUserDrawer(false);
  };

  return (
    <CommonDrawer
      isDrawerOpen={isOpenAddUserDrawer}
      onClose={() => {
        setIsOpenAddUserDrawer(false);
      }}
      title="Add User"
      okText="Add"
      isOk={true}
      submitHandler={handleSubmit(onSubmit)}
      footer
    >
      <FormProvider methods={methods}>
        <Grid container spacing={4} sx={{ mt: '5px' }}>
          <Grid item xs={12}>
            <RHFSelect
              name="userType"
              label="User Type"
              size={'small'}
              value={userType}
              onChange={(e: any) => setUserType(e.target.value)}
              fullWidth={true}
              select={true}
            >
              {options?.map((option: any) => (
                <option key={uuidv4()} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </RHFSelect>
          </Grid>
          {addUsersArray?.map((item: any) => {
            return (
              item?.toShow?.includes(userType) && (
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
              )
            );
          })}
        </Grid>
      </FormProvider>
    </CommonDrawer>
  );
};

export default AddUser;
