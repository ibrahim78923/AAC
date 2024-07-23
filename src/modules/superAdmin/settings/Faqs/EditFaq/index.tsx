import React from 'react';
import { Grid } from '@mui/material';
import CommonModal from '@/components/CommonModal';
import { FormProvider } from '@/components/ReactHookForm';
import { EditFaqPropsI } from './EditFaq.interface';
import { editFaqsDataArray } from './EditFaq.data';
import { CommonAPIS } from '@/services/common-APIs';

const EditFaq = ({
  isModalOpen,
  onClose,
  handleSubmit,
  formMethods,
  isLoading,
  title,
  onViewDisabled,
  disabledSubmit,
}: EditFaqPropsI) => {
  const { useLazyGetDropdownProductsQuery }: any = CommonAPIS;
  const products = useLazyGetDropdownProductsQuery();

  return (
    <CommonModal
      open={isModalOpen}
      handleClose={onClose}
      handleCancel={onClose}
      handleSubmit={handleSubmit}
      title={`${title} FAQ`}
      okText="Update"
      footer={title === 'Edit'}
      isLoading={isLoading}
      isSubmitDisabled={disabledSubmit}
    >
      <FormProvider methods={formMethods}>
        <Grid container spacing={4}>
          {editFaqsDataArray(products, onViewDisabled)?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={item?.componentProps?.name}>
              <item.component {...item?.componentProps} size={'small'}>
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
