export default interface AccordianInterfaceI {
  className?: string;
  handleSwitch?: (() => void) | undefined;
  checked?: boolean;
  data?: {
    title: string;
    hasSwitch?: boolean;
    endIcon?: React.ReactNode;
    content?: React.ReactNode;
    children?: React.ReactNode | string | undefined;
  }[];
}
