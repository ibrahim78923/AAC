import { useState } from 'react';
import { useFieldArray } from 'react-hook-form';

export const useDateOverrides = () => {
  const [openModule, setOpenModule] = useState(false);
  const [showData, setShowData] = useState(false);
  const { fields, remove, append } = useFieldArray({
    name: 'overrides',
  });
  const addDateOverride = () => {
    append({ start: null, end: null });
  };
  return {
    openModule,
    setOpenModule,
    fields,
    remove,
    addDateOverride,
    showData,
    setShowData,
  };
};
