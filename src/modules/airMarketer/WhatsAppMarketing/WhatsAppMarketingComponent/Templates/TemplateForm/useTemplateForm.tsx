import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import {
  createTemplateDefaultValues,
  createTemplateValidationSchema,
} from './TemplateForm.data';
import {
  usePostWhatsappTemplateMutation,
  useUpdateWhatsappTemplateMutation,
} from '@/services/airMarketer/whatsappMarketing/templates';
import { enqueueSnackbar } from 'notistack';
import { useEffect } from 'react';
import { TASK_TYPE } from '@/constants';

const useTemplateForm = () => {
  const theme = useTheme();
  const router = useRouter();
  const { type, editData }: any = router?.query;

  let editRecordData = [];
  if (editData) {
    editRecordData = JSON?.parse(editData);
  }

  const methodsNewsAndEventsFilters = useForm({
    resolver: yupResolver(createTemplateValidationSchema),
    defaultValues: createTemplateDefaultValues,
  });

  const { handleSubmit, watch, setValue } = methodsNewsAndEventsFilters;
  const TemplateName = watch('name');
  const Category = watch('category');
  const Details = watch('detail');

  useEffect(() => {
    setValue('name', editRecordData?.name);
    setValue('category', editRecordData?.category);
    setValue('language', editRecordData?.language);
    setValue('detail', editRecordData?.detail);
  }, [editData]);

  const [postWhatsappTemplate, { isLoading: postTemplateLoading }] =
    usePostWhatsappTemplateMutation();

  const [updateWhatsappTemplate, { isLoading: updateTemplateLoading }] =
    useUpdateWhatsappTemplateMutation();

  const onSubmit = async (values: any) => {
    if (type === TASK_TYPE?.EDIT_TASK) {
      delete values.attachment;
    }
    const formData: any = new FormData();
    Object.keys(values).forEach((key: any) => {
      formData.append(key, values[key]);
    });
    try {
      if (type === TASK_TYPE?.EDIT_TASK) {
        await updateWhatsappTemplate({
          id: editRecordData?._id,
          body: formData,
        })?.unwrap();
        enqueueSnackbar('Template updated successfully', {
          variant: 'success',
        });
        router?.back();
      } else {
        await postWhatsappTemplate({ body: formData }).unwrap();
        enqueueSnackbar('Template added successfully', { variant: 'success' });
        router?.back();
      }
    } catch (err: any) {
      enqueueSnackbar(err?.data?.message, { variant: 'error' });
    }
  };

  return {
    router,
    theme,
    methodsNewsAndEventsFilters,
    handleSubmit,
    onSubmit,
    TemplateName,
    postTemplateLoading,
    updateTemplateLoading,
    Category,
    Details,
  };
};

export default useTemplateForm;
