export interface CustomTextEditorPropsI {
  value: string | any;
  onChange?: (value: string) => void;
  style?: any;
  toolbar?: any;
  readOnly?: boolean;
  viewMode?: boolean;
  other?: any | { error?: boolean; [key: string]: any };
}
