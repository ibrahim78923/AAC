import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { AIR_SERVICES } from '@/constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { usePostDepartmentMutation } from '@/services/airServices/settings/user-management/departments';
import { useLazyGetAgentsDropdownListQuery } from '@/services/airServices/tickets/single-ticket-details/tasks';
import {
  departmentFormValidation,
  departmentFormValues,
} from '../DepartmentsFormModal/DepartmentsFormModal.data';

export const useDepartmentsHeader = (props: any) => {
  const { openAddModal, setOpenAddModal } = props;
  const { USER_MANAGEMENT } = AIR_SERVICES;
  const { push } = useRouter();
  const backArrowClick = () => {
    push({ pathname: USER_MANAGEMENT });
  };
  const [postDepartment] = usePostDepartmentMutation();
  const addFormMethod = useForm({
    resolver: yupResolver(departmentFormValidation),
    defaultValues: departmentFormValues(null),
  });
  const { handleSubmit, reset } = addFormMethod;
  const submitAddForm = async (formData: any) => {
    const modifyData = {
      ...formData,
      departmentHeadId: formData?.departmentHeadId?._id,
      members: formData?.members?.map((value: any) => value?._id),
    };
    try {
      const response: any = await postDepartment({
        body: modifyData,
      });
      enqueueSnackbar(
        response?.data?.message && 'Department Added Successfully',
        {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        },
      );
      reset();
      setOpenAddModal(false);
    } catch (error: any) {
      enqueueSnackbar(error?.data?.error ?? 'An error', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };
  const handleClose = () => {
    setOpenAddModal(false);
    reset();
  };
  const userList = useLazyGetAgentsDropdownListQuery();
  const formSubmit = handleSubmit(submitAddForm);
  return {
    backArrowClick,
    openAddModal,
    setOpenAddModal,
    formSubmit,
    userList,
    handleClose,
    addFormMethod,
  };
};
