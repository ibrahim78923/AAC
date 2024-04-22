import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  assignedPhysicalGiftCardFormFieldsDynamic,
  defaultValues,
  validationSchema,
} from './AssignedPhysicalGiftCard.data';
import { successSnackbar } from '@/utils/api';
import { useLazyGetRecipientsDropdownForUnAssignedPhysicalGiftCardQuery } from '@/services/airLoyaltyProgram/giftCards/giftCards/physical-gift-card/unassigned';
export const useAssignedPhysicalGiftCard = (props: any) => {
  const { setIsPortalOpen } = props;
  const methods: any = useForm<any>({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });
  const { handleSubmit, reset } = methods;
  const assignedPhysicalGiftCard = async () => {
    successSnackbar('Assigned Successfully');
    closeAssignedForm?.();
  };
  const closeAssignedForm = () => {
    reset();
    setIsPortalOpen({});
  };
  const recipientsApiQuery =
    useLazyGetRecipientsDropdownForUnAssignedPhysicalGiftCardQuery?.();
  const assignedPhysicalGiftCardFormFields =
    assignedPhysicalGiftCardFormFieldsDynamic?.(recipientsApiQuery);
  return {
    handleSubmit,
    assignedPhysicalGiftCard,
    methods,
    closeAssignedForm,
    assignedPhysicalGiftCardFormFields,
  };
};
