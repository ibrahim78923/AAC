import { useCallback, useEffect, useState } from 'react';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { defaultValues, validationSchema } from './CreateContract.data';
import { yupResolver } from '@hookform/resolvers/yup';
// import { generateUniqueId } from '@/utils/dynamic-forms';
import { useRouter } from 'next/router';
// import { yupResolver } from '@hookform/resolvers/yup';
import {
  useCreateCommonContractTemplateMutation,
  useCreateCommonContractMutation,
  useGetCommonContractTemplateByIdQuery,
  useUpdateCommonContractTemplateMutation,
  useGetCommonContractByIdQuery,
  // usePostSignAndSendMutation,
} from '@/services/commonFeatures/contracts';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import {
  getPartiesFormData,
  getSigneesFormData,
  ENUM_SIGNATURE_TYPE,
} from '@/utils/contracts';
import { AIR_SOCIAL_CONTRACTS } from '@/constants/routes';

export default function useCreateContract() {
  /* VARIABLE DECLERATION
  -------------------------------------------------------------------------------------*/
  const router = useRouter();
  const { templateId, folderId, contractId } = router?.query;

  const [activeView, setActiveView] = useState<string>('create');
  const [openModalManageSignature, setOpenModalManageSignature] =
    useState<boolean>(false);
  const [templateCatgValue, setTemplateCatgValue] = useState<string>('');
  const [openModalTemplateCategories, setOpenModalTemplateCategories] =
    useState<boolean>(false);

  const { data: dataTemplateById, isLoading: loadingGetTemplateById } =
    useGetCommonContractTemplateByIdQuery(templateId, { skip: !templateId });

  const { data: dataContractById, isLoading: loadingGetContractById } =
    useGetCommonContractByIdQuery(contractId, { skip: !contractId });

  const contractDetailsData = templateId
    ? dataTemplateById?.data
    : contractId
      ? dataContractById?.data
      : undefined;

  const methods: any = useForm<any>({
    resolver: yupResolver(validationSchema()),
    defaultValues: defaultValues(contractDetailsData),
  });
  const { control, handleSubmit, reset, setValue } = methods;

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

  const partyValues = useWatch({
    control,
    name: 'parties',
  });

  const {
    fields: dynamicFields,
    append: appendDynamicField,
    remove: removeDynamicField,
    update: updateDynamicField,
  } = useFieldArray({
    control,
    name: 'dynamicFields',
  });

  const [openModalSignAndSend, setOpenModalSignAndSend] =
    useState<boolean>(false);
  const [openModalPhoneNumber, setOpenModalPhoneNumber] =
    useState<boolean>(false);
  const [isIndividualSignature, setIsIndividualSignature] = useState(false);
  const [selectedSigneeId, setSelectedSigneeId] = useState<string | null>(null);
  const [isConfirmSigning, setIsConfirmSigning] = useState(false);

  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    if (signeeValues) {
      const isDifferent = !allSignatureTypesSame(signeeValues);
      setIsIndividualSignature(isDifferent);
    }
  }, [signeeValues]);

  useEffect(() => {
    reset(defaultValues(contractDetailsData ?? {}));
  }, [contractDetailsData, contractId, methods, reset]);

  useEffect(() => {
    partyValues?.forEach((party: any, index: number) => {
      if (party.name && !party.moduleId) {
        setValue(`parties.${index}.moduleId`, party.name._id, {
          shouldDirty: true,
        });
      }
    });
  }, [partyValues, setValue]);

  /* ASYNC FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const [createCommonContractTemplate, { isLoading: loadingCreateTemplate }] =
    useCreateCommonContractTemplateMutation();

  const [createCommonContractAsDraft, { isLoading: loadingCreateDraft }] =
    useCreateCommonContractMutation();

  const onSubmit = async (values: any, saveAs: string) => {
    const formData = new FormData();
    const createFormData = (key: string, value: any) => {
      if (
        value !== null &&
        value !== undefined &&
        !(typeof value === 'string' && value.trim() === '')
      ) {
        formData.append(key, value);
      }
    };
    createFormData('name', values?.name);
    createFormData('attachment', values?.attachment);
    createFormData('message', values?.message);
    createFormData('logo', values?.logo);
    createFormData('parties', getPartiesFormData(values?.parties));
    createFormData('signees', getSigneesFormData(values?.signees));
    // createFormData(
    //   'dynamicFields',
    //   values?.dynamicFields?.length === 0
    //     ? null
    //     : JSON.stringify(values?.dynamicFields),
    // );

    if (saveAs === 'template') {
      createFormData('category', templateCatgValue);
      try {
        await createCommonContractTemplate(formData)?.unwrap();
        setOpenModalTemplateCategories(false);
        successSnackbar('Contract template created successfully');
        router.back();
        reset();
      } catch (error: any) {
        errorSnackbar('An error occured');
      }
    }
    if (saveAs === 'draft') {
      // formData.append('visibleTo', values?.visibleTo);
      createFormData('status', 'DRAFT');
      createFormData('folderId', values?.folderId ?? folderId);
      // formData.append('templateId', '67a48a240e53143fd26211a9');
      if (templateId) {
        if (typeof templateId === 'string') {
          createFormData('templateId', templateId);
        }
      }
      try {
        await createCommonContractAsDraft(formData)?.unwrap();
        successSnackbar('Contract created as draft successfully');
        router.push(AIR_SOCIAL_CONTRACTS?.CONTRACTS);
        reset();
      } catch (error: any) {
        errorSnackbar('An error occured');
      }
    }
  };

  const handleSubmitCreateTemplate = (saveAs: string) =>
    handleSubmit((values: any) => onSubmit(values, saveAs));

  // Template Update/Save Changes
  const [updateCommonContractTemplate, { isLoading: loadingUpdateTemplate }] =
    useUpdateCommonContractTemplateMutation();

  const onSubmitUpdateTemplate = async (values: any) => {
    const formData = new FormData();
    const createFormData = (key: string, value: any) => {
      if (
        value !== null &&
        value !== undefined &&
        !(typeof value === 'string' && value.trim() === '')
      ) {
        formData.append(key, value);
      }
    };
    createFormData('name', values?.name);
    // formData.append('folderId', values?.folderId);
    // formData.append('status', values?.status ?? 'PENDING');
    createFormData('attachment', values?.attachment);
    createFormData('message', values?.message);
    // formData.append('visibleTo', values?.visibleTo);
    createFormData('logo', values?.logo);
    createFormData('parties', getPartiesFormData(values?.parties));
    createFormData('signees', getSigneesFormData(values?.signees));
    createFormData(
      'dynamicFields',
      values?.dynamicFields?.length === 0
        ? null
        : JSON.stringify(values?.dynamicFields),
    );

    try {
      await updateCommonContractTemplate({
        id: templateId,
        body: formData,
      })?.unwrap();
      successSnackbar('Contract template updated successfully');
    } catch (error: any) {
      errorSnackbar('An error occured');
    }
  };

  const handleSubmitUpdateTemplate = handleSubmit((values: any) => {
    onSubmitUpdateTemplate(values);
  });

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
    const maxSigningOrder = Math.max(
      0,
      ...signeeFields.map((signee: any) => signee.signingOrder || 0),
    );

    appendSignee({
      signingOrder: maxSigningOrder + 1,
      onBehalfOf: null,
      personalTitle: '',
      name: '',
      email: '',
      signatureStatus: 'PENDING',
      signatureType: ENUM_SIGNATURE_TYPE.CLICK,
    });
  }, [appendSignee, signeeFields]);

  const handleDeleteSigneeCard = useCallback(
    (index: number) => {
      removeSignee(index);
    },
    [removeSignee],
  );

  const handleAddPartyCard = useCallback(() => {
    appendParty({
      name: null,
      address: '',
      idNumber: '',
      referredAs: '',
      moduleType: 'COMPANIES',
    });
  }, [appendParty]);

  const handleAddDynamicField = useCallback(
    (data: any) => {
      const newField = {
        label: data?.name,
        name: `dynamicFields.${dynamicFields?.length}.${data?.name}`,
        type: data?.type,
        required: false,
        description: '',
        value: '',
        index: dynamicFields?.length + 1,
      };
      if (data?.type === 'checkbox') {
        newField.options = [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ];
      }
      appendDynamicField(newField);
    },
    [appendDynamicField],
  );

  const handleRemoveDynamicField = useCallback(
    (index: number) => {
      removeDynamicField(index);
    },
    [removeDynamicField],
  );

  const handleUpdateDynamicField = useCallback(
    (index: any, data: { required?: any; value?: any }) => {
      if (dynamicFields[index]) {
        updateDynamicField(index, {
          ...dynamicFields[index],
          required: data?.required ?? dynamicFields[index]?.required,
          // description: data?.description ?? dynamicFields[index]?.description,
          value: data?.value ?? dynamicFields[index]?.value,
        });
      }
    },
    [updateDynamicField, dynamicFields],
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

  const handleOpenModalSignAndSend = () => {
    setOpenModalSignAndSend(true);
  };
  const handleCloseModalSignAndSend = () => {
    setOpenModalSignAndSend(false);
  };

  const handleOpenModalPhoneNumber = () => {
    setOpenModalPhoneNumber(true);
  };
  const handleCloseModalPhoneNumber = () => {
    setOpenModalPhoneNumber(false);
  };

  const handleChangeConfirmSigning = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setIsConfirmSigning(event.target.checked);
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
    partyValues,
    signeeFields,
    signeeValues,
    loadingCreateTemplate,
    loadingCreateDraft,
    dynamicFields,

    openModalSignAndSend,
    handleOpenModalSignAndSend,
    handleCloseModalSignAndSend,

    openModalPhoneNumber,
    handleOpenModalPhoneNumber,
    handleCloseModalPhoneNumber,

    isIndividualSignature,
    handleChangeIndividualSignature,
    selectedSigneeId,
    setSelectedSigneeId,

    dataTemplateById,
    loadingGetTemplateById,
    loadingUpdateTemplate,
    handleSubmitUpdateTemplate,
    handleAddDynamicField,
    handleRemoveDynamicField,
    handleUpdateDynamicField,
    isConfirmSigning,
    handleChangeConfirmSigning,
    appendSignee,
    removeSignee,

    openModalTemplateCategories,
    setOpenModalTemplateCategories,
    templateCatgValue,
    setTemplateCatgValue,

    loadingGetContractById,
    dataContractById,
  };
}
