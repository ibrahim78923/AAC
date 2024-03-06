import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import {
  upsertRolesDefaultValues,
  upsertRolesValidationSchema,
} from './UpsertRoles.data';
import { successSnackbar } from '@/utils/api';
import { AIR_SERVICES } from '@/constants';

export default function useUpsertRoles() {
  const router: any = useRouter();
  const theme: any = useTheme();

  const { roleId } = router?.query;

  const methods: any = useForm({
    resolver: yupResolver(upsertRolesValidationSchema),
    defaultValues: upsertRolesDefaultValues,
  });

  const { handleSubmit, watch } = methods;

  const editNotes = watch('editNotes');
  const createEditTasksInTickets = watch('createEditTasksInTickets');
  const createEditAnnouncements = watch('createEditAnnouncements');

  const onSubmit = async () => {
    successSnackbar('Role Added Successfully!');
    router?.push(AIR_SERVICES?.USER_ROLES_SETTINGS);
  };

  return {
    router,
    roleId,
    methods,
    handleSubmit,
    onSubmit,
    theme,
    createEditTasksInTickets,
    createEditAnnouncements,
    editNotes,
  };
}
