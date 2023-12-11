import { useState } from 'react';
import { allViewOptions } from './AllView.data';

const useAllView = () => {
  const [isAllViewActionsModal, setIsAllViewActionsModal] = useState({
    isDelete: false,
    isManage: false,
    isClone: false,
    isRename: false,
  });
  const [selectedValue, setSelectedValue] = useState(null);
  const handleClick = (event: any) => {
    setSelectedValue(event?.currentTarget);
  };

  const handleSelectedOptionValue = (option: any) => {
    switch (option) {
      case allViewOptions?.delete:
        setIsAllViewActionsModal({
          ...isAllViewActionsModal,
          isDelete: true,
        });
        break;
      case allViewOptions?.clone:
        setIsAllViewActionsModal({ ...isAllViewActionsModal, isClone: true });
        break;

      case allViewOptions?.manage:
        setIsAllViewActionsModal({ ...isAllViewActionsModal, isManage: true });
        break;
      case allViewOptions?.rename:
        setIsAllViewActionsModal({ ...isAllViewActionsModal, isRename: true });
        break;
      default:
        break;
    }

    // setSelectedOptionsValue(option);
    setSelectedValue(null);
  };
  return {
    isAllViewActionsModal,
    setIsAllViewActionsModal,
    handleClick,
    selectedValue,
    handleSelectedOptionValue,
  };
};
export default useAllView;
