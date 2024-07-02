import { yupResolver } from '@hookform/resolvers/yup';
import { useFieldArray, useForm } from 'react-hook-form';
import { FIELDS_CONSTANTS, generateUniqueId } from '@/utils/dynamic-forms';
import { validationSchema, defaultValues } from './SingleSelection.data';
import { useEffect, useState } from 'react';
import { errorSnackbar } from '@/utils/api';

export default function useSingleSelection({
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
    defaultValues: initialValues,
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

    const optionsWatch = watch(`options`);
    const optionsDuplicationWatch = optionsWatch?.map(
      (item: any) => item?.label?.trim(),
    );
    const duplicates = optionsDuplicationWatch?.filter(
      (item: any, index: number) =>
        optionsDuplicationWatch?.indexOf(item) !== index,
    );
    if (duplicates?.length > 0) {
      errorSnackbar('Duplicate Options Found!');
      return;
    }

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
          component: FIELDS_CONSTANTS?.RHFRADIOGROUP,
        },
      ]);
    }
  };

  return { methods, handleSubmit, onSubmit, fields, addOption, removeOption };
}
