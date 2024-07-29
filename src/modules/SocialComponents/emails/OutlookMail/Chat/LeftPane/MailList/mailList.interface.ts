export interface EmailI {
  id: string;
  parentFolderId: string;
  isRead: boolean;
  toRecipients: Array<{ emailAddress: { address: string } }>;
  from: { emailAddress: { name: string } };
  hasAttachments: boolean;
  subject: string;
  bodyPreview: string;
  lastModifiedDateTime: string;
}

export interface MailListPropsI {
  emailsByFolderIdData?: { data: EmailI[] };
  isLoadingEmailsByFolderIdData?: string;
  mailTabType?: {
    display_name?: string;
    id: string;
    displayName: string;
  };
  setIsRefresh: (isRefresh: boolean) => void;
  isRefresh?: boolean;
  handelRefresh?: () => void;
  manualActionsTrack?: any;
  refetch?: any;
  trackRenders?: any;
  setTrackRenders: any;
}
