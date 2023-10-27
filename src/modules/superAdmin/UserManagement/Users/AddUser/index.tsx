import React, { useState } from 'react';

import { Grid, Typography } from '@mui/material';

import { FormProvider, RHFSelect } from '@/components/ReactHookForm';

import CommonDrawer from '@/components/CommonDrawer';

import {
  addUsersArray,
  superAdminDefaultValues,
  companyOwnerDefaultValues,
  options,
  superAdminValidationSchema,
  CompanyOwnerValidationSchema,
} from './AddUser.data';

import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { v4 as uuidv4 } from 'uuid';

import { enqueueSnackbar } from 'notistack';

const AddUser = ({ isOpenDrawer, onClose }: any) => {
  const [userType, setUserType] = useState();
  const superAdminMethods: any = useForm({
    resolver: yupResolver(superAdminValidationSchema),
    defaultValues: superAdminDefaultValues,
  });
  const companyOwnerMethods: any = useForm({
    resolver: yupResolver(CompanyOwnerValidationSchema),
    defaultValues: companyOwnerDefaultValues,
  });
  const methods =
    userType === 'SuperAdmin' ? superAdminMethods : companyOwnerMethods;
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
      title="Add User"
      okText="Add"
      isOk={true}
      submitHandler={handleSubmit(onSubmit)}
      footer
    >
      <FormProvider methods={methods}>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12}>
            <Typography variant="body2" fontWeight={500}>
              User Type
            </Typography>
            <RHFSelect
              name="userType"
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
                  <Typography variant="body2" fontWeight={500}>
                    {item?.title}
                  </Typography>
                  {item?.componentProps?.heading && (
                    <Typography variant="h5">
                      {item?.componentProps?.heading}
                    </Typography>
                  )}
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
