import React from 'react';
import { Grid } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { EditJobPostPropsI } from './EditJobPost.interface';
import { jobPostingDataArray } from './EditJobPost.data';
import { v4 as uuidv4 } from 'uuid';

const EditJobPost = ({
  isModalOpen,
  onClose,
  handleSubmit,
  formMethods,
  isLoading,
  title,
  isFieldsDisabled,
}: EditJobPostPropsI) => {
  return (
    <CommonDrawer
      isDrawerOpen={isModalOpen}
      onClose={onClose}
      title={`${title} Job`}
      okText="Update"
      isOk={true}
      footer={true}
      submitHandler={handleSubmit}
      isLoading={isLoading}
    >
      <>
        <FormProvider methods={formMethods}>
          <Grid container spacing={4}>
            {jobPostingDataArray(isFieldsDisabled)?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
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
      </>
    </CommonDrawer>
  );
};

export default EditJobPost;
