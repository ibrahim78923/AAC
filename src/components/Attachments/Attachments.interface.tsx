import { ReactNode } from 'react';

export interface AttachmentsPropsI {
  recordId: string | string[];
  permissionKey?: string[];
  size?: any;
  colSpan?: { [key: string]: number };
  canAttachFile?: boolean;
  attachFileHandler?: () => void;
  children?: ReactNode;
  hasAttachments?: any;
  hasStyling?: boolean;
  canDelete?: boolean;
  hasNoDeletePermission?: boolean;
}
