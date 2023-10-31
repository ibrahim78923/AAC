import { useState } from 'react';
const useNewsAndEvents = () => {
  const [isOpenEditDrawer, setIsOpenEditDrawer] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [tableRowValues, setTableRowValues] = useState();

  return {
    isDisabled,
    setIsDisabled,
    tableRowValues,
    setTableRowValues,
    isOpenEditDrawer,
    setIsOpenEditDrawer,
  };
};
export default useNewsAndEvents;
