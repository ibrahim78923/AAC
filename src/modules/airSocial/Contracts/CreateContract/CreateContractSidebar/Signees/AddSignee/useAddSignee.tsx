import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './AddSignee.data';
import {
  createPDFSigneeFormData,
  ENUM_SIGNATURE_TYPE,
} from '@/utils/contracts';
import { useUpdateCommonContractMutation } from '@/services/commonFeatures/contracts';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

export default function useAddSignee(
  handleCloseModal: () => void,
  isEditMode: boolean,
  contractId: any,
) {
  const { fields: signeeFields, append: appendSignee } = useFieldArray({
    name: 'signees',
  });

  const [updateCommonContract, { isLoading: loadingUpdateContract }] =
    useUpdateCommonContractMutation();

  const SIGNING_ORDER = Number(signeeFields?.length + 1);
  const existingEmails = signeeFields.map(
    (signee: any) => signee?.email?.toLowerCase(),
  );

  const methods = useForm<any>({
    resolver: yupResolver(validationSchema(existingEmails, isEditMode)),
    defaultValues: {
      signeeName: '',
      signeeEmail: '',
      personalTitle: '',
      phoneNumber: '',
      company: null,
    },
  });

  const { handleSubmit, reset, setValue } = methods;

  const onSubmitAddSignee = async (values: any) => {
    if (isEditMode) {
      const updatedSignees = signeeFields.map((signee: any) => {
        if (values?.signeeEmail === signee?.email) {
          return {
            ...signee,
            name: values.signeeName,
            email: values.signeeEmail,
            personalTitle: values.personalTitle,
            phoneNumber: values.phoneNumber,
            moduleId: values.company?._id,
          };
        }
        return signee;
      });

      const formData = new FormData();
      const createFormData = (key: string, value: any) => {
        if (
          value === null ||
          value === undefined ||
          (typeof value === 'string' && value.trim() === '')
        ) {
          formData.append(key, 'null');
        } else {
          formData.append(key, value);
        }
      };
      createFormData('signees', createPDFSigneeFormData(updatedSignees));
      try {
        await updateCommonContract({
          id: contractId,
          body: formData,
        })?.unwrap();
        successSnackbar('Signee updated successfully');
      } catch (error: any) {
        errorSnackbar('An error occured');
      }
    } else {
      // Add new signee
      appendSignee({
        signingOrder: SIGNING_ORDER,
        name: values.signeeName,
        email: values.signeeEmail,
        personalTitle: values.personalTitle,
        phoneNumber: values?.phoneNumber,
        moduleId: values?.company?._id,
        moduleType: 'COMPANIES',
        signatureStatus: 'PENDING',
        signatureType: ENUM_SIGNATURE_TYPE?.DRAW,
      });
    }

    reset();
    handleCloseModal();
  };
  const handleAddSignee = handleSubmit(onSubmitAddSignee);

  return {
    methods,
    handleAddSignee,
    setValue,
    loadingUpdateContract,
  };
}
