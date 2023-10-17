import { useState } from 'react';

import { SelectChangeEvent } from '@mui/material';

const useImportDeal = () => {
  const [columnsSelect, setColumnsSelect] = useState(false);
  const [fieldsValue, setFieldsValue] = useState<any>({
    dealName: '',
    dealValue: '',
    dealStage: '',
    dealPipline: '',
  });

  const handleChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setFieldsValue({ ...fieldsValue, [name]: value });
  };
  const handleSubmit = () => {
    if (!columnsSelect) {
      setColumnsSelect(true);
    } else {
    }
  };
  return {
    handleChange,
    fieldsValue,
    setFieldsValue,
    handleSubmit,
    columnsSelect,
    setColumnsSelect,
  };
};

export default useImportDeal;
