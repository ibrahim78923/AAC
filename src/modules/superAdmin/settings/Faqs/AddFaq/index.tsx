import React from 'react';

import { Grid } from '@mui/material';

import CommonModal from '@/components/CommonModal';

import { FormProvider } from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';

import { AddFaqPropsI } from './AddFaq.interface';

import {
  addFaqsDefaultValues,
  addFaqsFiltersDataArray,
  addFaqsValidationSchema,
} from './AddFaq.data';

import { yupResolver } from '@hookform/resolvers/yup';

import { v4 as uuidv4 } from 'uuid';

const AddFaq = ({ isAddModalOpen, setIsAddModalOpen }: AddFaqPropsI) => {
  const methodsAddFaqs = useForm({
    resolver: yupResolver(addFaqsValidationSchema),
    defaultValues: addFaqsDefaultValues,
  });

  const onSubmit = () => {
    setIsAddModalOpen(false);
  };
  const { handleSubmit } = methodsAddFaqs;

  return (
    <CommonModal
      open={isAddModalOpen}
      handleClose={() => setIsAddModalOpen(false)}
      handleSubmit={() => setIsAddModalOpen(false)}
      title="Add a new feature"
      okText="add"
      footer={true}
    >
      <>
        <FormProvider
          methods={methodsAddFaqs}
          onSubmit={handleSubmit(onSubmit)}
        >
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
