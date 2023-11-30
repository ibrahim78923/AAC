import React from 'react';

import { Grid, Box, Typography } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';

import { FormProvider } from '@/components/ReactHookForm';

import {
  AddAccountArray,
  AddAccountDefaultValues,
  AddAccountValidationSchema,
} from './AddAccount.data';

import { v4 as uuidv4 } from 'uuid';

import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { enqueueSnackbar } from 'notistack';

const AddAccount = (props: any) => {
  const { isOpen, setIsOpen } = props;

  const methods: any = useForm({
    resolver: yupResolver(AddAccountValidationSchema),
    defaultValues: AddAccountDefaultValues,
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
      isDrawerOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
      }}
      title="Add Account"
      okText="Add"
      isOk={true}
      footer
      submitHandler={handleSubmit(onSubmit)}
    >
      <Box mt={1}>
        <FormProvider methods={methods}>
          <Grid container spacing={2}>
            {AddAccountArray?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                <Typography variant="body2" fontWeight={500}>
                  {item?.title}
                </Typography>
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
};

export default AddAccount;
