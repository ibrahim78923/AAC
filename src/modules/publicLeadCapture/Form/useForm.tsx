import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useGetPublicFormFieldsQuery,
  usePutAddViewFormMutation,
  usePutAddEntranceFormMutation,
  usePostFormSubmissionsMutation,
} from '@/services/airMarketer/lead-capture/forms';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { validationSchema, defaultValues } from '@/utils/leadcapture-forms';

export default function useFormHook() {
  const searchParams = useSearchParams();
  const formId = searchParams.get('id');

  const { data, isLoading, isFetching } = useGetPublicFormFieldsQuery(
    { params: { id: formId } },
    { skip: !formId },
  );

  const [putAddViewForm] = usePutAddViewFormMutation();
  const handleAddViewForm = async () => {
    await putAddViewForm({ id: formId, body: {} });
  };
  useEffect(() => {
    if (formId) {
      handleAddViewForm();
    }
  }, [formId]);

  const [hasFormInteracted, setHasFormInteracted] = useState(false);
  const [putAddEntranceForm] = usePutAddEntranceFormMutation();

  const methods = useForm({
    defaultValues: defaultValues(data?.data?.fields),
    resolver: yupResolver(validationSchema(data?.data?.fields)),
  });
  const { handleSubmit, reset, watch } = methods;
  const watchAllFields = watch();

  const handleAddEntranceForm = async () => {
    const payload = {
      id: formId,
    };
    await putAddEntranceForm(payload);
  };

  useEffect(() => {
    const isFormInteracted = Object.values(watchAllFields).some(
      (value) => value !== undefined && value !== '',
    );

    if (formId) {
      if (isFormInteracted && !hasFormInteracted) {
        setHasFormInteracted(true);
        handleAddEntranceForm();
      }
    }
  }, [formId, watchAllFields, hasFormInteracted]);

  const [postFormSubmission] = usePostFormSubmissionsMutation();

  const handlerOnSubmit = async (values: any) => {
    const domain = typeof window !== 'undefined' ? window.location.origin : '';
    const formData: any = new FormData();
    const submission: any = {};

    Object.keys(values).forEach((key) => {
      if (values[key]) {
        if (values[key] instanceof File) {
          formData.append(`files${key}`, values[key]);
        } else {
          submission[key] = values[key];
        }
      }
    });

    formData.append('formId', formId);
    formData.append('type', 'public');
    formData.append('domain', domain);
    formData.append('submission', JSON.stringify(submission));

    try {
      await postFormSubmission({ body: formData })?.unwrap();
      reset();
      successSnackbar('Form submit successfully');
    } catch (error: any) {
      errorSnackbar('An error occured');
    }
  };

  return {
    data,
    isLoading,
    isFetching,
    methods,
    handleSubmit,
    handlerOnSubmit,
  };
}
