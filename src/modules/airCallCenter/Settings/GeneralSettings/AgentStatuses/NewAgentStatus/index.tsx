import React from 'react';
import { Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { NewAgentStatusPropsI } from './NewAgentStatus.interface';
import { newAgentStatusFields } from './NewAgentStatus.data';
import CommonDrawer from '@/components/CommonDrawer';

const NewAgentStatus = ({
  isDrawerOpen,
  onClose,
  handleSubmit,
  formMethods, // isLoading,
}: NewAgentStatusPropsI) => {
  return (
    <CommonDrawer
      isDrawerOpen={isDrawerOpen}
      onClose={onClose}
      title="New Agent Status"
      okText="Create Status"
      isOk={true}
      footer={true}
      submitHandler={handleSubmit}
    >
      <FormProvider methods={formMethods}>
        <Grid container spacing={'22px'}>
          {newAgentStatusFields?.map((item: any) => (
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

export default NewAgentStatus;
