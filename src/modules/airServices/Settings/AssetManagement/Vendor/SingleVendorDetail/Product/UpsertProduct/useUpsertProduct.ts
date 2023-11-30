import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import {
  upsertProductValidationSchema,
  upsertProductDefaultValues,
} from './UpsertProduct.data';
import { useEffect } from 'react';

export const useUpsertProduct = (props: any) => {
  const { setUpsertProductModal, editData, setEditData } = props;

  const methods: any = useForm<any>({
    resolver: yupResolver(upsertProductValidationSchema),
    defaultValues: upsertProductDefaultValues(),
  });
  const { handleSubmit, reset } = methods;

  const isSubmit = async () => {
    enqueueSnackbar('Product Added Successfully', {
      variant: 'success',
    });
    setUpsertProductModal(false);
    setEditData([]);
    reset(upsertProductDefaultValues());
  };

  const editSubmit = async () => {
    enqueueSnackbar('Product Edit Successfully', {
      variant: 'success',
    });
    setUpsertProductModal(false);
    setEditData([]);
    reset(upsertProductDefaultValues());
  };

  useEffect(() => {
    reset(() => upsertProductDefaultValues(editData));
  }, [editData, reset]);

  const handleCancel = () => {
    setUpsertProductModal(false);
    setEditData([]);
  };
  return {
    methods,
    handleSubmit,
    isSubmit,
    editSubmit,
    handleCancel,
  };
};
