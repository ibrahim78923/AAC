export type DrawerTypeI = 'REPLY' | 'REPLY_ALL' | 'OTHER_TYPE'; // Replace 'OTHER_TYPE' with actual types if any

export interface SetAutocompleteValuesI {
  (values: string[]): void;
}

export interface SetValueI {
  (field: string, value: any): void;
}

export interface EmailAssetsI {
  from?: string;
  provider?: string;
  others?: {
    cc?: string[];
    bcc?: string[];
  };
}
