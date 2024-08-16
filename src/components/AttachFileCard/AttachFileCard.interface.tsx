export interface AttachFileCardSizePropsI {
  width?: string;
  variant?: 'circular' | 'rounded' | 'square';
  height?: string;
}

export interface AttachFileCardPropsI {
  data: any;
  onDelete: () => any;
  permissionKey: string[];
  size?: AttachFileCardSizePropsI;
}
