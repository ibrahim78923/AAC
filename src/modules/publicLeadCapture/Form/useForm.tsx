import { useSearchParams } from 'next/navigation';
import {
  useGetPublicFormFieldsQuery,
  usePutAddViewFormMutation,
  usePutAddEntranceFormMutation,
} from '@/services/airMarketer/lead-capture/forms';
import { useEffect, useState } from 'react';

export default function useForm() {
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

  const handleAddEntranceForm = async () => {
    if (formId) {
      await putAddEntranceForm({ id: formId, body: {} });
    }
  };

  const handleInput = (event: any) => {
    if (
      !hasFormInteracted &&
      (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA')
    ) {
      handleAddEntranceForm();
      setHasFormInteracted(true);
    }
  };

  useEffect(() => {
    const form = document.getElementsByTagName('form')[0];

    if (form && !hasFormInteracted) {
      form.addEventListener('input', handleInput);
    }

    // Cleanup event listener when component unmounts
    return () => {
      if (form) {
        form.removeEventListener('input', handleInput);
      }
    };
  }, [hasFormInteracted]);

  return {
    data,
    isLoading,
    isFetching,
  };
}
