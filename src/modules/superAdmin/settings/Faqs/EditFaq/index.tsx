import React from 'react';
import { Grid } from '@mui/material';
import CommonModal from '@/components/CommonModal';
import { FormProvider } from '@/components/ReactHookForm';
import { EditFaqPropsI } from './EditFaq.interface';
import { editFaqsDataArray } from './EditFaq.data';
import { v4 as uuidv4 } from 'uuid';

const EditFaq = ({
  title,
  isModalOpen,
  onClose,
  handleSubmit,
  formMethods,
  isLoading,
}: EditFaqPropsI) => {
  return (
    <CommonModal
      open={isModalOpen}
      handleClose={onClose}
      handleSubmit={handleSubmit}
      title={title}
      okText="Update"
      footer={true}
      isLoading={isLoading}
    >
      <FormProvider methods={formMethods}>
        <Grid container spacing={4}>
          {editFaqsDataArray?.map((item: any) => (
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
    </CommonModal>
  );
};

export default EditFaq;
