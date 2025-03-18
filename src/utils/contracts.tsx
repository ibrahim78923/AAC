import { generateImage } from '@/utils/avatarUtils';
import {
  IconFieldCheckbox,
  IconFieldDate,
  IconFieldNumber,
  IconFieldText,
} from '@/assets/icons';
import { errorSnackbar } from '@/lib/snackbar';
import dayjs from 'dayjs';

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
  CHANGES_REQUESTED: 'CHANGES_REQUESTED',
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

export const ENUM_CONTRACT_PERMISSIONS = {
  VIEW_ACCESS: 'VIEW_ACCESS',
  FULL_ACCESS: 'FULL_ACCESS',
};

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

export const createPartiesFormData = (parties: any, update: boolean) => {
  if (!Array.isArray(parties) || parties.length === 0) return null;

  const formData = parties
    .map((party: any) => {
      if (!party || typeof party !== 'object') return null;

      const formattedParty: any = {};
      const setValue = (key: string, value: any) => {
        formattedParty[key] =
          value === null ||
          value === undefined ||
          (typeof value === 'string' && value.trim() === '')
            ? null
            : value;
      };

      if (update && party?._id) setValue('id', party?._id);
      setValue('address', party?.address);
      setValue('idNumber', party?.idNumber);
      setValue('referredAs', party?.referredAs);
      setValue('moduleType', party?.moduleType);
      setValue('moduleId', party?.moduleData?._id);

      return formattedParty;
    })
    .filter(Boolean);

  return formData.length ? JSON.stringify(formData) : null;
};

export const createSigneesFormData = (signees: any, update: boolean) => {
  if (!Array.isArray(signees) || signees.length === 0) return null;

  const formData = signees
    .map((signee: any) => {
      if (!signee || typeof signee !== 'object') return null;

      const formattedSignee: any = {};
      const setValue = (key: string, value: any) => {
        formattedSignee[key] =
          value === null ||
          value === undefined ||
          (typeof value === 'string' && value.trim() === '')
            ? null
            : value;
      };

      if (update && signee?._id) setValue('id', signee?._id);
      setValue('signingOrder', Number(signee?.signingOrder));
      setValue('personalTitle', signee?.personalTitle);
      setValue('name', signee?.name);
      setValue('email', signee?.email);
      setValue('signatureStatus', signee?.signatureStatus);
      setValue('signatureType', signee?.signatureType);
      setValue('moduleId', signee?.onBehalfOf);

      return formattedSignee;
    })
    .filter(Boolean);

  return formData.length ? JSON.stringify(formData) : null;
};

export const createCollaboratorsFormData = (collaborators: any) => {
  if (!Array.isArray(collaborators) || collaborators.length === 0) return null;

  const formData = collaborators
    .map((collaborator: any) => {
      if (!collaborator || typeof collaborator !== 'object') return null;

      const formattedCollaborator: any = {};
      const setValue = (key: string, value: any) => {
        formattedCollaborator[key] =
          value === null ||
          value === undefined ||
          (typeof value === 'string' && value.trim() === '')
            ? null
            : value;
      };

      setValue('userId', collaborator?.sharedUserData?._id);
      setValue('permissions', collaborator?.permissions);

      return formattedCollaborator;
    })
    .filter(Boolean);

  return formData.length ? JSON.stringify(formData) : null;
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

export const base64ToFile = (
  base64String: string | null,
  fileName: string,
): File | null => {
  if (!base64String || !base64String.includes(',')) return null;

  try {
    const [header, base64Data] = base64String.split(',');
    const mimeMatch = header.match(/:(.*?);/);
    const mimeType = mimeMatch ? mimeMatch[1] : 'image/png'; // Default to PNG

    const byteString = atob(base64Data); // Decode Base64
    const byteArray = Uint8Array.from(byteString, (char) => char.charCodeAt(0));

    return new File([byteArray], fileName, { type: mimeType });
  } catch (error: any) {
    errorSnackbar(`Error converting base64 to File: ${error}`);
    return null;
  }
};

export const isValidDate = (value: any): boolean => {
  if (!value) return false; // Handle null, undefined, or empty string
  if (value instanceof Date) return !isNaN(value.getTime()); // Check if Date object is valid
  if (typeof value === 'string') {
    return dayjs(value, ['YYYY-MM-DD', 'YYYY-MM-DDTHH:mm:ssZ'], true).isValid();
  }
  return false;
};
