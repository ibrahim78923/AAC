import { ReactNode } from 'react';

export interface UncontrolledAccordionsPropsI {
  children: ReactNode;
  accordionSummary?: ReactNode;
  summaryTitle?: string;
  variantType?: string;
  customStyles?: any;
  summaryRootStyles?: any;
  summaryContentStyles?: any;
  disableGutters?: boolean;
  summaryKey?: string;
  disabled?: boolean;
  hasHover?: boolean;
  onMouseEnter?: any;
  onMouseLeave?: any;
  expandIcon?: any;
}
