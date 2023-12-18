import { useLazyGetOrganizationsQuery } from '@/services/dropdowns';
import { addVouchersFormFieldsDefaultValues } from './AddVouchers.data';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useAddVouchers = (props: any) => {
  const { addVouchersOpen, setAddVouchersOpen } = props;
  const apiQueryOrganizations = useLazyGetOrganizationsQuery();
  const methods: any = useForm({
    defaultValues: addVouchersFormFieldsDefaultValues({}),
  });
  const { handleSubmit, watch } = methods;
  const submitAddVouchersForm = async () => {
    enqueueSnackbar('Voucher added  successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    setAddVouchersOpen?.(false);
  };
  return {
    addVouchersOpen,
    setAddVouchersOpen,
    handleSubmit,
    submitAddVouchersForm,
    methods,
    apiQueryOrganizations,
    watch,
  };
};
