import React from 'react';

export default function useCreateContractSidebar() {
  const [tabValue, setTabValue] = React.useState('fields');

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  return {
    tabValue,
    handleChangeTab,
  };
}
