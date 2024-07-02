import { yupResolver } from '@hookform/resolvers/yup';
import { useFieldArray, useForm } from 'react-hook-form';
import { FIELDS_CONSTANTS, generateUniqueId } from '@/utils/dynamic-forms';
import { validationSchema, defaultValues } from './dropdown.data';
import { useEffect, useState } from 'react';
import { errorSnackbar } from '@/utils/api';

export default function useDropdown({ setOpen, form, setForm, editId }: any) {
  const [initialValues, setInitialValues] = useState(defaultValues);

  useEffect(() => {
    if (editId) {
      const itemToEdit = form?.find((item: any) => item?.id === editId);
      if (itemToEdit) {
        const transformedOptions = itemToEdit?.componentProps?.options?.map(
          (option: any) => ({ label: option }),
        );
        setInitialValues({
          name: itemToEdit?.componentProps?.label,
          placeholder: itemToEdit?.componentProps?.placeholder,
          options: transformedOptions,
          required: itemToEdit?.componentProps?.required,
        });
      }
    }
  }, [editId, form]);

  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  });

  const { handleSubmit, control, reset } = methods;

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, methods, reset]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
  });

  const addOption = () => {
    append({ label: '' });
  };

  const removeOption = (index: number) => {
    if (fields?.length > 1) {
      remove(index);
    }
  };

  const onSubmit = (data: any) => {
    const options = data?.options?.map((option: any) => option?.label);

    const optionsDuplicationWatch = options?.map((item: any) => item?.trim());
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
      setForm(
        (prevForm: any) =>
          prevForm?.map((item: any) =>
            item?.id === editId
              ? {
                  ...item,
                  componentProps: {
                    name: data?.name?.replace(/\s/g, ''),
                    label: data?.name,
                    placeholder: data?.placeholder,
                    required: data?.required,
                    options: options,
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
            placeholder: data?.placeholder,
            required: data?.required,
            options: options,
          },
          component: FIELDS_CONSTANTS?.RHFAUTOCOMPLETE,
        },
      ]);
    }
  };

  return { methods, handleSubmit, onSubmit, fields, addOption, removeOption };
}
