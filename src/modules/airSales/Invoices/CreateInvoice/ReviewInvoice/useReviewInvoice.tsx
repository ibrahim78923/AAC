import { useState } from 'react';

const useReviewInvoice = () => {
  const [isEmailModal, setIsEmailModal] = useState(false);
  return {
    isEmailModal,
    setIsEmailModal,
  };
};

export default useReviewInvoice;
