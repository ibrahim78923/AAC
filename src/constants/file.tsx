import { ATTACHMENT_FILE_TYPE } from './strings';

export const ACCEPT_FILE_EXTENSIONS = {
  PNG: ['.png', '.PNG'],
  JPEG: ['.jpg', '.jpeg', '.JPG', '.JPEG'],
  PDF: ['.pdf'],
};

export const DOWNLOAD_FILE_TYPE = {
  PDF: 'PDF',
  PNG: 'PNG',
};

export const EXCLUDE_FILE_PREVIEW = {
  [ATTACHMENT_FILE_TYPE?.XLS]: true,
  [ATTACHMENT_FILE_TYPE?.CSV]: true,
  [ATTACHMENT_FILE_TYPE?.DOC]: true,
  [ATTACHMENT_FILE_TYPE?.DOCX]: true,
};
