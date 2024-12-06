import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function useModalShareContract() {
  const initialCollaborator = {
    name: 'collaborator-1',
    permission: 'permission-collaborator-1',
  };
  const [collaborators, setCollaborators] = useState<any[]>([
    initialCollaborator,
  ]);
  const methods: any = useForm({
    // resolver: yupResolver(validationSchema),
    // defaultValues: initialValues,
  });
  const { handleSubmit } = methods;

  const handleAddCollaborator = () => {
    setCollaborators([
      ...collaborators,
      {
        name: `collaborator-${collaborators.length + 1}`,
        permission: `permission-collaborator-${collaborators.length + 1}`,
      },
    ]);
  };

  const onSubmit = () => {
    // console.log('Form values:::', values);
  };

  return {
    collaborators,
    handleAddCollaborator,
    methods,
    handleSubmit,
    onSubmit,
  };
}
