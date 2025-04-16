import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './AddSignee.data';
import { ENUM_SIGNATURE_TYPE } from '@/utils/contracts';

export default function useAddSignee(
  handleCloseModal: () => void,
  isEditMode: boolean,
) {
  const {
    fields: signeeFields,
    append: appendSignee,
    update: updateSigneeField,
    // remove: removeSignee,
  } = useFieldArray({
    name: 'signees',
  });

  const SIGNING_ORDER = Number(signeeFields?.length + 1);

  const existingEmails = signeeFields.map(
    (signee: any) => signee?.email?.toLowerCase(),
  );

  const methods = useForm<any>({
    resolver: yupResolver(validationSchema(existingEmails, isEditMode)),
    defaultValues: {
      signingOrder: SIGNING_ORDER,
      signeeName: '',
      signeeEmail: '',
      personalTitle: '',
      phoneNumber: '',
      company: null,
    },
  });

  const { handleSubmit, reset, setValue } = methods;

  // useEffect(() => {
  //     reset(defaultValues);
  //   }, [signeeFields, SIGNING_ORDER, reset]);

  const onSubmitAddSignee = async (values: any) => {
    const existingSigneeIndex = signeeFields.findIndex(
      (signee: any) => signee.email === values.signeeEmail,
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
        signingOrder: values?.signingOrder,
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
  };
}
