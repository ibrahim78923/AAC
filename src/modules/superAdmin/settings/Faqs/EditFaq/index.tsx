import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import CommonModal from '@/components/CommonModal';
import { FormProvider } from '@/components/ReactHookForm';
import { EditFaqPropsI } from './EditFaq.interface';
import {
  editFaqsDataArray,
  editFaqsValidationSchema,
  editFaqsDefaultValues,
} from './EditFaq.data';
import { v4 as uuidv4 } from 'uuid';
import {
  useGetFaqsByIdQuery,
  useUpdateFaqsMutation,
} from '@/services/superAdmin/settings/faqs';

const EditFaq = ({ isModalOpen, onClose, rowId }: EditFaqPropsI) => {
  const [initValues, setInitValues]: any = useState(editFaqsDefaultValues);
  const { data: faqDataById } = useGetFaqsByIdQuery(rowId);

  useEffect(() => {
    if (faqDataById && faqDataById?.data) {
      const { faqCategory, faqQuestion, faqAnswer } = faqDataById?.data;
      setInitValues({
        faqCategory: faqCategory,
        faqQuestion: faqQuestion,
        faqAnswer: faqAnswer,
      });
    }
  }, [faqDataById, rowId]);

  const [updateFaq, { isLoading: loadingUpdateFaq }] = useUpdateFaqsMutation();
  const methods = useForm({
    resolver: yupResolver(editFaqsValidationSchema),
    defaultValues: editFaqsDefaultValues,
  });
  useEffect(() => {
    if (initValues) {
      methods.setValue('faqCategory', initValues?.faqCategory);
      methods.setValue('faqQuestion', initValues?.faqQuestion);
      methods.setValue('faqAnswer', initValues?.faqAnswer);
    }
  }, [initValues, methods]);

  const { handleSubmit } = methods;

  const onSubmitEditJob = async (values: any) => {
    try {
      await updateFaq({ id: rowId, body: values })?.unwrap();
      onClose();
      enqueueSnackbar('FAQ updated successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };
  const handleSubmitUpdateFaq = handleSubmit(onSubmitEditJob);
  return (
    <CommonModal
      open={isModalOpen}
      handleClose={onClose}
      handleSubmit={handleSubmitUpdateFaq}
      title={'Edit FAQ'}
      okText="Update"
      footer={true}
      isLoading={loadingUpdateFaq}
    >
      <FormProvider methods={methods}>
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
