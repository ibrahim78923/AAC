import { useState } from 'react';

const useOverview = () => {
  const [isCopiedURL, setIsCopiedURL] = useState(false);
  const [isCopiedCode, setIsCopiedCode] = useState(false);
  const [isEmbedDialogOpen, setIsEmbedDialogOpen] = useState(false);
  const handleOpenEmbedDialog = () => {
    setIsEmbedDialogOpen(true);
  };
  const handleCloseEmbedDialog = () => {
    setIsEmbedDialogOpen(false);
  };

  const handleCopyURL = (text: string) => {
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
    isEmbedDialogOpen,
    handleOpenEmbedDialog,
    handleCloseEmbedDialog,
    isCopiedURL,
    isCopiedCode,
    handleCopyURL,
    handleCopyEmbededCode,
  };
};

export default useOverview;
