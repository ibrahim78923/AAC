import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  defaultValues,
  newPurchaseFieldsFunction,
  validationSchema,
} from './NewPurchaseOrder.data';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import { AIR_SERVICES } from '@/constants';
import {
  useLazyGetDepartmentDropdownQuery,
  useLazyGetLocationsDropdownQuery,
  useLazyGetVendorDropdownQuery,
} from '@/services/airServices/assets/purchase-orders';

const { PURCHASE_ORDER } = AIR_SERVICES;

const useNewPurchaseOrders = () => {
  const router = useRouter();
  const { purchaseOrderId } = router?.query;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [vendor, setVendor] = useState<string>('');
  const [isNewPurchaseOrder, setIsNewPurchaseOrder] = useState(true);

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });
  const apiQueryDepartment = useLazyGetDepartmentDropdownQuery();
  const apiQueryLocations = useLazyGetLocationsDropdownQuery();
  const apiQueryVendor: any = useLazyGetVendorDropdownQuery();

  const submit = async () => {
    enqueueSnackbar({
      message: 'New Purchase Order Created successfully',
      variant: 'success',
    });
  };

  const handlePageBack = () => {
    router?.push(PURCHASE_ORDER);
  };

  const handleVenderSelect = (e: any) => {
    const { name, value } = e?.target;
    methods?.setValue(name, value);
    setVendor(value || '');
  };
  const resetPurchaseOrderFilterForm = async () => {
    methods?.reset();
    setIsDrawerOpen(false);
  };
  const newPurchaseFields = newPurchaseFieldsFunction(
    apiQueryDepartment,
    apiQueryLocations,
    apiQueryVendor,
    handleVenderSelect,
  );
  return {
    isDrawerOpen,
    setIsDrawerOpen,
    handlePageBack,
    methods,
    vendor,
    submit,
    resetPurchaseOrderFilterForm,
    isNewPurchaseOrder,
    setIsNewPurchaseOrder,
    handleVenderSelect,
    newPurchaseFields,
    purchaseOrderId,
    router,
  };
};
export default useNewPurchaseOrders;
