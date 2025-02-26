export const ACCEPT_FILE_EXTENSIONS = {
  PNG: ['.png', '.PNG'],
  JPEG: ['.jpg', '.jpeg', '.JPG', '.JPEG'],
  PDF: ['.pdf'],
};

export const DOWNLOAD_FILE_TYPE = {
  PDF: 'PDF',
  PNG: 'PNG',
};

export const ATTACHMENT_FILE_TYPE = {
  PDF: 'pdf',
  XLS: 'xls',
  DOC: 'doc',
  DOCX: 'docx',
  CSV: 'csv',
};

export const EXCLUDE_FILE_PREVIEW = {
  [ATTACHMENT_FILE_TYPE?.XLS]: true,
  [ATTACHMENT_FILE_TYPE?.CSV]: true,
  [ATTACHMENT_FILE_TYPE?.DOC]: true,
  [ATTACHMENT_FILE_TYPE?.DOCX]: true,
};

export const EXPORT_TYPE = {
  CSV: 'CSV',
  XLS: 'XLSX',
  PDF: 'PDF',
};

export const EXPORT_FILE_TYPE: any = {
  [EXPORT_TYPE?.CSV]: 'text/csv',
  [EXPORT_TYPE?.XLS]:
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  [EXPORT_TYPE?.PDF]: 'application/pdf',
};

export const IMPORT_FILE_TYPE = {
  CSV: 'CSV',
};

export const FILE_SIZE_UNITS = {
  B: 1,
  KB: 1024,
  MB: 1024 * 1024,
  GB: 1024 * 1024 * 1024,
};
