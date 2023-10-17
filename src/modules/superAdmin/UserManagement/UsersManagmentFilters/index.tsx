import React from 'react';

import { Grid } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';

import {
  usersDefaultValues,
  usersFilterArray,
  usersValidationSchema,
} from '../Users/Users.data';

import {
  rolesDefaultValues,
  rolesFiltersArray,
  rolesValidationSchema,
} from '../RolesAndRights/RoleAndRights.data';

import { FormProvider } from '@/components/ReactHookForm';

import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { v4 as uuidv4 } from 'uuid';

const UsersManagementFilters = (props: any) => {
  const { isOpen, setIsOpen, tabVal } = props;

  const tabsFilter: any = {
    0: {
      schema: usersValidationSchema,
      array: usersFilterArray,
      defaultVal: usersDefaultValues,
    },
    1: {
      schema: usersValidationSchema,
      array: usersFilterArray,
      defaultVal: usersDefaultValues,
    },
    2: {
      schema: rolesValidationSchema,
      array: rolesFiltersArray,
      defaultVal: rolesDefaultValues,
    },
  };

  const methods: any = useForm({
    resolver: yupResolver(tabsFilter[tabVal]?.schema),
    defaultValues: tabsFilter[tabVal]?.defaultVal,
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
          {tabsFilter[tabVal]?.array?.map((item: any) => (
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
          ))}
        </Grid>
      </FormProvider>
    </CommonDrawer>
  );
};

export default UsersManagementFilters;
