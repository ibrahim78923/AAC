import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  validationSchema,
  defaultValues,
  fileTypeMapping,
  fileTypeAcceptOptions,
} from './Upload.data';
import { generateUniqueId } from '@/utils/dynamic-forms';
import { useEffect, useState } from 'react';

export default function useUpload({ setOpen, setForm, form, editId }: any) {
  const [initialValues, setInitialValues] = useState(defaultValues);

  const reverseTransformAccept = (accept: any) => {
    const selectedFileTypes: any = [];

    Object?.keys(accept)?.forEach((mimeType) => {
      Object?.keys(fileTypeMapping)?.forEach((fileType) => {
        if (fileTypeMapping[fileType][mimeType]) {
          selectedFileTypes?.push(
            fileTypeAcceptOptions?.find((option) => option?.label === fileType),
          );
        }
      });
    });

    return selectedFileTypes;
  };

  useEffect(() => {
    if (editId) {
      const itemToEdit = form?.find((item: any) => item?.id === editId);
      if (itemToEdit) {
        setInitialValues({
          name: itemToEdit?.componentProps?.label,
          placeholder: itemToEdit?.componentProps?.fileType,
          fileTypeAccept: reverseTransformAccept(
            itemToEdit?.componentProps?.accept,
          ),
          size: itemToEdit?.componentProps?.size,
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

  const transformAccept = (selectedFileTypes: any) => {
    return selectedFileTypes?.reduce((acc: any, fileType: any) => {
      const mimeTypes = fileTypeMapping[fileType];
      if (mimeTypes) {
        Object?.keys(mimeTypes)?.forEach((mimeType) => {
          if (!acc[mimeType]) {
            acc[mimeType] = mimeTypes[mimeType];
          } else {
            acc[mimeType] = [...acc[mimeType], ...mimeTypes[mimeType]];
          }
        });
      }
      return acc;
    }, {});
  };

  const onSubmit = (data: any) => {
    setOpen(false);
    const transformedAccept = transformAccept(
      data?.fileTypeAccept?.map((item: any) => item?.label),
    );

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
                    fileType: data?.placeholder,
                    accept: transformedAccept,
                    maxSize: data?.size * 1024 * 1024,
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
            fileType: data?.placeholder,
            accept: transformedAccept,
            maxSize: data?.size * 1024 * 1024,
          },
          component: 'RHFDropZone',
        },
      ]);
    }
  };

  return { methods, handleSubmit, onSubmit };
}
