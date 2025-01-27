import { useCallback, useEffect, useState } from 'react';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import {
  defaultValues,
  ENUM_SIGNATURE_TYPE,
  validationSchema,
} from './CreateContract.data';
import { yupResolver } from '@hookform/resolvers/yup';
// import { generateUniqueId } from '@/utils/dynamic-forms';
import { useRouter } from 'next/router';
// import { yupResolver } from '@hookform/resolvers/yup';
import {
  useCreateCommonContractTemplateMutation,
  useCreateCommonContractAsDraftMutation,
  useGetCommonContractTemplateByIdQuery,
  useUpdateCommonContractTemplateMutation,
  // usePostSignAndSendMutation,
} from '@/services/commonFeatures/contracts';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
// import { getPartiesFormData, getSigneesFormData } from '@/utils/contracts';

export default function useCreateContract() {
  /* VARIABLE DECLERATION
  -------------------------------------------------------------------------------------*/
  const router = useRouter();
  const { templateId } = router?.query;
  const [activeView, setActiveView] = useState<string>('create');
  const [openModalManageSignature, setOpenModalManageSignature] =
    useState<boolean>(false);
  const [templateCatgValue, setTemplateCatgValue] = useState<string>('');
  const [openModalTemplateCategories, setOpenModalTemplateCategories] =
    useState<boolean>(false);
  const { data: dataTemplateById, isLoading: loadingGetTemplateById } =
    useGetCommonContractTemplateByIdQuery(templateId, { skip: !templateId });

  const methods: any = useForm<any>({
    resolver: yupResolver(validationSchema()),
    defaultValues: defaultValues(dataTemplateById?.data ?? {}),
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
    // remove: removeDynamicField,
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
    reset(defaultValues(dataTemplateById?.data ?? {}));
  }, [dataTemplateById, methods, reset]);

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
    useCreateCommonContractAsDraftMutation();

  const onSubmit = async (values: any, saveAs: string) => {
    const formData = new FormData();
    formData.append('name', values?.name);
    formData.append('folderId', values?.folderId ?? '676a8264884c3ce8851b91f9');
    if (saveAs === 'draft') {
      formData.append('status', 'DRAFT');
    }
    formData.append('attachment', values?.attachment);
    formData.append('message', values?.message);
    formData.append('visibleTo', values?.visibleTo);
    formData.append('logo', values?.logo);
    formData.append('parties', JSON.stringify(values?.parties));
    formData.append('signees', JSON.stringify(values?.signees));
    formData.append('dynamicFields', JSON.stringify(values?.dynamicFields));

    if (saveAs === 'template') {
      try {
        await createCommonContractTemplate(formData)?.unwrap();
        setOpenModalTemplateCategories(false);
        successSnackbar('Contract template created successfully');
        reset();
      } catch (error: any) {
        errorSnackbar('An error occured');
      }
    }
    if (saveAs === 'draft') {
      try {
        await createCommonContractAsDraft(formData)?.unwrap();
        successSnackbar('Contract created as draft successfully');
        reset();
      } catch (error: any) {
        errorSnackbar('An error occured');
      }
    }
  };

  const handleSubmitCreateTemplate = (saveAs: string) =>
    handleSubmit((values: any) => onSubmit(values, saveAs));

  // Template Save Changes
  const [updateCommonContractTemplate, { isLoading: loadingUpdateTemplate }] =
    useUpdateCommonContractTemplateMutation();

  const onSubmitUpdateTemplate = async (values: any) => {
    const formData = new FormData();
    formData.append('name', values?.name);
    formData.append('folderId', values?.folderId);
    // formData.append('status', values?.status ?? 'PENDING');
    formData.append('attachment', values?.attachment);
    formData.append('message', values?.message);
    formData.append('visibleTo', values?.visibleTo);
    formData.append('logo', values?.logo);
    formData.append('parties', JSON.stringify(values?.parties));
    formData.append('signees', JSON.stringify(values?.signees));
    // formData.append('dynamicFields', JSON.stringify(values?.dynamicFields));

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
      email: '',
      referredAs: '',
      moduleType: 'COMPANIES',
      moduleId: '',
    });
  }, [appendParty]);

  const handleAddDynamicField = useCallback(
    (data: any) => {
      appendDynamicField({
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

    isConfirmSigning,
    handleChangeConfirmSigning,
    appendSignee,
    removeSignee,

    openModalTemplateCategories,
    setOpenModalTemplateCategories,
    templateCatgValue,
    setTemplateCatgValue,
  };
}
