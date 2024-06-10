import React from 'react';
import { Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';

import CommonDrawer from '@/components/CommonDrawer';
import { addTeamsFields } from './AddTeams.data';
import { AddTeamsPropsI } from './AddTeams.interface';
import { USER_MANAGEMENT_DRAWER_ACTION } from '@/constants/strings';

const AddTeams = ({
  isDrawerOpen,
  onClose,
  handleSubmit,
  formMethods, // isLoading,
  addTeamDrawer,
}: AddTeamsPropsI) => {
  return (
    <CommonDrawer
      isDrawerOpen={isDrawerOpen}
      onClose={onClose}
      title={
        addTeamDrawer
          ? USER_MANAGEMENT_DRAWER_ACTION?.CREATE_TEAM
          : USER_MANAGEMENT_DRAWER_ACTION?.EDIT_TEAM
      }
      okText={
        addTeamDrawer
          ? USER_MANAGEMENT_DRAWER_ACTION?.ADD
          : USER_MANAGEMENT_DRAWER_ACTION?.EDIT
      }
      isOk={true}
      footer={true}
      submitHandler={handleSubmit}
    >
      <FormProvider methods={formMethods}>
        <Grid container spacing={'22px'}>
          {addTeamsFields?.map((item: any) => (
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

export default AddTeams;
