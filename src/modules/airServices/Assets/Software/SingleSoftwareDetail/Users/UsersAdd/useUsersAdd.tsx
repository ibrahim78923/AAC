import {
  addUserFormFieldsDynamic,
  addUserDefaultValues,
  addUserValidationSchema,
} from './UsersAdd.data';
import { useAddSoftwareUsersMutation } from '@/services/airServices/assets/software/single-software-detail/users';
import { useSearchParams } from 'next/navigation';
import { UsersAddFormDataI } from './UsersAdd.interface';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useFormLib } from '@/hooks/useFormLib';

export const useUsersAdd = (props: any) => {
  const { setIsPortalOpen } = props;
  const params = useSearchParams();
  const softwareId = params?.get('softwareId');

  const useFormValues = {
    validationSchema: addUserValidationSchema,
    defaultValues: addUserDefaultValues(),
  };

  const [addSoftwareUsers, { isLoading }] = useAddSoftwareUsersMutation();

  const closeModal = () => {
    reset();
    setIsPortalOpen({ isOpen: false, action: '' });
  };

  const { handleSubmit, reset, methods } = useFormLib(useFormValues);

  const onSubmit = async (data: UsersAddFormDataI) => {
    const params = {
      softwareId: softwareId,
      contractId: data?.contract?._id,
      userRefId: data?.user?._id,
    };
    try {
      await addSoftwareUsers(params)?.unwrap();
      successSnackbar('User added successfully');
      closeModal();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const addUserFormFields = addUserFormFieldsDynamic();

  return {
    methods,
    handleSubmit,
    onSubmit,
    closeModal,
    addUserFormFields,
    isLoading,
  };
};
