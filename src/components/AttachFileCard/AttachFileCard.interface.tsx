export interface AttachFileCardSizePropsI {
  width?: string | number;
  variant?: 'circular' | 'rounded' | 'square';
  height?: string | number;
}

export interface AttachFileCardPropsI {
  data: any;
  onDelete?: () => any;
  permissionKey?: string[];
  size?: AttachFileCardSizePropsI;
  hasStyling?: boolean;
  canDelete?: boolean;
}
