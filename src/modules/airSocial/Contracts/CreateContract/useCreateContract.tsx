import { useCallback, useEffect, useState } from 'react';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { defaultValues, validationSchema } from './CreateContract.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import {
  useCreateCommonContractTemplateMutation,
  useCreateCommonContractMutation,
  useGetCommonContractTemplateByIdQuery,
  useUpdateCommonContractTemplateMutation,
  useGetCommonContractByIdQuery,
  useUpdateCommonContractMutation,
} from '@/services/commonFeatures/contracts';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import {
  createPartiesFormData,
  createSigneesFormData,
  createPDFSigneeFormData,
  textComponentsFormData,
  signatureComponentsFormData,
  ENUM_SIGNATURE_TYPE,
} from '@/utils/contracts';
import { AIR_SOCIAL_CONTRACTS } from '@/constants/routes';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

type DynamicField = {
  id?: string;
  label: string;
  name: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  description?: string;
  options?: any;
};

export default function useCreateContract() {
  /* VARIABLE DECLERATION
  -------------------------------------------------------------------------------------*/
  const textComponents = useSelector(
    (state: RootState) => state.airSocialPdfContract.textComponents,
  );
  const signatureComponents = useSelector(
    (state: RootState) => state.airSocialPdfContract.signatureComponents,
  );

  const router = useRouter();
  const { templateId, folderId, contractId, contractType } = router?.query;
  const [activeView, setActiveView] = useState<string>('create');
  const [openModalAddSignee, setOpenModalAddSignee] = useState<boolean>(false);
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
  } = useFieldArray<{
    dynamicFields: DynamicField[];
  }>({
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

  const [createCommonContract, { isLoading: loadingCreateDraft }] =
    useCreateCommonContractMutation();

  const onSubmit = async (values: any, saveAs: string) => {
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
    createFormData('name', values?.name);
    createFormData('attachment', values?.attachment);
    createFormData('message', values?.message);
    createFormData('logo', values?.logo);
    createFormData('parties', createPartiesFormData(values?.parties, false));
    if (!contractType) {
      createFormData('signees', createSigneesFormData(values?.signees, false));
    }
    createFormData('dynamicFields', JSON.stringify(values?.dynamicFields));

    if (contractType && contractType === 'PDF') {
      createFormData('latestAttachment', values?.latestAttachment);
      createFormData('contractType', 'PDF');
      createFormData('textComponent', textComponentsFormData(textComponents));
      createFormData(
        'signatureComponent',
        signatureComponentsFormData(signatureComponents),
      );
      createFormData('signees', createPDFSigneeFormData(values?.signees));
    }

    if (saveAs === 'template') {
      createFormData('category', templateCatgValue);
      try {
        await createCommonContractTemplate(formData)?.unwrap();
        setOpenModalTemplateCategories(false);
        successSnackbar('Contract template created successfully');
        router.back();
        reset();
      } catch (error: any) {
        errorSnackbar(`An error occured: ${error?.data?.message}`);
      }
    }
    if (saveAs === 'draft') {
      createFormData('status', 'DRAFT');
      createFormData('folderId', folderId);
      if (templateId) {
        if (typeof templateId === 'string') {
          createFormData('templateId', templateId);
        }
      }
      try {
        await createCommonContract(formData)?.unwrap();
        successSnackbar('Contract created as draft successfully');
        router.push(AIR_SOCIAL_CONTRACTS?.CONTRACTS);
        reset();
      } catch (error: any) {
        errorSnackbar(`An error occured: ${error?.data?.message}`);
      }
    }
    if (saveAs === 'sign') {
      createFormData('status', 'PENDING');
      createFormData('folderId', folderId);
      if (templateId) {
        if (typeof templateId === 'string') {
          createFormData('templateId', templateId);
        }
      }
      try {
        await createCommonContract(formData)?.unwrap();
        successSnackbar(
          'The contract has been successfully sent to the signees.',
        );
        router.push(AIR_SOCIAL_CONTRACTS?.CONTRACTS);
        reset();
      } catch (error: any) {
        errorSnackbar(`An error occured: ${error?.data?.message}`);
      }
    }
  };

  const handleSubmitCreateTemplate = (saveAs: string) =>
    handleSubmit((values: any) => onSubmit(values, saveAs));

  // Template Update/Save Changes
  const [updateCommonContractTemplate, { isLoading: loadingUpdateTemplate }] =
    useUpdateCommonContractTemplateMutation();

  const [updateCommonContract, { isLoading: loadingUpdateContract }] =
    useUpdateCommonContractMutation();

  const onSubmitUpdateContract = async (values: any, signAndSend: boolean) => {
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
    createFormData('name', values?.name);

    createFormData('message', values?.message);
    createFormData('logo', values?.logo);
    createFormData('parties', createPartiesFormData(values?.parties, true));
    if (!contractType) {
      createFormData('signees', createSigneesFormData(values?.signees, true));
    }
    createFormData('dynamicFields', JSON.stringify(values?.dynamicFields));
    createFormData('attachment', values?.attachment);
    if (contractType && contractType === 'PDF') {
      createFormData('latestAttachment', values?.latestAttachment);
      createFormData('contractType', 'PDF');
      createFormData('textComponent', textComponentsFormData(textComponents));
      createFormData(
        'signatureComponent',
        signatureComponentsFormData(signatureComponents),
      );
      createFormData('signees', createPDFSigneeFormData(values?.signees));
    }

    if (!contractId) {
      try {
        await updateCommonContractTemplate({
          id: templateId,
          body: formData,
        })?.unwrap();
        successSnackbar('Contract template updated successfully');
        reset();
      } catch (error: any) {
        errorSnackbar('An error occured');
      }
    }
    if (contractId) {
      if (signAndSend) {
        createFormData('status', 'PENDING');
      }
      try {
        await updateCommonContract({
          id: contractId,
          body: formData,
        })?.unwrap();
        successSnackbar(
          signAndSend
            ? 'The contract has been successfully sent to the signees.'
            : 'Contract updated successfully',
        );
        router.push(AIR_SOCIAL_CONTRACTS?.CONTRACTS);
        reset();
      } catch (error: any) {
        errorSnackbar('An error occured');
      }
    }
  };

  const handleSubmitUpdateContract = (signAndSend: boolean = false) =>
    handleSubmit((values: any) => onSubmitUpdateContract(values, signAndSend));

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
        name: data?.name,
        type: data?.type,
        required: false,
        description: '',
        [data.name]: '',
        options:
          data?.type === 'checkbox'
            ? [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' },
              ]
            : undefined,
      };
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
    (
      index: number,
      data: {
        required?: boolean;
        value?: any;
        description: string;
        options: any;
      },
    ) => {
      if (!dynamicFields[index]) return;

      const { name, required, description } = dynamicFields[index];
      let safeValue = data.value;

      if (
        typeof safeValue === 'string' &&
        dayjs(safeValue, 'YYYY-MM-DD', true).isValid()
      ) {
        safeValue = dayjs(safeValue, 'YYYY-MM-DD').toDate();
      }

      updateDynamicField(index, {
        ...dynamicFields[index],
        required: data.required ?? required,
        description: data.description ?? description,
        [name]: safeValue ?? dynamicFields[index][name as keyof DynamicField],
        options: data.options ?? dynamicFields[index].options,
      });
    },
    [updateDynamicField, dynamicFields],
  );

  const handleOpenModalAddSignee = () => {
    setOpenModalAddSignee(true);
  };
  const handleCloseModalAddSignee = () => {
    setOpenModalAddSignee(false);
  };

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
    contractId,
    templateId,
    contractType,
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

    openModalAddSignee,
    handleOpenModalAddSignee,
    handleCloseModalAddSignee,

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
    loadingUpdateContract,
    handleSubmitUpdateContract,

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

    contractDetailsData,
  };
}
