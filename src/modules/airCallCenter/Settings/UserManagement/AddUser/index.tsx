import React from 'react';
import { Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { AddUserPropsI } from './AddUser.interface';
import { addUserFields } from './AddUser.data';
import CommonDrawer from '@/components/CommonDrawer';

const AddUser = ({
  isDrawerOpen,
  onClose,
  handleSubmit,
  formMethods,
  // isLoading,
}: AddUserPropsI) => {
  return (
    <CommonDrawer
      isDrawerOpen={isDrawerOpen}
      onClose={onClose}
      title="Add User"
      okText="Add"
      isOk={true}
      footer={true}
      submitHandler={handleSubmit}
    >
      <FormProvider methods={formMethods}>
        <Grid container spacing={'22px'}>
          {addUserFields?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={item?.id}>
              <item.component {...item.componentProps} size={'small'}>
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
    </CommonDrawer>
  );
};

export default AddUser;
