import React from 'react';

import { Grid } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';

import {
  defaultValues,
  filtersArray,
  validationSchema,
} from './UsersFilters.data';

import { FormProvider } from '@/components/ReactHookForm';

import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { v4 as uuidv4 } from 'uuid';

const UsersFilters = (props: any) => {
  const { isOpen, setIsOpen } = props;
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async () => {
    setIsOpen(false);
  };
  return (
    <CommonDrawer
      isDrawerOpen={isOpen}
      title="Filters"
      okText="Apply"
      submitHandler={handleSubmit(onSubmit)}
      onClose={() => {
        setIsOpen(false);
      }}
      isOk={true}
      footer
    >
      <FormProvider methods={methods}>
        <Grid container spacing={4} sx={{ mt: '5px' }}>
          {filtersArray?.map((item: any) => (
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

export default UsersFilters;
