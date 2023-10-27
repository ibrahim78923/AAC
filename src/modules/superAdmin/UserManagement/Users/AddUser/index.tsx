import React, { useState } from 'react';

import { Box, Grid, InputAdornment, Typography } from '@mui/material';

import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';

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
import { EraserIcon } from '@/assets/icons';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import useToggle from '@/hooks/useToggle';

const AddUser = ({ isOpenDrawer, onClose }: any) => {
  const [userType, setUserType] = useState();
  const [isToggled, toggle] = useToggle(false);
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
                  {item?.componentProps?.name === 'address' && (
                    <Box
                      sx={{
                        backgroundColor: '',
                        position: 'relative',
                        right: 0,
                      }}
                    >
                      <InputAdornment
                        sx={{
                          position: 'absolute',
                          top: 20,
                          right: 15,
                          zIndex: 9999,
                        }}
                        position="end"
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            gap: '10px',
                            alignItems: 'center',
                          }}
                        >
                          <EraserIcon />
                          <BorderColorIcon
                            onClick={() => {
                              toggle(true);
                            }}
                            sx={{ cursor: 'pointer', fontSize: '20px' }}
                          />
                        </Box>
                      </InputAdornment>
                    </Box>
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

        {isToggled && (
          <Grid container spacing={2} sx={{ paddingTop: '1rem' }}>
            <Grid item xs={12}>
              <RHFTextField
                name="unit"
                label="Flat/Unit"
                fullWidth={true}
                select={false}
              />
            </Grid>
            <Grid item xs={12}>
              <RHFTextField
                name="buildingName"
                label="Building Name"
                fullWidth={true}
                select={false}
              />
            </Grid>
            <Grid item xs={12}>
              <RHFTextField
                name="buildingNumber"
                label="Building Number"
                fullWidth={true}
                select={false}
              />
            </Grid>
            <Grid item xs={12}>
              <RHFTextField
                name="streetName"
                label="Street Name"
                fullWidth={true}
                select={false}
              />
            </Grid>
            <Grid item xs={12}>
              <RHFTextField
                name="city"
                label="Town/City"
                fullWidth={true}
                select={false}
              />
            </Grid>
            <Grid item xs={12}>
              <RHFSelect
                name="country"
                label="Country"
                fullWidth={true}
                select={true}
                options={[
                  { value: 'United Kingdom', label: 'United Kingdom' },
                  { value: 'United Kingdom', label: 'United Kingdom' },
                ]}
              />
            </Grid>
          </Grid>
        )}
      </FormProvider>
    </CommonDrawer>
  );
};

export default AddUser;
