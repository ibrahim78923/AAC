export interface CheckboxCardI {
  icon: any;
  value: string;
  title: string;
  desc: string;
  checkedValue: string;
  handleSelect: (value: string) => void;
}
