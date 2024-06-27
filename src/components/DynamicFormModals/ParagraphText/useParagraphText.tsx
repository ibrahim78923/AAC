import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FIELDS_CONSTANTS, generateUniqueId } from '@/utils/dynamic-forms';
import { validationSchema, defaultValues } from './ParagraphText.data';
import { useEffect, useState } from 'react';

export default function useParagraphText({
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
                    placeholder: data?.placeholder,
                    required: data?.required,
                    multiline: true,
                    rows: 4,
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
            multiline: true,
            rows: 4,
          },
          component: FIELDS_CONSTANTS?.RHFTEXTFIELD,
        },
      ]);
    }
  };

  return { methods, handleSubmit, onSubmit };
}
