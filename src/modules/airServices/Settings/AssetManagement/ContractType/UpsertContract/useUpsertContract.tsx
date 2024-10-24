import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants/routes';
import {
  ContractFieldsFormDefaultValues,
  ContractFieldsFormValidationSchema,
} from './UpsertContract.data';
import {
  usePatchContractTypeMutation,
  usePostContractTypeMutation,
} from '@/services/airServices/settings/asset-management/contract-type';

export default function useUpsertContract({ openDialog, setOpenDialog }: any) {
  const router: any = useRouter();

  const [postContractTypeTrigger, postContractTypeStatus] =
    usePostContractTypeMutation();
  const [patchContractTypeTrigger, patchContractTypeStatus] =
    usePatchContractTypeMutation();

  const methods: any = useForm({
    resolver: yupResolver(ContractFieldsFormValidationSchema),
    defaultValues: ContractFieldsFormDefaultValues?.(openDialog?.data),
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    reset(ContractFieldsFormDefaultValues?.(openDialog?.data));
  }, [openDialog, methods, reset]);

  const onSubmit = async (data: any) => {
    if (!!openDialog?.data?._id) {
      updateParentType(data);
      return;
    }

    try {
      const res: any = await postContractTypeTrigger(data)?.unwrap();
      successSnackbar('Contract Type Added Successfully!');
      onClose?.();
      router?.push({
        pathname: AIR_SERVICES?.CONTACT_TYPE_CREATE_FIELDS,
        query: {
          section: res?.data?._id,
          name: res?.data?.name,
        },
      });
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
      onClose?.();
    }
  };

  const updateParentType = async (data: any) => {
    const body = {
      ...data,
      id: openDialog?.data?._id,
    };

    try {
      const res: any = await patchContractTypeTrigger(body)?.unwrap();
      successSnackbar('Contract Type Updated Successfully!');
      onClose?.();
      router?.push({
        pathname: AIR_SERVICES?.CONTACT_TYPE_CREATE_FIELDS,
        query: {
          section: res?.data?._id,
          name: res?.data?.name,
        },
      });
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
      onClose?.();
    }
  };

  const onClose = () => {
    setOpenDialog({ open: false, data: null });
  };

  return {
    onClose,
    methods,
    handleSubmit,
    onSubmit,
    postContractTypeStatus,
    patchContractTypeStatus,
  };
}
