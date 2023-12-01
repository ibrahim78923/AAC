import { AssignContactIcon, ExportModalIcon } from '@/assets/icons';

import React from 'react';

const useScheduleModals = ({ type }: { type: string }) => {
  const checkModelType = () =>
    type.toLowerCase() === 'assign'
      ? 'Assign'
      : type.toLowerCase() === 'export'
      ? 'Export File'
      : type.toLowerCase() === 'reschedule'
      ? 'Reschedule Call'
      : type.toLowerCase() === 'outcome'
      ? 'Outcome'
      : null;

  const checkModelTypeForImage = () =>
    type.toLowerCase() === 'assign' ? (
      <AssignContactIcon />
    ) : type.toLowerCase() === 'export' ? (
      <ExportModalIcon />
    ) : type.toLowerCase() === 'reschedule' ? (
      <AssignContactIcon />
    ) : type.toLowerCase() === 'outcome' ? (
      <AssignContactIcon />
    ) : null;
  return { checkModelType, checkModelTypeForImage };
};

export default useScheduleModals;
