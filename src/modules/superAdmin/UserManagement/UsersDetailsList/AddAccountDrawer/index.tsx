import React from 'react';

import { Grid, Box } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';

import { FormProvider } from '@/components/ReactHookForm';

import {
  AddAccountArray,
  AddAccountDefaultValues,
  AddAccountValidationSchema,
} from './AddAccountDrawer.data';

import { v4 as uuidv4 } from 'uuid';

import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

const AddAccountDrawer = (props: any) => {
  const { isOpen, setIsOpen } = props;

  const methods: any = useForm({
    resolver: yupResolver(AddAccountValidationSchema),
    defaultValues: AddAccountDefaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async () => {
    alert('values here');
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
          <Grid container spacing={4}>
            {AddAccountArray?.map((item: any) => (
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
};

export default AddAccountDrawer;
