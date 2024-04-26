import { useState } from 'react';

const useImportRecordCreated = () => {
  const [isCustomize, setIsCustomize] = useState(false);
  const [isAssign, setIsAssign] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [IsFilter, setIsFilter] = useState(false);
  const [IsExport, setIsExport] = useState(false);

  const handleCustomizeDrawer = () => {
    setIsCustomize(!isCustomize);
  };

  const HandleDeleteModal = () => {
    setIsDelete(!isDelete);
  };

  const handleAssignModal = () => {
    setIsAssign(!isAssign);
  };
  const handleFilterDrawer = () => {
    setIsFilter(!IsFilter);
  };
  const handleExportModal = () => {
    setIsExport(!IsExport);
  };

  const handleActions = (value: string | any) => {
    switch (value) {
      case 'Re-assign':
        handleAssignModal();
        break;
      case 'Delete':
        HandleDeleteModal();
        break;
      default:
        break;
    }
  };
  return {
    handleCustomizeDrawer,
    isCustomize,
    handleActions,
    IsFilter,
    handleFilterDrawer,
    isAssign,
    handleAssignModal,
    HandleDeleteModal,
    isDelete,
    handleExportModal,
    IsExport,
  };
};

export default useImportRecordCreated;
