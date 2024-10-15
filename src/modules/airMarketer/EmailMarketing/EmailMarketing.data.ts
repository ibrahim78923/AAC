import { EMAIL_ENUMS } from '@/constants';

export const emailOptions = {
  VIEW_DETAILS: 'View Details',
  SAVE_EMAIL_AS_TEMPLATE: 'Save Email as Template',
  MOVE_TO_FOLDER: 'Move to folder',
  MANAGE_ACCESS: 'Manage Access',
  ARCHIVED: 'Archived',
  UN_ARCHIVE: 'Unarchive',
  DUPLICATE: 'Duplicate',
  DELETE: 'Delete',
};

export const emailMarketingTabsData = [
  'All',
  'Scheduled',
  'Draft',
  'Sent',
  'Archived',
];

export const tabData = [
  { label: 'All', value: EMAIL_ENUMS?.ALL },
  { label: 'Scheduled', value: EMAIL_ENUMS?.SCHEDULED },
  { label: 'Draft', value: EMAIL_ENUMS?.DRAFT },
  { label: 'Sent', value: EMAIL_ENUMS?.SENT },
  { label: 'Archived', value: EMAIL_ENUMS?.ARCHIVED },
];
