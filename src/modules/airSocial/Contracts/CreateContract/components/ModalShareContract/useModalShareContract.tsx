import { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { defaultValues, validationSchema } from './ModalShareContract.data';
import { useUpdateCommonContractMutation } from '@/services/commonFeatures/contracts';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useRouter } from 'next/router';
import { createCollaboratorsFormData } from '@/utils/contracts';

export default function useModalShareContract(
  setOpenModalShareContract: React.Dispatch<React.SetStateAction<boolean>>,
  data: any,
) {
  const router = useRouter();
  const { contractId } = router?.query;

  const methodsShareContract = useForm<any>({
    resolver: yupResolver(validationSchema()),
    defaultValues: defaultValues(data),
  });
  const { control, handleSubmit, reset } = methodsShareContract;

  useEffect(() => {
    reset(defaultValues(data));
  }, [methodsShareContract, reset, data]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'collaborators',
  });

  const handleAddCollaborator = () => {
    append({
      sharedUserData: null,
      permissions: '',
    });
  };

  const handleRemoveCollaborator = (index: number) => {
    remove(index);
  };

  const [updateCommonContract, { isLoading: loadingUpdateContract }] =
    useUpdateCommonContractMutation();

  const onSubmit = async (values: any) => {
    const formData = new FormData();
    formData.append(
      'sharedWithUsers',
      createCollaboratorsFormData(values?.collaborators) || '',
    );

    try {
      await updateCommonContract({
        id: contractId,
        body: formData,
      })?.unwrap();
      successSnackbar('Contract updated successfully');
      setOpenModalShareContract(false);
      reset(defaultValues({}));
    } catch (error: any) {
      errorSnackbar(`An error occured: ${error?.message}`);
    }
  };
  const handleSubmitShareContract = handleSubmit(onSubmit);

  const handleCloseModal = () => {
    setOpenModalShareContract(false);
    reset(defaultValues({}));
  };

  return {
    fields,
    handleAddCollaborator,
    handleRemoveCollaborator,
    methodsShareContract,
    handleSubmitShareContract,
    handleCloseModal,
    loadingUpdateContract,
  };
}
