import React from 'react';
import { Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { AddUserPropsI } from './AddUser.interface';
import { addUserFields } from './AddUser.data';
import CommonDrawer from '@/components/CommonDrawer';
import { USER_MANAGEMENT_DRAWER_ACTION } from '@/constants/strings';

const AddUser = ({
  isDrawerOpen,
  onClose,
  handleSubmit,
  formMethods, // isLoading,
  isViewed,
}: AddUserPropsI) => {
  return (
    <CommonDrawer
      isDrawerOpen={isDrawerOpen}
      onClose={onClose}
      title={
        isViewed
          ? USER_MANAGEMENT_DRAWER_ACTION?.VIEW_USER
          : USER_MANAGEMENT_DRAWER_ACTION?.ADD_USER
      }
      okText={'Add'}
      isOk={true}
      footer={isViewed ? false : true}
      submitHandler={handleSubmit}
    >
      <FormProvider methods={formMethods}>
        <Grid container spacing={'22px'}>
          {addUserFields?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={item?.id}>
              <item.component
                {...item.componentProps}
                size={'small'}
                disabled={isViewed ? true : false}
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
    </CommonDrawer>
  );
};

export default AddUser;
