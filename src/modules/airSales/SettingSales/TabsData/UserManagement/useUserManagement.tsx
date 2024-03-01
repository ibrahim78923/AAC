import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  teamsDefaultValues,
  teamsValidationSchema,
} from './UserManagement.data';
import { useState } from 'react';

const useUserManagement = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isCreateTeamOpen, setIsCreateTeamOpen] = useState(false);

  const methods: any = useForm({
    resolver: yupResolver(teamsValidationSchema),
    defaultValues: teamsDefaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = () => {};

  return {
    activeTab,
    setActiveTab,
    methods,
    handleSubmit,
    onSubmit,
    isCreateTeamOpen,
    setIsCreateTeamOpen,
  };
};

export default useUserManagement;
