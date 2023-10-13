import { useState } from 'react';

export const useContacts = () => {
  const [chatMode, setChatMode] = useState('personalChat');

  const handleSelection = (_: any, newValue: any) => {
    if (newValue !== null) {
      setChatMode(newValue);
    }
  };

  return {
    chatMode,
    handleSelection,
  };
};
