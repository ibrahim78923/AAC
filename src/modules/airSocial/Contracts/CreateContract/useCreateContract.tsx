import { useState } from 'react';
import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';

export default function useCreateContract() {
  const [activeView, setActiveView] = useState<string>('create');
  const handlePreviewToggle = (view: string) => {
    setActiveView(view);
  };

  const initialParties = [
    {
      _id: '1',
      type: 'Individual',
      name: '',
      address: '',
      nationalID: '',
      referredAs: '',
    },
    {
      _id: '2',
      type: 'Individual',
      name: '',
      address: '',
      nationalID: '',
      referredAs: '',
    },
  ];
  const [parties, setParties] = useState(initialParties);

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

  const methods: any = useForm({
    // resolver: yupResolver(validationSchema),
    // defaultValues: initialValues,
  });

  const { handleSubmit } = methods;

  // useEffect(() => {
  //   reset(initialValues);
  // }, [initialValues, methods, reset]);

  const onSubmit = () => {
    // console.log('Form values:::', values);
  };

  return {
    activeView,
    handlePreviewToggle,
    parties,
    handleAddParty,
    handleDeleteParty,
    methods,
    handleSubmit,
    onSubmit,
  };
}
