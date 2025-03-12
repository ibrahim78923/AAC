import { ReactNode } from 'react';

export interface HtmlRendererPropsI {
  description: string | TrustedHTML;
  maxHeight?: string;
  hasEditor?: boolean;
}

export interface LogInfoPropsI {
  performer?: string;
  logType?: string;
  log?: ReactNode;
  logProps?: any;
  logColor?: string;
}
