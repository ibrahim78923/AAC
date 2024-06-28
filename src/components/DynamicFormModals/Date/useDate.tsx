import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FIELDS_CONSTANTS, generateUniqueId } from '@/utils/dynamic-forms';
import {
  validationSchema,
  defaultValues,
  DateFormatOptions,
} from './Date.data';
import { useEffect, useState } from 'react';

export default function useDate({ setOpen, form, setForm, editId }: any) {
  const [initialValues, setInitialValues] = useState(defaultValues);

  useEffect(() => {
    if (editId) {
      const itemToEdit = form?.find((item: any) => item?.id === editId);
      if (itemToEdit) {
        setInitialValues({
          name: itemToEdit?.componentProps?.label,
          dateFormat:
            DateFormatOptions?.find(
              (option) => option?.value === itemToEdit?.componentProps?.format,
            ) || null,
          required: itemToEdit?.componentProps?.required,
        });
      }
    }
  }, [editId, form]);

  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, methods, reset]);

  const onSubmit = (data: any) => {
    setOpen(false);
    if (editId) {
      setForm(
        (prevForm: any) =>
          prevForm?.map((item: any) =>
            item?.id === editId
              ? {
                  ...item,
                  componentProps: {
                    name: data?.name?.replace(/\s/g, ''),
                    label: data?.name,
                    required: data?.required,
                    format: data?.dateFormat?.value,
                    fullWidth: true,
                  },
                }
              : item,
          ),
      );
    } else {
      const uniqueId = generateUniqueId();
      setForm([
        ...form,
        {
          id: uniqueId,
          componentProps: {
            name: data?.name?.replace(/\s/g, ''),
            label: data?.name,
            required: data?.required,
            format: data?.dateFormat?.value,
            fullWidth: true,
          },
          component: FIELDS_CONSTANTS?.RHFDATEPICKER,
        },
      ]);
    }
  };

  return { methods, handleSubmit, onSubmit };
}
