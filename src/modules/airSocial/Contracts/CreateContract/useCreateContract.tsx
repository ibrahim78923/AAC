import { useCallback, useEffect, useState } from 'react';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import {
  defaultValues,
  ENUM_SIGNATURE_METHODS,
  validationSchema,
} from './CreateContract.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { generateUniqueId } from '@/utils/dynamic-forms';
import { useRouter } from 'next/router';
// import { yupResolver } from '@hookform/resolvers/yup';
import {
  useCreateCommonContractTemplateMutation,
  // useCreateCommonContractAsDraftMutation,
  useGetCommonContractTemplateByIdQuery,
  useUpdateCommonContractTemplateMutation,
} from '@/services/commonFeatures/contracts';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

export default function useCreateContract() {
  /* VARIABLE DECLERATION
  -------------------------------------------------------------------------------------*/
  const router = useRouter();
  const { templateId } = router?.query;
  const [activeView, setActiveView] = useState<string>('create');
  const [openModalManageSignature, setOpenModalManageSignature] =
    useState<boolean>(false);
  const { data: dataTemplateById } = useGetCommonContractTemplateByIdQuery(
    templateId,
    { skip: !templateId },
  );

  const methods: any = useForm({
    resolver: yupResolver(validationSchema()),
    defaultValues: defaultValues({}),
  });
  const { control, handleSubmit, reset } = methods;

  // Signees FieldArray
  const {
    fields: signeeFields,
    append: appendSignee,
    remove: removeSignee,
  } = useFieldArray({
    control,
    name: 'signees',
  });

  const signeeValues = useWatch({
    control,
    name: 'signees',
  });

  // Parties FieldArray
  const {
    fields: partyFields,
    append: appendParty,
    remove: removeParty,
  } = useFieldArray({
    control,
    name: 'parties',
  });

  const {
    fields: dynamicFields,
    append: appendDynamicField,
    // remove: removeDynamicField,
  } = useFieldArray({
    control,
    name: 'dynamicFields',
  });

  const [openModalConfirmationSignDoc, setOpenModalConfirmationSignDoc] =
    useState<boolean>(false);
  const [openModalPhoneNumber, setOpenModalPhoneNumber] =
    useState<boolean>(false);
  const [isIndividualSignature, setIsIndividualSignature] = useState(false);
  const [selectedSigneeId, setSelectedSigneeId] = useState<string | null>(null);

  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    if (signeeValues) {
      const isDifferent = !allSignatureTypesSame(signeeValues);
      setIsIndividualSignature(isDifferent);
    }
  }, [signeeValues]);

  useEffect(() => {
    reset(defaultValues({}));
  }, [dataTemplateById, methods, reset]);

  /* ASYNC FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const [createCommonContractTemplate, { isLoading: loadingCreateTemplate }] =
    useCreateCommonContractTemplateMutation();
  const onSubmit = async (values: any) => {
    const payload = {
      name: values?.name ?? '',
      folderId: values?.folderId ?? '652d0c8612be46f5da445de8',
      // status: values?.status ?? 'PENDING',
      attachment: values?.attachment ?? null,
      message: values?.message ?? '',
      visibleTo: values?.visibleTo ?? 'EVERYONE',
      logo: values?.logo ?? null,
      parties: values?.parties?.map((party: any) => ({
        name: party?.name ?? null,
        address: party?.address ?? '',
        idNumber: party?.idNumber ?? '',
        email: party?.email ?? '',
        referredAs: party?.referredAs ?? '',
        moduleType: party.moduleType,
        moduleId: party?.moduleId,
      })),
      signees: values?.signees?.map((signee: any) => ({
        signingOrder: signee?.signingOrder,
        onBehalfOf: signee?.onBehalfOf,
        personalTitle: signee?.personalTitle,
        name: signee?.name,
        email: signee?.email,
        signatureStatus: signee?.signatureStatus,
        signatureType: signee?.signatureType,
        moduleId: signee?.moduleId,
      })),
    };
    try {
      await createCommonContractTemplate(payload)?.unwrap();
      successSnackbar('Contract template created successfully');
      reset();
    } catch (error: any) {
      errorSnackbar('An error occured');
    }
  };

  const handleSubmitCreateTemplate = handleSubmit(onSubmit);

  const [updateCommonContractTemplate] =
    useUpdateCommonContractTemplateMutation();

  const onSubmitUpdateTemplate = async (values: any) => {
    try {
      await updateCommonContractTemplate({
        id: templateId,
        body: values,
      })?.unwrap();
      successSnackbar('Contract template updated successfully');
    } catch (error: any) {
      errorSnackbar('An error occured');
    }
  };

  const handleSubmitUpdateTemplate = handleSubmit(onSubmitUpdateTemplate);

  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const handlePreviewToggle = (view: string) => {
    setActiveView(view);
  };

  const handleDeletePartyCard = useCallback(
    (index: number) => {
      removeParty(index);
    },
    [removeParty],
  );

  const handleAddSigneeCard = useCallback(() => {
    appendSignee({
      _id: generateUniqueId(),
      signingOrder: signeeFields.length + 1,
      onBehalfOf: null,
      personalTitle: '',
      name: '',
      email: '',
      signatureStatus: 'PENDING',
      signatureType: ENUM_SIGNATURE_METHODS.CLICK,
      moduleId: '',
    });
  }, [appendSignee]);

  const handleDeleteSigneeCard = useCallback(
    (index: number) => {
      removeSignee(index);
    },
    [removeSignee],
  );

  const handleAddPartyCard = useCallback(() => {
    appendParty({
      _id: generateUniqueId(),
      name: null,
      address: '',
      idNumber: '',
      email: '',
      referredAs: '',
      moduleType: 'COMPANIES',
      moduleId: '',
    });
  }, [appendParty]);

  const handleAddDynamicField = useCallback(
    (data: any) => {
      appendDynamicField({
        _id: generateUniqueId(),
        label: data?.name,
        name: `dynamicFields.${dynamicFields?.length}.${data?.name}`,
        type: data?.type,
      });
    },
    [appendDynamicField],
  );

  const handleOpenModalManageSignature = () => {
    setOpenModalManageSignature(true);
  };
  const handleCloseModalManageSignature = () => {
    setSelectedSigneeId(null);
    setOpenModalManageSignature(false);
  };

  const handleChangeIndividualSignature = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setIsIndividualSignature(event.target.checked);
  };

  const allSignatureTypesSame = (signees: any[]) => {
    if (!signees.length) return true;
    const firstSignatureType = signees[0]?.signatureType;
    return signees.every(
      (signee) => signee.signatureType === firstSignatureType,
    );
  };

  const handleChangeSignatureMethod = (
    event: React.ChangeEvent<HTMLInputElement>,
    signeeId: string | null,
  ) => {
    const newSignatureType = event.target.value;

    const updatedSignees = isIndividualSignature
      ? signeeFields.map((signee: any) => {
          if (signee._id === signeeId) {
            return {
              ...signee,
              signatureType: newSignatureType,
            };
          }
          return signee;
        })
      : signeeFields.map((signee: any) => ({
          ...signee,
          signatureType: newSignatureType,
        }));

    methods.setValue('signees', updatedSignees, { shouldDirty: true });
  };

  const handleOpenModalConfirmationSignDoc = () => {
    setOpenModalConfirmationSignDoc(true);
  };
  const handleCloseModalConfirmationSignDoc = () => {
    setOpenModalConfirmationSignDoc(false);
  };

  const handleOpenModalPhoneNumber = () => {
    setOpenModalPhoneNumber(true);
  };
  const handleCloseModalPhoneNumber = () => {
    setOpenModalPhoneNumber(false);
  };

  return {
    router,
    activeView,
    handlePreviewToggle,

    handleAddPartyCard,
    handleDeletePartyCard,

    handleAddSigneeCard,
    handleDeleteSigneeCard,

    openModalManageSignature,
    handleOpenModalManageSignature,
    handleCloseModalManageSignature,
    handleChangeSignatureMethod,

    methods,
    handleSubmitCreateTemplate,
    partyFields,
    signeeFields,
    loadingCreateTemplate,
    dynamicFields,

    openModalConfirmationSignDoc,
    handleOpenModalConfirmationSignDoc,
    handleCloseModalConfirmationSignDoc,

    openModalPhoneNumber,
    handleOpenModalPhoneNumber,
    handleCloseModalPhoneNumber,

    isIndividualSignature,
    handleChangeIndividualSignature,
    selectedSigneeId,
    setSelectedSigneeId,

    dataTemplateById,
    handleSubmitUpdateTemplate,
    handleAddDynamicField,
  };
}
