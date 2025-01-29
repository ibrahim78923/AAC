import {
  IconFieldCheckbox,
  IconFieldDate,
  IconFieldNumber,
  IconFieldText,
} from '@/assets/icons';
export const FIELD_TYPES = {
  TEXT: 'text',
  DATE: 'date',
  NUMBER: 'number',
  CHECKBOX: 'checkbox',
  SELECT: 'select',
};

export const getFieldIcon = (type: string) => {
  switch (type) {
    case FIELD_TYPES.TEXT:
      return <IconFieldText />;
    case FIELD_TYPES.DATE:
      return <IconFieldDate />;
    case FIELD_TYPES.NUMBER:
      return <IconFieldNumber />;
    case FIELD_TYPES.CHECKBOX:
      return <IconFieldCheckbox />;
    default:
      return <IconFieldText />;
  }
};

export const getPartiesFormData = (parties: any) => {
  const formData = parties.map((party: any) => ({
    name: party?.name,
    address: party?.address,
    idNumber: party?.idNumber,
    email: party?.email,
    referredAs: party?.referredAs,
    moduleType: party.moduleType,
    moduleId: party?.moduleId,
  }));
  return JSON.stringify(formData);
};

export const getSigneesFormData = (signees: any) => {
  const formData = signees.map((signee: any) => ({
    signingOrder: signee?.signingOrder,
    onBehalfOf: signee?.onBehalfOf,
    personalTitle: signee?.personalTitle,
    name: signee?.name,
    email: signee?.email,
    signatureStatus: signee?.signatureStatus,
    signatureType: signee?.signatureType,
    moduleId: signee?.moduleId,
  }));
  return JSON.stringify(formData);
};

export const getPartyName = (data: any) => {
  if (data) {
    return data.name || `${data.firstName || ''} ${data.lastName || ''}`.trim();
  }
  return '--';
};
