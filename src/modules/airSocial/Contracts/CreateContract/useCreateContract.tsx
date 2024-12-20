import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { defaultValues, mockContract } from './CreateContract.data';
import { generateUniqueId } from '@/utils/dynamic-forms';
// import { yupResolver } from '@hookform/resolvers/yup';

export default function useCreateContract() {
  /* VARIABLE DECLERATION
  -------------------------------------------------------------------------------------*/
  const [contractData, setContractData] = useState(mockContract);
  const [activeView, setActiveView] = useState<string>('create');
  const [openModalManageSignature, setOpenModalManageSignature] =
    useState<boolean>(false);
  const methods: any = useForm({
    // resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });
  const { handleSubmit } = methods;
  const [openModalConfirmationSignDoc, setOpenModalConfirmationSignDoc] =
    useState<boolean>(false);
  const [openModalPhoneNumber, setOpenModalPhoneNumber] =
    useState<boolean>(false);
  const [isIndividualSignature, setIsIndividualSignature] = useState(false);
  const [selectedSigneeId, setSelectedSigneeId] = useState<string | null>(null);

  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  // useEffect(() => {
  //   reset(initialValues);
  // }, [initialValues, methods, reset]);

  /* ASYNC FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const onSubmit = () => {
    // console.log('Form values:::', values);
  };

  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const handlePreviewToggle = (view: string) => {
    setActiveView(view);
  };

  const handleAddParty = useCallback(() => {
    setContractData((prevState) => ({
      ...prevState,
      parties: [
        ...prevState.parties,
        {
          _id: generateUniqueId(),
          name: '',
          address: '',
          idNumber: '',
          email: '',
          referredAs: '',
          moduleType: '',
          moduleId: '',
        },
      ],
    }));
  }, []);

  const handleDeleteParty = useCallback((partyId: string) => {
    setContractData((prevState) => ({
      ...prevState,
      parties: prevState.parties.filter((party) => party._id !== partyId),
    }));
  }, []);

  const handleAddSigneeCard = useCallback(() => {
    setContractData((prevState) => ({
      ...prevState,
      signees: [
        ...prevState.signees,
        {
          _id: generateUniqueId(),
          signingOrder: prevState.signees.length + 1,
          onBehalfOf: '',
          personalTitle: '',
          fullName: '',
          email: '',
          signatureStatus: 'PENDING',
          signatureType: 'MANUAL',
          moduleId: '',
        },
      ],
    }));
  }, []);

  const handleDeleteSigneeCard = useCallback((signeeId: string) => {
    setContractData((prevState) => ({
      ...prevState,
      signees: prevState.signees.filter((signee) => signee?._id !== signeeId),
    }));
  }, []);

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

  const handleChangeSignatureMethod = (
    event: React.ChangeEvent<HTMLInputElement>,
    signeeId: string | null,
  ) => {
    setContractData((prevState) => ({
      ...prevState,
      signees: signeeId
        ? prevState.signees.map((signee) =>
            signee._id === signeeId
              ? { ...signee, signatureType: event.target.value }
              : signee,
          )
        : prevState.signees.map((signee) => ({
            ...signee,
            signatureType: event.target.value,
          })),
    }));
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
    contractData,
    activeView,
    handlePreviewToggle,

    handleAddParty,
    handleDeleteParty,

    handleAddSigneeCard,
    handleDeleteSigneeCard,

    openModalManageSignature,
    handleOpenModalManageSignature,
    handleCloseModalManageSignature,
    handleChangeSignatureMethod,

    methods,
    handleSubmit,
    onSubmit,

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
  };
}
