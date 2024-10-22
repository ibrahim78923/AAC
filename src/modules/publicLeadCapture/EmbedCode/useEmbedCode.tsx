import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import {
  useGetPublicFormFieldsQuery,
  usePutAddViewFormMutation,
  usePutAddEntranceFormMutation,
  usePostFormSubmissionsMutation,
} from '@/services/airMarketer/lead-capture/forms';
import { validationSchema, defaultValues } from '@/utils/leadcapture-forms';

export default function useEmbedCode() {
  const searchParams = useSearchParams();
  const formId = searchParams.get('id');

  const { data, isLoading, isFetching, isSuccess, isError } =
    useGetPublicFormFieldsQuery({ params: { id: formId } }, { skip: !formId });

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

    const payload: any = {
      formId,
      type: 'public',
      domain,
    };

    const submission: any = {};

    Object.keys(values).forEach((key) => {
      if (values[key]) {
        submission[key] = values[key];
      }
    });

    payload.submission = submission;

    try {
      await postFormSubmission({ body: payload })?.unwrap();
      successSnackbar('Form submit successfully');
      reset();
    } catch (error: any) {
      errorSnackbar('An error occured');
    }
  };

  return {
    data,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    methods,
    handleSubmit,
    handlerOnSubmit,
  };
}
