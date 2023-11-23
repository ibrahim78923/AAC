import React from 'react';
import { Grid } from '@mui/material';
import CommonModal from '@/components/CommonModal';
import { FormProvider } from '@/components/ReactHookForm';
import { AddFaqPropsI } from './AddFaq.interface';
import { addFaqsFiltersDataArray } from './AddFaq.data';
import { v4 as uuidv4 } from 'uuid';

const AddFaq = ({
  isAddModalOpen,
  onClose,
  handleSubmit,
  formMethods,
  isLoading,
}: AddFaqPropsI) => {
  return (
    <CommonModal
      open={isAddModalOpen}
      handleClose={onClose}
      handleSubmit={handleSubmit}
      title={'Add a New FAQ'}
      okText="Add"
      footer={true}
      isLoading={isLoading}
    >
      <>
        <FormProvider methods={formMethods}>
          <Grid container spacing={4}>
            {addFaqsFiltersDataArray?.map((item: any) => (
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
    </CommonModal>
  );
};

export default AddFaq;
