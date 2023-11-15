import React from 'react';

import { Grid } from '@mui/material';

import { FormProvider } from '@/components/ReactHookForm';

import { yupResolver } from '@hookform/resolvers/yup';

import {
  addMembersDataArray,
  addMembersDefaultValues,
  addMembersValidationSchema,
} from './AddMembers.data';

import { AddMembersPropsI } from './AddMembers.interface';

import { v4 as uuidv4 } from 'uuid';

import { useForm } from 'react-hook-form';

const AddMembers = ({ setIsAddMembers }: AddMembersPropsI) => {
  const methodsAddGroup = useForm({
    resolver: yupResolver(addMembersValidationSchema),
    defaultValues: addMembersDefaultValues,
  });

  const onSubmit = () => {};

  const { handleSubmit } = methodsAddGroup;

  const getAddMembersDataArray = addMembersDataArray(setIsAddMembers);

  return (
    <FormProvider methods={methodsAddGroup} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={4}>
        {getAddMembersDataArray?.map((item: any) => (
          <Grid item xs={12} md={item?.md} key={uuidv4()}>
            <item.component
              {...item.componentProps}
              size={'small'}
              options={item?.options}
            >
              {item?.componentProps?.select
                ? item?.options?.map((option: any) => (
                    <option key={option?.value} value={option?.value}>
                      {option?.label}
                    </option>
                  ))
                : null}
            </item.component>
          </Grid>
        ))}
      </Grid>
    </FormProvider>
  );
};

export default AddMembers;
