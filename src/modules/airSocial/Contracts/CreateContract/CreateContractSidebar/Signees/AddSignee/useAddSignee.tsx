import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './AddSignee.data';
import { ENUM_SIGNATURE_TYPE } from '@/utils/contracts';
import { isNullOrEmpty } from '@/utils';
import { errorSnackbar } from '@/utils/api';

export default function useAddSignee(handleCloseModal: () => void) {
  const {
    fields: signeeFields,
    append: appendSignee,
    update: updateSigneeField,
    // remove: removeSignee,
  } = useFieldArray({
    name: 'signees',
  });

  const SIGNING_ORDER = Number(signeeFields?.length + 1);

  const methods = useForm<any>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      signingOrder: SIGNING_ORDER,
      onBehalfOf: null,
      personalTitle: '',
      signeeName: '',
      signeeEmail: '',
    },
  });

  const { handleSubmit, reset, setValue } = methods;

  // useEffect(() => {
  //     reset(defaultValues);
  //   }, [signeeFields, SIGNING_ORDER, reset]);

  const onSubmitAddSignee = async (values: any) => {
    if (isNullOrEmpty(values.signeeName) || isNullOrEmpty(values.signeeEmail)) {
      errorSnackbar('Please Enter Name and Email');
      return;
    }
    const existingSigneeIndex = signeeFields.findIndex(
      (signee) => signee.email === values.signeeEmail,
    );

    if (existingSigneeIndex !== -1) {
      // Update existing signee using the `update` method
      updateSigneeField(existingSigneeIndex, {
        ...signeeFields[existingSigneeIndex],
        personalTitle: values.personalTitle,
        name: values.signeeName,
        phoneNumber: values.phoneNumber,
        moduleId: values.company?._id,
      });
    } else {
      // Add new signee
      appendSignee({
        personalTitle: values?.personalTitle,
        name: values?.signeeName,
        email: values?.signeeEmail,
        signatureStatus: 'PENDING',
        signatureType: ENUM_SIGNATURE_TYPE?.CLICK,
        phoneNumber: values?.phoneNumber,
        moduleId: values?.company?._id,
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
  };
}
