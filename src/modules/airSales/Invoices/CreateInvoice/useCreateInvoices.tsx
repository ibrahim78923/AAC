import { useState } from 'react';
import { useRouter } from 'next/router';

const UseCreateInvoices = () => {
  const [addPlanFormValues, setAddPlanFormValues] = useState({});
  const router = useRouter();

  const hanldeGoBack = () => {
    router.back();
  };

  return {
    addPlanFormValues,
    setAddPlanFormValues,
    hanldeGoBack,
  };
};

export default UseCreateInvoices;
