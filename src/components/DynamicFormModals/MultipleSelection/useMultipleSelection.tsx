import { yupResolver } from '@hookform/resolvers/yup';
import { useFieldArray, useForm } from 'react-hook-form';
import { FIELDS_CONSTANTS, generateUniqueId } from '@/utils/dynamic-forms';
import { validationSchema, defaultValues } from './MultipleSelection.data';
import { useEffect, useState } from 'react';

export default function useMultipleSelection({
  setOpen,
  form,
  setForm,
  editId,
}: any) {
  const [initialValues, setInitialValues] = useState(defaultValues);

  useEffect(() => {
    if (editId) {
      const itemToEdit = form?.find((item: any) => item?.id === editId);
      if (itemToEdit) {
        setInitialValues({
          name: itemToEdit?.componentProps?.label,
          placeholder: itemToEdit?.componentProps?.placeholder,
          required: itemToEdit?.componentProps?.required,
          options: itemToEdit?.componentProps?.options,
        });
      }
    }
  }, [editId, form]);

  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const { handleSubmit, watch, control, setValue, reset } = methods;

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, methods, reset]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
  });

  const addOption = () => {
    append({ label: '', value: '' });
  };

  const removeOption = (index: number) => {
    if (fields?.length > 1) {
      remove(index);
    }
  };

  const onSubmit = (data: any) => {
    fields?.forEach((_, index) => {
      const label = watch(`options[${index}].label`);
      setValue(`options[${index}].value`, label);
    });

    setOpen(false);
    if (editId) {
      setForm((prevForm: any) =>
        prevForm.map((item: any) =>
          item?.id === editId
            ? {
                ...item,
                componentProps: {
                  name: data?.name?.replace(/\s/g, ''),
                  label: data?.name,
                  required: data?.required,
                  options: data?.options,
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
            options: data?.options,
          },
          component: FIELDS_CONSTANTS?.RHFMULTICHECKBOX,
        },
      ]);
    }
  };

  return { methods, handleSubmit, onSubmit, fields, addOption, removeOption };
}
