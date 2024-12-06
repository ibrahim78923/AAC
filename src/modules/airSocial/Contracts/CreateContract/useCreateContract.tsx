import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { initialParties, initialSignees } from './CreateContract.data';
// import { yupResolver } from '@hookform/resolvers/yup';

export default function useCreateContract() {
  /* VARIABLE DECLERATION
  -------------------------------------------------------------------------------------*/
  const [activeView, setActiveView] = useState<string>('create');
  const [parties, setParties] = useState(initialParties);
  const [signees, setSignees] = useState<any>(initialSignees);
  const [openModalManageSignature, setOpenModalManageSignature] =
    useState<boolean>(false);
  const methods: any = useForm({
    // resolver: yupResolver(validationSchema),
    // defaultValues: initialValues,
  });
  const { handleSubmit } = methods;

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

  const handleAddParty = () => {
    setParties([
      ...parties,
      {
        _id: `${Date.now()}`,
        type: '',
        name: '',
        address: '',
        nationalID: '',
        referredAs: '',
      },
    ]);
  };

  const handleDeleteParty = (id: string) => {
    setParties(parties.filter((party: any) => party._id !== id));
  };

  const handleAddSigneeCard = () => {
    setSignees([
      ...signees,
      {
        _id: `${Date.now()}`,
        signeeOrder: '',
        onBehalfOf: '',
        personalTitle: '',
        email: '',
      },
    ]);
  };

  const handleDeleteSigneeCard = (id: string) => {
    setSignees(signees.filter((signee: any) => signee._id !== id));
  };

  const handleOpenModalManageSignature = () => {
    setOpenModalManageSignature(true);
  };
  const handleCloseModalManageSignature = () => {
    setOpenModalManageSignature(false);
  };

  const handleChangeSignatureMethod = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSignees([
      ...signees,
      {
        signatureMethod: (event.target as HTMLInputElement).value,
      },
    ]);
  };

  return {
    activeView,
    handlePreviewToggle,
    parties,
    handleAddParty,
    handleDeleteParty,

    signees,
    handleAddSigneeCard,
    handleDeleteSigneeCard,

    openModalManageSignature,
    handleOpenModalManageSignature,
    handleCloseModalManageSignature,
    handleChangeSignatureMethod,

    methods,
    handleSubmit,
    onSubmit,
  };
}
