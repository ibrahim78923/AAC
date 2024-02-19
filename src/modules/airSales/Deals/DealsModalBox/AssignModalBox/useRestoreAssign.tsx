import {
  useGetUsersListQuery,
  usePatchDealsMutation,
} from '@/services/airSales/deals';
import { useForm } from 'react-hook-form';
import { defaultValues } from './RestoreAssign.data';
import { enqueueSnackbar } from 'notistack';

const useRestoreAssign = (seletedId: any, onClose: any) => {
  const userRole = 'ORG_EMPLOYEE';
  const { data: UserListData } = useGetUsersListQuery({ role: userRole });
  const [updatedAssignDeal] = usePatchDealsMutation();

  const methods: any = useForm({
    defaultValues: defaultValues,
  });
  const { handleSubmit } = methods;

  const onSubmit = (values: any) => {
    updatedAssignDeal({ id: seletedId, body: { ownerId: values?.ownerId } });
    enqueueSnackbar('Re-assign Updated ', {
      variant: 'success',
    });
    onClose();
  };

  return {
    UserListData,
    handleSubmit,
    onSubmit,
    methods,
  };
};

export default useRestoreAssign;
