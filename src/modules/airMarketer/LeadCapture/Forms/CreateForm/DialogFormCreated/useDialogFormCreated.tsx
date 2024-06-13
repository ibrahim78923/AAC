import { useState } from 'react';

const useDialogForm = () => {
  const [isCopiedURL, setIsCopiedURL] = useState(false);
  const [isCopiedCode, setIsCopiedCode] = useState(false);

  const handleCopyLink = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setIsCopiedURL(true);
      setTimeout(() => {
        setIsCopiedURL(false);
      }, 2000);
    });
  };

  const handleCopyEmbededCode = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setIsCopiedCode(true);
      setTimeout(() => {
        setIsCopiedCode(false);
      }, 2000);
    });
  };

  return {
    isCopiedURL,
    isCopiedCode,
    handleCopyLink,
    handleCopyEmbededCode,
  };
};

export default useDialogForm;
