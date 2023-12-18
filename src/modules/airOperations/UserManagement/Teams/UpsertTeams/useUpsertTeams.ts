import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  upsertTeamData,
  upsertTeamDefaultValues,
  upsertTeamValidationSchema,
} from './UpsertTeams.data';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useState } from 'react';

export const useUpsertTeams = (setIsDrawerOpen: any) => {
  const [teamData, setTeamData] = useState<any[]>(upsertTeamData);
  const [disabled, setDisabled] = useState(true);

  const methods: any = useForm({
    resolver: yupResolver(upsertTeamValidationSchema),
    defaultValues: upsertTeamDefaultValues,
  });
  const { handleSubmit, reset } = methods;

  const submit = async () => {
    if (disabled) {
      setDisabled(false);
    } else {
      enqueueSnackbar('Team Add Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      setIsDrawerOpen(false);
      reset();
    }
  };

  return {
    methods,
    handleSubmit,
    submit,
    setTeamData,
    disabled,
    setDisabled,
    teamData,
  };
};
