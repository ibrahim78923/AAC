import { Dispatch, SetStateAction } from 'react';

export interface ArticlesIsPortalOpenI {
  isOpen?: boolean;
  isFilter?: boolean;
  isUpsertFolder?: boolean;
  isDelete?: boolean;
  isDeleteFolder?: boolean;
  isMoveFolder?: boolean;
  data?: any;
}

export interface ChildComponentPropsI {
  isPortalOpen: ArticlesIsPortalOpenI;
  setIsPortalOpen: Dispatch<SetStateAction<ArticlesIsPortalOpenI>>;
}
