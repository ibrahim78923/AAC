import { Dispatch, SetStateAction } from 'react';

export interface OpenConversationTypeContextPropsI {
  isDrawerOpen: any;
  setIsDrawerOpen: Dispatch<SetStateAction<any>>;
  selectedConversationType: any;
  refetch: any;
}
