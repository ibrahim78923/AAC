import { ReactNode } from 'react';

export interface AttachmentsPropsI {
  permissionKey: string[];
  size?: any;
  colSpan?: { [key: string]: number };
  canAttachFile?: boolean;
  attachFileHandler?: () => void;
  children?: ReactNode;
  recordId: string;
  hasAttachments?: any;
}
