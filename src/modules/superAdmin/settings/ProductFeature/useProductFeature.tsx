import { useState } from 'react';
const useProductFeature = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [tableRowValues, setTableRowValues] = useState();
  return {
    isDisabled,
    setIsDisabled,
    tableRowValues,
    setTableRowValues,
  };
};
export default useProductFeature;
