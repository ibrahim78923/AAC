import React from 'react';

export default function useDefaultSignatures() {
  const [isIndividualSignature, setIsIndividualSignature] =
    React.useState(false);
  const handleChangeIndividualSignature = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setIsIndividualSignature(event.target.checked);
  };

  return {
    isIndividualSignature,
    handleChangeIndividualSignature,
  };
}
