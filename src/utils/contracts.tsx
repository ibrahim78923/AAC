import { generateImage } from '@/utils/avatarUtils';
import {
  IconFieldCheckbox,
  IconFieldDate,
  IconFieldNumber,
  IconFieldText,
} from '@/assets/icons';

export const ENUM_CONTRACT_TYPE = {
  BASIC: 'BASIC',
  PDF: 'PDF',
};

export const ENUM_CONTRACT_STATUS = {
  DRAFT: 'DRAFT',
  PENDING: 'PENDING',
  SIGNED: 'SIGNED',
  REJECTED: 'REJECTED',
  DEFAULT: 'DEFAULT',
};

export const ENUM_CONTRACT_VISIBLE_TO = {
  EVERYONE: 'EVERYONE',
  SPECIFIC_USER: 'SPECIFIC_USER',
  PRIVATE: 'PRIVATE',
  TEAMS: 'TEAMS',
};

export const ENUM_TEMPLATE_CATEGORIES = {
  RECENTLY_USED: 'RECENTLY_USED',
  MY_TEMPLATES: 'MY_TEMPLATES',
  AAC_TEMPLATES: 'AAC_TEMPLATES',
  HR: 'HR',
  CORPORATE: 'CORPORATE',
  PRIVATE: 'PRIVATE',
  RENTAL: 'RENTAL',
  STARTUP: 'STARTUP',
  SALES: 'SALES',
};

export const ENUM_SIGNATURE_TYPE = {
  CLICK: 'CLICK',
  SMS: 'SMS',
  DRAW: 'DRAW',
} as const;

export const SIGNATURE_METHODS_LABEL = {
  CLICK: 'Sign with a Click',
  SMS: 'SMS Verification',
  DRAW: 'Draw a Signature',
};

export const SIGNATURE_METHODS = [
  { value: ENUM_SIGNATURE_TYPE.CLICK, label: SIGNATURE_METHODS_LABEL.CLICK },
  { value: ENUM_SIGNATURE_TYPE.SMS, label: SIGNATURE_METHODS_LABEL.SMS },
  { value: ENUM_SIGNATURE_TYPE.DRAW, label: SIGNATURE_METHODS_LABEL.DRAW },
];

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
  const formData = parties.map((party: any) => {
    if (party?._id) {
      return {
        // name: party?.name,
        // address: party?.address,
        // idNumber: party?.idNumber,
        // email: party?.email,
        // referredAs: party?.referredAs,
        // moduleType: party.moduleType,
        // moduleId: party?.moduleId,
        id: party?._id,
      };
    }
    return {
      // name: party?.name,
      address: party?.address,
      idNumber: party?.idNumber,
      email: party?.email,
      referredAs: party?.referredAs,
      moduleType: party.moduleType,
      moduleId: party?.moduleId,
    };
  });
  return JSON.stringify(formData);
};

export const getSigneesFormData = (signees: any) => {
  const formData = signees.map((signee: any) => {
    if (signee?._id) {
      const { _id, ...rest } = signee;
      return {
        ...rest,
        id: _id,
      };
    }
    return {
      signingOrder: signee?.signingOrder,
      onBehalfOf: signee?.onBehalfOf,
      personalTitle: signee?.personalTitle,
      name: signee?.name,
      email: signee?.email,
      signatureStatus: signee?.signatureStatus,
      signatureType: signee?.signatureType,
    };
  });
  return JSON.stringify(formData);
};

export const getPartyName = (data: any) => {
  if (data) {
    return data.name || `${data.firstName || ''} ${data.lastName || ''}`.trim();
  }
  return '--';
};

export const getTemplateSectionTitle = (category: string) => {
  switch (category) {
    case ENUM_TEMPLATE_CATEGORIES.RECENTLY_USED:
      return 'Recently Used';
    case ENUM_TEMPLATE_CATEGORIES.MY_TEMPLATES:
      return 'My Templates';
    case ENUM_TEMPLATE_CATEGORIES.AAC_TEMPLATES:
      return 'AAC Templates';
    case ENUM_TEMPLATE_CATEGORIES.HR:
      return 'HR';
    case ENUM_TEMPLATE_CATEGORIES.CORPORATE:
      return 'Corporate';
    case ENUM_TEMPLATE_CATEGORIES.PRIVATE:
      return 'Private';
    case ENUM_TEMPLATE_CATEGORIES.RENTAL:
      return 'Rental';
    case ENUM_TEMPLATE_CATEGORIES.STARTUP:
      return 'Startup';
    case ENUM_TEMPLATE_CATEGORIES.SALES:
      return 'Sales';
    default:
      return 'My Templates';
  }
};

type ServerAttachment = {
  url: string;
};

export const getFileName = (attachment: File | ServerAttachment) => {
  if (attachment instanceof File) return attachment.name;
  if (attachment?.url) {
    const safeUrl = attachment.url.toString();
    const parts = safeUrl.split('/');
    return parts[parts.length - 1] || 'Unnamed';
  }
  return 'Unnamed';
};

export const generateSrc = (attachment: File | ServerAttachment) => {
  if (attachment instanceof File) return URL.createObjectURL(attachment);
  if (attachment?.url) return generateImage(attachment?.url);
  return '';
};
