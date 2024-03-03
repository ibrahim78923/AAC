import React from 'react';
import { Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { EditAgentStatusPropsI } from './EditAgentStatus.interface';
import { editAgentStatusFields } from './EditAgentStatus.data';
import CommonDrawer from '@/components/CommonDrawer';

const EditAgentStatus = ({
  isDrawerOpen,
  onClose,
  handleSubmit,
  formMethods, // isLoading,
}: EditAgentStatusPropsI) => {
  return (
    <CommonDrawer
      isDrawerOpen={isDrawerOpen}
      onClose={onClose}
      title="Edit Agent Status"
      okText="Save"
      isOk={true}
      footer={true}
      submitHandler={handleSubmit}
    >
      <FormProvider methods={formMethods}>
        <Grid container spacing={'22px'}>
          {editAgentStatusFields?.map((item: any) => (
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

export default EditAgentStatus;
